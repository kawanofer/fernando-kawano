import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, sanitizeInput, isValidEmail, securityConfig } from '@/lib/security';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Apply rate limiting
    const rateLimitResult = checkRateLimit(ip, securityConfig.rateLimit);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: securityConfig.rateLimit.message,
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': securityConfig.rateLimit.maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString()
          }
        }
      );
    }

    // Parse and validate request body
    const body = await request.json().catch(() => null);
    
    if (!body) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { name, email, subject, message }: ContactFormData = body;

    // Input validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email).toLowerCase(),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message)
    };

    // Length validation
    if (sanitizedData.name.length < 2 || sanitizedData.name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters' },
        { status: 400 }
      );
    }

    if (sanitizedData.subject.length < 5 || sanitizedData.subject.length > 200) {
      return NextResponse.json(
        { error: 'Subject must be between 5 and 200 characters' },
        { status: 400 }
      );
    }

    if (sanitizedData.message.length < 10 || sanitizedData.message.length > 2000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 2000 characters' },
        { status: 400 }
      );
    }

    // Check for spam patterns (basic implementation)
    const spamKeywords = ['viagra', 'casino', 'loan', 'crypto', 'bitcoin'];
    const messageContent = `${sanitizedData.subject} ${sanitizedData.message}`.toLowerCase();
    
    if (spamKeywords.some(keyword => messageContent.includes(keyword))) {
      console.warn(`Potential spam detected from IP: ${ip}`);
      return NextResponse.json(
        { error: 'Message flagged as potential spam' },
        { status: 400 }
      );
    }

    // TODO: Implement actual email sending logic here
    // For now, we'll just log the contact attempt
    console.log('Contact form submission:', {
      ip,
      timestamp: new Date().toISOString(),
      name: sanitizedData.name,
      email: sanitizedData.email,
      subject: sanitizedData.subject,
      messageLength: sanitizedData.message.length
    });

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! I will get back to you soon.' 
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': securityConfig.rateLimit.maxRequests.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString()
        }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}