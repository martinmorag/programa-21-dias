"use client";

import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { CertificateProps } from "@/lib/utils";

const CertificateViewer: React.FC<CertificateProps> = ({ userName, isEmprendedorPersonal, completionDate }) => {
  const screenRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const certificateImageUrl = isEmprendedorPersonal
    ? "/certificados/certificado-emprendedorpersonal.png"
    : "/certificados/certificado-emprendedor.png";

  const waitForImage = async (container: HTMLElement) => {
    const img = container.querySelector("img") as HTMLImageElement | null;
    if (!img) return;
    if (!img.complete) {
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = () => res(); // don’t block; still try
      });
    }
    if (img.decode) {
      try { await img.decode(); } catch {}
    }
  };

  const downloadPdf = async () => {
    if (!exportRef.current) return;

    // Make sure fonts & export image are ready
    if ("fonts" in document) {
      try { await (document as any).fonts.ready; } catch {}
    }
    await waitForImage(exportRef.current);

    const canvas = await html2canvas(exportRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    // Keep PDF size matching the DOM size to avoid re-scaling shifts
    const imgWidth = 888;
    const imgHeight = 630.4;

    const pdf = new jsPDF("landscape", "px", [imgWidth, imgHeight]);
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("certificado.pdf");
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#49484d]">Tu Certificado</h1>

      {/* On-screen preview (username where it looks right in the browser) */}
      <div
        ref={screenRef}
        className="relative w-[888px] h-[630.4px] shadow-xl border-4 border-gray-300"
      >
        <img
          src={certificateImageUrl}
          alt="Certificate"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute" style={{ top: "230.531px", left: "309px" }}>
          <p
            className="text-[4rem] font-vivaldi text-gray-800"
            style={{ lineHeight: "1", whiteSpace: "nowrap", margin: 0, padding: 0 }}
          >
            {userName}
          </p>
        </div>
        <div className="absolute right-[8.3rem] bottom-[8.3rem] text-gray-700 text-lg font-copperplategothic">
          <p>{completionDate}</p>
        </div>
      </div>

      {/* Off-screen export copy (username nudged up for html2canvas/pdf) */}
      <div
        ref={exportRef}
        className="relative w-[888px] h-[630.4px] border-0"
        style={{
          position: "fixed",
          left: "-10000px", // keep it out of view (no flicker)
          top: "0",
          pointerEvents: "none",
        }}
        aria-hidden
      >
        <img
          src={certificateImageUrl}
          alt="Certificate"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute" style={{ top: "205px", left: "309px" }}>
          <p
            className="text-[4rem] font-vivaldi text-gray-800"
            style={{ lineHeight: "1", whiteSpace: "nowrap", margin: 0, padding: 0 }}
          >
            {userName}
          </p>
        </div>
        <div className="absolute right-[8.3rem] bottom-[9rem] text-gray-700 text-lg font-copperplategothic">
          {completionDate}
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