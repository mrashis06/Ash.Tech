import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

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
          </div>
        </div>
      </div>
    </section>
  );
}
