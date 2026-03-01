import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('auth_token')?.value;
        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const payload = await verifyToken(token);
        if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const registrationId = searchParams.get('registrationId');

        if (!registrationId) {
            return NextResponse.json({ error: 'Registration ID required' }, { status: 400 });
        }

        const registration = await prisma.registration.findUnique({
            where: { id: registrationId },
            include: {
                user: true,
                event: {
                    include: {
                        college: true
                    }
                }
            }
        }) as any;

        if (!registration || registration.userId !== payload.userId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        if (registration.status !== 'ATTENDED') {
            return NextResponse.json({ error: 'Certificate not available. Attendance was not marked.' }, { status: 403 });
        }

        // Generate PDF
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        if (registration.event.certificateTemplateUrl) {
            // Use custom template
            try {
                // In a production Next.js app on Vercel, public files might not be directly accessible via fs easily.
                // But since we are running locally and writing to public/uploads, we can try to get the base64.
                // Alternatively, we can use the URL if we were in a browser, but we are in a route handler.
                const templatePath = path.join(process.cwd(), 'public', registration.event.certificateTemplateUrl);

                if (fs.existsSync(templatePath)) {
                    const imageBuffer = fs.readFileSync(templatePath);
                    const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;
                    doc.addImage(base64Image, 'PNG', 0, 0, 297, 210);
                } else {
                    // Fallback to default styling if file not found
                    applyDefaultStyling(doc);
                }
            } catch (e) {
                console.error('Failed to load template image:', e);
                applyDefaultStyling(doc);
            }
        } else {
            // Default styling
            applyDefaultStyling(doc);
        }

        // Overlay Text
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(40);
        doc.setTextColor(30, 41, 59);
        // Position slightly adjusted depending on template, but we'll stick to center
        doc.text('CERTIFICATE OF PARTICIPATION', 148.5, 60, { align: 'center' });

        doc.setFontSize(20);
        doc.setFont('helvetica', 'normal');
        doc.text('This is to certify that', 148.5, 85, { align: 'center' });

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(32);
        doc.setTextColor(37, 99, 235);
        doc.text(`${registration.user.firstName} ${registration.user.lastName}`, 148.5, 105, { align: 'center' });

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(18);
        doc.setTextColor(30, 41, 59);
        doc.text('has successfully attended the event', 148.5, 125, { align: 'center' });

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.text(registration.event.title, 148.5, 145, { align: 'center' });

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(16);
        doc.text(`Held at ${registration.event.college.name} on ${new Date(registration.event.date).toLocaleDateString()}`, 148.5, 165, { align: 'center' });

        doc.setFontSize(14);
        doc.setTextColor(100, 116, 139);
        doc.text(`Certificate ID: ${registration.id.slice(0, 8).toUpperCase()}`, 148.5, 185, { align: 'center' });

        const pdfOutput = doc.output('arraybuffer');

        return new NextResponse(pdfOutput, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="Certificate_${registration.event.title.replace(/\s+/g, '_')}.pdf"`
            }
        });

    } catch (error) {
        console.error('Error generating certificate:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

function applyDefaultStyling(doc: any) {
    doc.setFillColor(245, 245, 245);
    doc.rect(0, 0, 297, 210, 'F');

    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(5);
    doc.rect(10, 10, 277, 190, 'S');
}
