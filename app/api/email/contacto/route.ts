import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    // 1. Send the contact email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM, // Your sender email from .env
      to: process.env.EMAIL_TO, // The recipient of the contact form, e.g., your business email
      subject: `Nuevo Mensaje de Contacto de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4;">
          <h2 style="color: #111827;">Mensaje de Contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Correo Electrónico:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap; padding: 10px; border: 1px solid #ddd; border-radius: 5px; background-color: #ffffff;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ message: 'Mensaje enviado exitosamente.' }, { status: 200 });
  } catch (error) {
    console.error('Error al enviar el email de contacto:', error);
    return NextResponse.json({ message: 'Ocurrió un error al enviar el mensaje.' }, { status: 500 });
  }
}