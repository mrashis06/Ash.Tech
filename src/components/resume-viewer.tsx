
"use client";

export function ResumeViewer() {
  return (
    <object
      data="/api/resume"
      type="application/pdf"
      width="100%"
      height="100%"
    >
      <p>Your browser does not support PDFs. Please download the PDF to view it: <a href="/api/resume">Download PDF</a>.</p>
    </object>
  );
}
