import jsPDF from 'jspdf';
import JSZip from 'jszip';
import type { Certificate } from './api';

const PRIMARY_COLOR = '#4F46E5'; // Indigo
const TEXT_COLOR = '#1F2937'; // Gray-800
const SECONDARY_TEXT_COLOR = '#6B7280'; // Gray-500

export const generateCertificatePDF = (cert: Certificate, userName: string): jsPDF => {
    // Landscape orientation
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    // Background border
    doc.setLineWidth(2);
    doc.setDrawColor(PRIMARY_COLOR);
    doc.rect(10, 10, width - 20, height - 20);

    // Inner thin border
    doc.setLineWidth(0.5);
    doc.rect(12, 12, width - 24, height - 24);

    // Logo / Header
    doc.setFontSize(24);
    doc.setTextColor(PRIMARY_COLOR);
    doc.setFont('helvetica', 'bold');
    doc.text('DesiCodes', width / 2, 40, { align: 'center' });

    // Title
    doc.setFontSize(36);
    doc.setTextColor(TEXT_COLOR);
    doc.setFont('helvetica', 'normal');
    doc.text('Certificate of Achievement', width / 2, 70, { align: 'center' });

    // Presented to
    doc.setFontSize(16);
    doc.setTextColor(SECONDARY_TEXT_COLOR);
    doc.text('This is to certify that', width / 2, 90, { align: 'center' });

    // User Name
    doc.setFontSize(32);
    doc.setTextColor(TEXT_COLOR);
    doc.setFont('helvetica', 'bold');
    doc.text(userName, width / 2, 110, { align: 'center' });

    // Description
    doc.setFontSize(16);
    doc.setTextColor(SECONDARY_TEXT_COLOR);
    doc.setFont('helvetica', 'normal');
    doc.text('Has successfully demonstrated proficiency in', width / 2, 130, { align: 'center' });

    // Language
    doc.setFontSize(28);
    doc.setTextColor(PRIMARY_COLOR);
    doc.setFont('helvetica', 'bold');
    doc.text(cert.language, width / 2, 150, { align: 'center' });

    // Date
    doc.setFontSize(14);
    doc.setTextColor(SECONDARY_TEXT_COLOR);
    doc.setFont('helvetica', 'normal');
    const dateStr = new Date(cert.issued_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    doc.text(`Issued on ${dateStr}`, width / 2, 170, { align: 'center' });

    // ID
    doc.setFontSize(10);
    doc.setTextColor('#9CA3AF');
    doc.text(`Certificate ID: ${cert.id}`, width / 2, 185, { align: 'center' });

    // Footer
    doc.setFontSize(12);
    doc.setTextColor(TEXT_COLOR);
    doc.text('DesiCodes Verification System', width / 2, height - 20, { align: 'center' });

    return doc;
};

export const downloadCertificate = (cert: Certificate, userName: string) => {
    const doc = generateCertificatePDF(cert, userName);
    doc.save(`${cert.language}_Certificate_DesiCodes.pdf`);
};

export const downloadAllCertificatesZip = async (certificates: Certificate[], userName: string) => {
    const zip = new JSZip();
    const folder = zip.folder("DesiCodes_Certificates");

    if (!folder) return;

    certificates.forEach(cert => {
        const doc = generateCertificatePDF(cert, userName);
        const pdfBlob = doc.output('blob');
        folder.file(`${cert.language}_Certificate.pdf`, pdfBlob);
    });

    const content = await zip.generateAsync({ type: "blob" });

    // Create download link
    const url = window.URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = "DesiCodes_Certificates.zip";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};
