import { NextRequest, NextResponse } from 'next/server';
import { performBasicSecurityAudit } from '@/lib/security';

export async function GET(request: NextRequest) {
  // Only allow in development or with proper authorization
  if (process.env.NODE_ENV === 'production') {
    const authHeader = request.headers.get('authorization');
    const validToken = process.env.SECURITY_AUDIT_TOKEN;
    
    if (!authHeader || !validToken || authHeader !== `Bearer ${validToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  try {
    const auditResult = performBasicSecurityAudit();
    
    // Add additional runtime checks
    const runtimeChecks = {
      https: request.url.startsWith('https://'),
      secureHeaders: {
        csp: request.headers.get('content-security-policy') !== null,
        xFrameOptions: request.headers.get('x-frame-options') !== null,
        strictTransportSecurity: request.headers.get('strict-transport-security') !== null
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasSecrets: Boolean(process.env.SECURITY_AUDIT_TOKEN)
      }
    };

    return NextResponse.json({
      audit: auditResult,
      runtime: runtimeChecks,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || 'unknown'
    });

  } catch (error) {
    console.error('Security audit error:', error);
    
    return NextResponse.json(
      { error: 'Failed to perform security audit' },
      { status: 500 }
    );
  }
}

// Disable other methods for security
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'GET' } }
  );
}