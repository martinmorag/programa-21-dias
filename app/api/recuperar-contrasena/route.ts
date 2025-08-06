import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/sendEmail'; 
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 1. Find the user by email
    const user = await prisma.usuarios.findUnique({
      where: { email },
    });

    if (!user) {
      // Return a generic success message to prevent user enumeration
      return NextResponse.json({ message: 'If an account exists for this email, a password reset link has been sent.' });
    }

    // 2. Generate a secure, unique token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = await bcrypt.hash(resetToken, 10);
    
    // Set a token expiration time (e.g., 1 hour from now)
    const passwordResetExpires = new Date(Date.now() + 3600000); 

    // 3. Save the token and its expiration to the user in the database
    await prisma.usuarios.update({
      where: { id: user.id },
      data: {
        passwordResetToken,
        passwordResetExpires,
      },
    });

    // 4. Send the password reset email
    const resetUrl = `${req.nextUrl.origin}/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(user.email, resetUrl);

    // 5. Respond with a success message
    return NextResponse.json({ message: 'If an account exists for this email, a password reset link has been sent.' });
  } catch (error) {
    console.error('Password reset request failed:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}