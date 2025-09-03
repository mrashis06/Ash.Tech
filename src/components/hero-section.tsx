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

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center">
      <div className="container px-4 md:px-6 text-center">
        <div className="space-y-4">
          <p className="text-lg font-code text-primary">
            Hi, my name is
          </p>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Ashis Kumar Rai
          </h1>
          <p className="max-w-[700px] mx-auto text-primary text-xl md:text-2xl font-semibold">
            AI/ML & MLOps Enthusiast | Full Stack Developer | DevOps Practitioner
          </p>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            Passionate about creating smart solutions, automating workflows, and deploying AI-driven applications efficiently
          </p>
        </div>
      </div>

      {/* Left Social Bar */}
      <div className="hidden md:flex fixed left-10 bottom-0 flex-col items-center space-y-6">
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
      <div className="hidden md:flex fixed right-10 bottom-0 flex-col items-center space-y-6">
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
    </section>
  );
}
