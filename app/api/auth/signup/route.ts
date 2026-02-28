import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/password';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, accountType, password, collegeName } = body;

        // Basic validation
        if (!firstName || !lastName || !email || !password || !accountType) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        const role = accountType === 'college' ? 'COLLEGE_ADMIN' : 'STUDENT';
        let collegeId = null;

        // Handle College logic if account type is college
        if (role === 'COLLEGE_ADMIN') {
            if (!collegeName) {
                return NextResponse.json({ error: 'College Name is required for College Admin accounts.' }, { status: 400 });
            }

            // Use upsert to handle existing college names
            const college = await prisma.college.upsert({
                where: { name: collegeName },
                update: {}, // Don't change anything if it exists
                create: {
                    name: collegeName,
                    isVerified: true // Auto verify for this demo
                }
            });
            collegeId = college.id;
        }

        // Create the user
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                passwordHash,
                role,
                collegeId
            }
        });

        // Generate JWT
        const token = await signToken({ userId: user.id, email: user.email, role: user.role, collegeId: user.collegeId });

        const response = NextResponse.json({
            message: 'User created successfully',
            user: {
                id: user.id,
                firstName: user.firstName,
                role: user.role
            },
            token
        }, { status: 201 });

        // Set HttpOnly cookie for seamless session
        response.cookies.set({
            name: 'auth_token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        return response;

    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
