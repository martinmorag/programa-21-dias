import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, lastname, email, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    // Check if a user with this email already exists
    const existingUser = await prisma.usuarios.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Este email ya está en uso' }, { status: 409 });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    await prisma.usuarios.create({
      data: {
        name: name,
        lastname: lastname || null,
        email: email,
        password: hashedPassword,
        level: 'Cliente',
      },
    });
    
    return NextResponse.json({ message: 'User registered successfully!' }, { status: 201 });

  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}