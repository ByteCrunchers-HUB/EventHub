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

        // 1. Template
        if (registration.event.certificateTemplateUrl) {
            try {
                const templatePath = path.join(process.cwd(), 'public', registration.event.certificateTemplateUrl.replace(/^\//, ''));
                if (fs.existsSync(templatePath)) {
                    const ext = path.extname(templatePath).toLowerCase().replace('.', '');
                    const format = (ext === 'jpg' || ext === 'jpeg') ? 'JPEG' : (ext === 'webp' ? 'WEBP' : 'PNG');
                    const imageBuffer = fs.readFileSync(templatePath);
                    doc.addImage(imageBuffer, format, 0, 0, 297, 210);
                } else {
                    applyDefaultStyling(doc);
                }
            } catch (e) {
                console.error('Failed to load template:', e);
                applyDefaultStyling(doc);
            }
        } else {
            applyDefaultStyling(doc);
        }

        // 2. Event Logo
        if (registration.event.imageUrl) {
            try {
                const logoPath = path.join(process.cwd(), 'public', registration.event.imageUrl.replace(/^\//, ''));
                if (fs.existsSync(logoPath)) {
                    const ext = path.extname(logoPath).toLowerCase().replace('.', '');
                    const format = (ext === 'jpg' || ext === 'jpeg') ? 'JPEG' : (ext === 'webp' ? 'WEBP' : 'PNG');
                    const logoBuffer = fs.readFileSync(logoPath);
                    // Place logo top-right
                    doc.addImage(logoBuffer, format, 247, 10, 40, 40);
                }
            } catch (e) {
                console.error('Failed to load logo:', e);
            }
        }

        // 3. Overlay Content
        // Shadow/Glow effect for the main title
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255); // White shadow
        doc.setFontSize(40);
        doc.text('CERTIFICATE OF PARTICIPATION', 148.5, 60.5, { align: 'center' });
        doc.setTextColor(30, 41, 59); // Main color
        doc.text('CERTIFICATE OF PARTICIPATION', 148.5, 60, { align: 'center' });

        doc.setFontSize(22);
        doc.setFont('helvetica', 'normal');
        doc.text('This is to certify that', 148.5, 85, { align: 'center' });

        // Highlight User Name
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(42); // Bigger name
        doc.setTextColor(37, 99, 235);
        doc.text(`${registration.user.firstName} ${registration.user.lastName}`, 148.5, 110, { align: 'center' });

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(20);
        doc.setTextColor(30, 41, 59);
        doc.text('has successfully attended the event', 148.5, 130, { align: 'center' });

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(28);
        doc.text(registration.event.title, 148.5, 150, { align: 'center' });

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(18);
        doc.text(`Held at ${registration.event.college.name}`, 148.5, 170, { align: 'center' });
        doc.setFontSize(16);
        doc.text(`On ${new Date(registration.event.date).toLocaleDateString()}`, 148.5, 180, { align: 'center' });

        doc.setFontSize(14);
        doc.setTextColor(100, 116, 139);
        doc.text(`Certificate ID: ${registration.id.slice(0, 8).toUpperCase()}`, 148.5, 200, { align: 'center' });

        const pdfOutput = doc.output('arraybuffer');
        const buffer = Buffer.from(pdfOutput);

        return new NextResponse(buffer, {
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
