import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, signToken } from '@/lib/auth';

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

        let role = accountType === 'college' ? 'COLLEGE_ADMIN' : 'STUDENT';
        let collegeId = null;

        // Handle College creation logic if account type is college
        if (role === 'COLLEGE_ADMIN') {
            if (!collegeName) {
                return NextResponse.json({ error: 'College Name is required for College Admin accounts.' }, { status: 400 });
            }

            // Create the college (in a real app, this might go to a verification queue first)
            const college = await prisma.college.create({
                data: {
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

        // Setup response (could also set httponly cookie here)
        return NextResponse.json({
            message: 'User created successfully',
            user: {
                id: user.id,
                firstName: user.firstName,
                role: user.role
            },
            token
        }, { status: 201 });

    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
