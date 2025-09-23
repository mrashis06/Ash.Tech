
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

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


export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-8 border-t">
      <div className="container flex flex-col items-center justify-center gap-6">
        <div className="flex justify-center space-x-6">
            <Link href="https://www.linkedin.com/in/mrashis06/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="https://github.com/mrashis06" target="_blank" rel="noopener noreferrer">
              <Github className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://x.com/mrashis0603" target="_blank" rel="noopener noreferrer">
              <XLogo className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              <span className="sr-only">X</span>
            </Link>
            <Link href="https://medium.com/@ash-tech" target="_blank" rel="noopener noreferrer">
              <MediumLogo className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
              <span className="sr-only">Medium</span>
            </Link>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          <p>Designed & Built by Ashis Kumar Rai</p>
          <p>&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
