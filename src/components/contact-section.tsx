import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

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
      {...props}
    >
      <path d="M5.6 4.75a.9.9 0 00-.9.9v12.8c0 .5.4.9.9.9h12.8c.5 0 .9-.4.9-.9V5.65c0-.5-.4-.9-.9-.9H5.6zM17 10.6a2.8 2.8 0 01-1.1 2.3l-2.6 2.3c-.2.2-.3.2-.4 0l-2.1-2.4c-.1-.1-.2-.1-.2 0l-1.3 1.4c-.1.1-.2 0-.2-.1V8.5c0-.1.1-.2.2-.2h6.7c.1 0 .2.1.2.2v2.1z" />
    </svg>
  );
}


export function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 bg-muted/40">
      <div className="container px-4 md:px-6 text-center">
        <div className="space-y-6 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Get In Touch</h2>
          <p className="text-muted-foreground md:text-xl">
            I'm currently open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <Button asChild size="lg">
            <a href="mailto:theashis0610@gmail.com">
              <Mail className="mr-2 h-5 w-5" />
              Contact Me
            </a>
          </Button>
          <div className="flex justify-center space-x-6 pt-4">
            <Link href="https://github.com/mrashis06" target="_blank" rel="noopener noreferrer">
              <Github className="w-8 h-8 text-foreground hover:text-primary transition-colors" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-8 h-8 text-foreground hover:text-primary transition-colors" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="https://x.com/mrashis0603" target="_blank" rel="noopener noreferrer">
              <XLogo className="w-7 h-7 text-foreground hover:text-primary transition-colors" />
              <span className="sr-only">X</span>
            </Link>
            <Link href="https://medium.com/@ash-tech" target="_blank" rel="noopener noreferrer">
              <MediumLogo className="w-8 h-8 text-foreground hover:text-primary transition-colors" />
              <span className="sr-only">Medium</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}