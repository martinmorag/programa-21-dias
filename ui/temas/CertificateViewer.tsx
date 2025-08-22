"use client";

import React, { useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface CertificateProps {
    userName: string;
    isEmprendedorPersonal: boolean; // New prop to differentiate certificates
}

const CertificateViewer: React.FC<CertificateProps> = ({ userName, isEmprendedorPersonal }) => {
    const certificateRef = useRef<HTMLDivElement>(null);

    const certificateImageUrl = isEmprendedorPersonal
        ? '/certificados/certificado-emprendedorpersonal.png' // Image for emprendedorpersonal
        : '/certificados/certificado-emprendedor.png'; // Image for emprendedor

    const downloadPdf = async () => {
        if (certificateRef.current) {
            const canvas = await html2canvas(certificateRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'px', [canvas.width, canvas.height]);
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save("certificado.pdf");
        }
    };

    const formattedDate = new Date().toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Tu Certificado</h1>
            <div
                ref={certificateRef}
                className="relative w-full aspect-[4/3] max-w-4xl shadow-xl border-4 border-gray-300"
            >
                <img
                    src={certificateImageUrl}
                    alt="Certificate"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-[4rem] font-vivaldi text-gray-800">
                        {userName}
                    </p>
                </div>
                <div className="absolute bottom-[8.8rem] right-[8.7rem] text-gray-700 text-lg font-copperplategothic">
                    {formattedDate}
                </div>
            </div>
            <button
                onClick={downloadPdf}
                className="mt-8 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition"
            >
                Descargar Certificado
            </button>
        </div>
    );
};

export default CertificateViewer;