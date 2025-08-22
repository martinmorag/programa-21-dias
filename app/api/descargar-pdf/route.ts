import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pdfUrl = searchParams.get('url');

  if (!pdfUrl) {
    return new NextResponse('URL not provided', { status: 400 });
  }

  try {
    const response = await fetch(pdfUrl);

    if (!response.ok) {
      return new NextResponse(`Failed to fetch PDF from URL: ${response.statusText}`, { status: response.status });
    }

    // Get the filename from the URL, or use a default
    const filename = pdfUrl.split('/').pop() || 'download.pdf';

    // Get the Content-Type from the response headers
    const contentType = response.headers.get('Content-Type') || 'application/pdf';

    // Create a new response with the file stream
    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    headers.set('Content-Type', contentType);
    
    // Return a streaming response with the file content
    return new NextResponse(response.body, { headers });

  } catch (error) {
    console.error('Error fetching PDF:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}