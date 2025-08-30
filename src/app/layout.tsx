import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ash.Tech',
  description: 'Portfolio of Ashis Kumar Rai, an AI/ML Enthusiast, Full Stack Developer, and Innovator.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
