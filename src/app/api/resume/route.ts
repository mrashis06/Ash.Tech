
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const filePath = path.resolve('./public', 'resume.pdf');
    
    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 });
    }
    
    const fileBuffer = fs.readFileSync(filePath);
    
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', 'inline; filename="resume.pdf"');

    return new NextResponse(fileBuffer, { status: 200, headers });
  } catch (error) {
    console.error('Error reading resume file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
