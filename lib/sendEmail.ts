import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: process.env.EMAIL_SERVER_PASSWORD
  }
});

export const sendPasswordResetEmail = async (email: string, resetUrl: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Restablecer tu contraseña',
      html: `
        <h1>Restablecer tu contraseña</h1>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetUrl}">Restablecer contraseña</a>
        <p>Si no solicitaste un restablecimiento de contraseña, ignora este correo.</p>
      `,
    });
    console.log("Email sent successfully to " + email);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};