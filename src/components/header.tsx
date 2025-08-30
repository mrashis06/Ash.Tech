import Link from 'next/link';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="font-bold text-2xl text-primary">A.R</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="#about" className="transition-colors hover:text-primary">
            <span className="text-primary">01.</span> About
          </Link>
          <Link href="#experience" className="transition-colors hover:text-primary">
            <span className="text-primary">02.</span> Experience
          </Link>
          <Link href="#projects" className="transition-colors hover:text-primary">
            <span className="text-primary">03.</span> Highlights
          </Link>
          <Link href="#blogs" className="transition-colors hover:text-primary">
            <span className="text-primary">04.</span> Blogs
          </Link>
          <Link href="#contact" className="transition-colors hover:text-primary">
            <span className="text-primary">05.</span> Contact
          </Link>
        </nav>
        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
        </Button>
      </div>
    </header>
  );
}
