import Link from 'next/link';
import { Code2 } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Ash.Tech</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="#projects" className="transition-colors hover:text-primary">Projects</Link>
          <Link href="#about" className="transition-colors hover:text-primary">About</Link>
          <Link href="#achievements" className="transition-colors hover:text-primary">Achievements</Link>
          <Link href="#certificates" className="transition-colors hover:text-primary">Certificates</Link>
          <Link href="#contact" className="transition-colors hover:text-primary">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
