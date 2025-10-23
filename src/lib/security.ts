// Security configuration and utilities

export interface SecurityConfig {
  csp: {
    defaultSrc: string[];
    scriptSrc: string[];
    styleSrc: string[];
    imgSrc: string[];
    fontSrc: string[];
    connectSrc: string[];
    objectSrc: string[];
    formAction: string[];
  };
  rateLimit: {
    windowMs: number;
    maxRequests: number;
    message: string;
  };
  headers: Record<string, string>;
}

export const securityConfig: SecurityConfig = {
  csp: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "'unsafe-eval'",
      "'unsafe-inline'",
      "https://vercel.live",
      "https://va.vercel-scripts.com",
      "https://cdnjs.cloudflare.com",
      "https://fonts.googleapis.com"
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      "https://fonts.googleapis.com",
      "https://cdnjs.cloudflare.com"
    ],
    imgSrc: ["'self'", "data:", "blob:", "https:", "http:"],
    fontSrc: [
      "'self'",
      "https://fonts.gstatic.com",
      "https://cdnjs.cloudflare.com"
    ],
    connectSrc: [
      "'self'",
      "https://vercel.live",
      "https://vitals.vercel-insights.com"
    ],
    objectSrc: ["'none'"],
    formAction: ["'self'"]
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 requests per window for contact form
    message: "Too many requests from this IP, please try again later."
  },
  headers: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  }
};

export function generateCSPString(csp: SecurityConfig['csp']): string {
  const directives = [
    `default-src ${csp.defaultSrc.join(' ')}`,
    `script-src ${csp.scriptSrc.join(' ')}`,
    `style-src ${csp.styleSrc.join(' ')}`,
    `img-src ${csp.imgSrc.join(' ')}`,
    `font-src ${csp.fontSrc.join(' ')}`,
    `object-src ${csp.objectSrc.join(' ')}`,
    `base-uri 'self'`,
    `form-action ${csp.formAction.join(' ')}`,
    `frame-ancestors 'none'`,
    `block-all-mixed-content`,
    `upgrade-insecure-requests`,
    `connect-src ${csp.connectSrc.join(' ')}`
  ];
  
  return directives.join('; ');
}

// Input sanitization utility
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Rate limiting storage (simple in-memory for demo, use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(identifier: string, config: SecurityConfig['rateLimit']): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  const stored = rateLimitStore.get(identifier);
  
  if (!stored || now > stored.resetTime) {
    // Reset or first request
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs
    });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs
    };
  }
  
  if (stored.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: stored.resetTime
    };
  }
  
  stored.count += 1;
  rateLimitStore.set(identifier, stored);
  
  return {
    allowed: true,
    remaining: config.maxRequests - stored.count,
    resetTime: stored.resetTime
  };
}

// Security audit utilities
export interface SecurityAuditResult {
  score: number;
  issues: string[];
  recommendations: string[];
}

export function performBasicSecurityAudit(): SecurityAuditResult {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // Check environment variables
  if (process.env.NODE_ENV !== 'production') {
    recommendations.push('Ensure NODE_ENV is set to production in production environment');
  }

  // Check for secure headers implementation
  if (!process.env.NEXT_PUBLIC_SITE_URL?.startsWith('https://')) {
    issues.push('Site URL should use HTTPS in production');
    score -= 20;
  }

  // Add more checks as needed
  recommendations.push('Regularly update dependencies to patch security vulnerabilities');
  recommendations.push('Implement proper logging and monitoring for security events');
  recommendations.push('Use environment variables for sensitive configuration');
  recommendations.push('Implement proper input validation on all user inputs');

  return {
    score,
    issues,
    recommendations
  };
}