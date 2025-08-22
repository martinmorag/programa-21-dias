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
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
          <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
            <tr>
              <td align="center" style="padding: 20px;">
                <table cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <tr>
                    <td style="padding: 40px; text-align: center;">
                      <h1 style="color: #111827; margin: 0 0 20px 0; font-size: 24px;">Restablecer tu contraseña</h1>
                      <p style="margin: 0 0 20px 0; font-size: 16px;">
                        Parece que solicitaste restablecer tu contraseña.
                      </p>
                      <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #ffffff; background-color: #111827; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Restablecer contraseña
                      </a>
                      <p style="margin-top: 30px; font-size: 14px; color: #888;">
                        Si no solicitaste un restablecimiento de contraseña, ignora este correo.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
    });
    console.log("Email sent successfully to " + email);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};