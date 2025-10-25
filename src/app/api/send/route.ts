import { NextRequest, NextResponse } from 'next/server';

import { Resend } from 'resend';

import { generateEmailHTML } from '@/components/Layout/EmailTemplate';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY not found');
    return NextResponse.json(
      { error: 'RESEND_API_KEY not configured' },
      { status: 500 }
    );
  }

  try {
    const body: ContactFormData = await request.json();
    const { name, email, subject, message } = body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('❌ Invalid email format:', email);
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!name.trim() || !message.trim()) {
      console.error('❌ Missing required fields:', {
        name: !!name.trim(),
        message: !!message.trim(),
      });
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const emailHTML = generateEmailHTML({ name, email, subject, message });
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use verified domain
      to: 'kawano.fer@gmail.com',
      replyTo: email, // Set reply-to to sender's email
      subject: `Portfolio Contact: ${subject || 'No subject'}`,
      html: emailHTML, // Use html property, not react
    });

    if (error) {
      console.error('❌ Resend error:', error);
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
    console.error('🚨 Unexpected error in POST /api/send:', error);
    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Keep the GET method for testing
export async function GET() {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY not found');
    return NextResponse.json(
      { error: 'RESEND_API_KEY not configured' },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'kawano.fer@gmail.com',
      subject: 'Test Email from Fernando Portfolio',
      html: '<p>This is a test email from your portfolio API endpoint!</p>',
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully!',
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
