'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type PdfViewerClientProps = {
  pdfUrlSegments: string[];
};

export default function PdfViewerClient({ pdfUrlSegments }: PdfViewerClientProps) {
  const [url, setUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!pdfUrlSegments || pdfUrlSegments.length === 0) {
      return;
    }
    const fullPath = pdfUrlSegments.join('/');
    const decodedUrl = decodeURIComponent(fullPath);

    if (decodedUrl.startsWith('http')) {
      setUrl(decodedUrl);
    }
  }, [pdfUrlSegments]);

  console.log(url)

  if (!url) {
    // Return a loading state or a message
    return <div className="flex justify-center items-center h-screen">Loading PDF...</div>;
  }

  return (
    <div className="w-full h-screen bg-white dark:bg-gray-950 p-4">
      <div className="mb-4">
        <button
          onClick={() => router.back()}
          className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Volver
        </button>
      </div>
      <iframe
        src={url}
        className="w-full h-full border-none rounded-lg mt-12"
        title="PDF Viewer"
      />
    </div>
  );
}