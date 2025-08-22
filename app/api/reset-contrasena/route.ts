import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json({ error: 'Token y nueva contraseña son requeridos' }, { status: 400 });
        }

        // 1. Find the user by the token and check for expiration
        const user = await prisma.usuarios.findFirst({
            where: {
                passwordResetExpires: {
                    gte: new Date(), // Token has not expired
                },
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'El token es inválido o ha expirado.' }, { status: 400 });
        }
        
        // 2. Compare the plain-text token with the hashed token in the database
        const tokenIsValid = await bcrypt.compare(token, user.passwordResetToken!);

        if (!tokenIsValid) {
            return NextResponse.json({ error: 'El token es inválido o ha expirado.' }, { status: 400 });
        }

        // 3. Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Update the user's password and clear the token fields
        await prisma.usuarios.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                passwordResetToken: null,
                passwordResetExpires: null,
            },
        });

        return NextResponse.json({ message: 'Contraseña restablecida exitosamente.' });
    } catch (error) {
        console.error('Password reset failed:', error);
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}