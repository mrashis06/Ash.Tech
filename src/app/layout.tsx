import type {Metadata} from 'next';
import './globals.css';
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

// SVG for the X logo
function XLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      {...props}
    >
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
    </svg>
  );
}

// SVG for the Medium logo
function MediumLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0"
      {...props}
    >
      <path d="M4.6,3.6h2.8l4,9.6l4-9.6h2.8v16.8h-2.8v-12L11.4,18L7.4,8.4v12H4.6V3.6z"/>
    </svg>
  );
}


export const metadata: Metadata = {
  title: 'Ash.Tech',
  description: 'Portfolio of Ashis Kumar Rai, an AI/ML Enthusiast, Full Stack Developer, and Innovator.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Source+Code+Pro:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        {children}
        
        {/* Left Social Bar */}
        <div className="hidden md:flex fixed left-10 bottom-0 flex-col items-center space-y-6 z-50">
          <Link href="https://www.linkedin.com/in/mrashis06/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-6 h-6 text-foreground hover:text-primary transition-colors" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="https://github.com/mrashis06" target="_blank" rel="noopener noreferrer">
            <Github className="w-6 h-6 text-foreground hover:text-primary transition-colors" />
            <span className="sr-only">GitHub</span>
          </Link>
          <div className="h-24 w-px bg-foreground/50"></div>
        </div>

        {/* Right Social Bar */}
        <div className="hidden md:flex fixed right-10 bottom-0 flex-col items-center space-y-6 z-50">
          <Link href="https://x.com/mrashis0603" target="_blank" rel="noopener noreferrer">
            <XLogo className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
            <span className="sr-only">X</span>
          </Link>
          <Link href="https://medium.com/@ash-tech" target="_blank" rel="noopener noreferrer">
            <MediumLogo className="w-6 h-6 text-foreground hover:text-primary transition-colors" />
            <span className="sr-only">Medium</span>
          </Link>
          <div className="h-24 w-px bg-foreground/50"></div>
        </div>
      </body>
    </html>
  );
}
