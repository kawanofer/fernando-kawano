interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// HTML string function for direct HTML usage - matches working API template
export const generateEmailHTML = ({
  name,
  email,
  subject,
  message,
}: EmailTemplateProps): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      </div>
      
      <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
        <h3 style="color: #333;">Message:</h3>
        <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background-color: #e3f2fd; border-radius: 8px;">
        <p style="margin: 0; font-size: 14px; color: #1976d2;">
          This email was sent from your portfolio contact form.
        </p>
      </div>
    </div>
  `;
};
