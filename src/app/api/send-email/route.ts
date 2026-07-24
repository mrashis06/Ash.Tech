import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parseResult = formSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid input.' }, { status: 400 });
    }

    const { name, email, message } = parseResult.data;
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.PERSONAL_EMAIL || 'sdjod.in@gmail.com';

    // 1. Resend API (if configured)
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const { error } = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [toEmail],
        subject: `New Portfolio Message from ${name}`,
        reply_to: email,
        html: `
          <p>You received a new message from your portfolio contact form.</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

      if (!error) {
        return NextResponse.json({ message: 'Message sent successfully via Resend!' });
      }
    }

    // 2. Encrypted FormSubmit Endpoint for sdjod.in@gmail.com (levowi)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('_subject', `New Portfolio Message from ${name}`);
    formData.append('_captcha', 'false');

    const formSubmitResponse = await fetch('https://formsubmit.co/ajax/levowi', {
      method: 'POST',
      body: formData,
    });

    const resultText = await formSubmitResponse.text().catch(() => '');
    console.log('FormSubmit response status:', formSubmitResponse.status, resultText);

    if (formSubmitResponse.ok) {
      return NextResponse.json({ message: 'Message sent successfully!' });
    }

    throw new Error(`Failed to send email. Status: ${formSubmitResponse.status}`);
  } catch (error) {
    console.error('Email API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
