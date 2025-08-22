"use client";

import React, { useState } from 'react';

type Props = {
  pdfUrl: string;
  fileName: string;
};

export default function PdfDownloadButton({ pdfUrl, fileName }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      // Build the URL to your new API route, passing the external URL as a query parameter
      const downloadApiUrl = `/api/descargar-pdf?url=${encodeURIComponent(pdfUrl)}`;

      // Create a temporary link element and trigger the download
      const link = document.createElement('a');
      link.href = downloadApiUrl;
      link.download = `${fileName}.pdf`; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error al descargar el archivo. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className={`font-medium py-2 px-6 rounded-lg transition ${
        isLoading
          ? 'bg-gray-400 text-gray-800 cursor-wait'
          : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
      }`}
    >
      {isLoading ? 'Descargando...' : 'Descargar PDF'}
    </button>
  );
}