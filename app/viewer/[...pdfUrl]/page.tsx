import PdfViewerClient from '@/ui/temas/PdfViewerClient';
import { notFound } from 'next/navigation';
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "PDF",
  description: "Programa 21 Días: Impulsa tu negocio, transforma tu futuro"
}

type Props = Promise<{ pdfUrl: string[] }>;

export default async function PdfViewerPage({ params }: { params: Props }) {
  const { pdfUrl } =  await params;
  if (!pdfUrl || pdfUrl.length === 0) {
    notFound();
  }

  return <PdfViewerClient pdfUrlSegments={pdfUrl} />;
}