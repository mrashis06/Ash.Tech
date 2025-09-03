
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
          <Button asChild size="lg" className="text-sm sm:text-base">
            <a href="mailto:theashis0610@gmail.com">
              <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Contact Me
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
