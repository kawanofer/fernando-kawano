import { NextRequest, NextResponse } from 'next/server';

import { Resend } from 'resend';

import { generateEmailHTML } from '@/components/Layout/EmailTemplate';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateBody(data: ContactFormData): string | null {
  if (!data.name || data.name.length > 100) {
    return 'Name is required and must be under 100 characters';
  }
  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    return 'A valid email address is required';
  }
  if (data.subject && data.subject.length > 200) {
    return 'Subject must be under 200 characters';
  }
  if (!data.message || data.message.length < 10 || data.message.length > 5000) {
    return 'Message is required and must be between 10 and 5000 characters';
  }
  return null;
}

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 500 }
    );
  }

  try {
    const body: ContactFormData = await request.json();

    const sanitizedData = {
      name: body.name?.trim() ?? '',
      email: body.email?.trim().toLowerCase() ?? '',
      subject: body.subject?.trim() ?? '',
      message: body.message?.trim() ?? '',
    };

    const validationError = validateBody(sanitizedData);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const emailHTML = generateEmailHTML(sanitizedData);

    const fromEmail =
      process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
    const toEmail = process.env.CONTACT_EMAIL ?? 'kawano.fer@gmail.com';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: sanitizedData.email,
      subject: `Portfolio Contact: ${sanitizedData.subject || 'No subject'}`,
      html: emailHTML,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! I will get back to you soon.',
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error in POST /api/send:', error);
    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
