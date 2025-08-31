
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="font-bold text-2xl text-primary transition-colors hover:text-foreground">A.K.R</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="#about" className="transition-colors hover:text-primary">
            <span className="text-primary">01.</span> About
          </Link>
           <Link href="#skills" className="transition-colors hover:text-primary">
            <span className="text-primary">02.</span> Skills
          </Link>
          <Link href="#experience" className="transition-colors hover:text-primary">
            <span className="text-primary">03.</span> Experience
          </Link>
          <Link href="#projects" className="transition-colors hover:text-primary">
            <span className="text-primary">04.</span> Highlights
          </Link>
          <Link href="#blogs" className="transition-colors hover:text-primary">
            <span className="text-primary">05.</span> Blogs
          </Link>
          <Link href="#contact" className="transition-colors hover:text-primary">
            <span className="text-primary">06.</span> Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" className="hidden md:flex border-primary text-primary hover:bg-primary/10 hover:text-primary">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
          </Button>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 pt-12">
                <Link href="#about" className="text-lg font-medium transition-colors hover:text-primary" onClick={handleLinkClick}>
                  <span className="text-primary">01.</span> About
                </Link>
                <Link href="#skills" className="text-lg font-medium transition-colors hover:text-primary" onClick={handleLinkClick}>
                  <span className="text-primary">02.</span> Skills
                </Link>
                <Link href="#experience" className="text-lg font-medium transition-colors hover:text-primary" onClick={handleLinkClick}>
                  <span className="text-primary">03.</span> Experience
                </Link>
                <Link href="#projects" className="text-lg font-medium transition-colors hover:text-primary" onClick={handleLinkClick}>
                  <span className="text-primary">04.</span> Highlights
                </Link>
                <Link href="#blogs" className="text-lg font-medium transition-colors hover:text-primary" onClick={handleLinkClick}>
                  <span className="text-primary">05.</span> Blogs
                </Link>
                <Link href="#contact" className="text-lg font-medium transition-colors hover:text-primary" onClick={handleLinkClick}>
                  <span className="text-primary">06.</span> Contact
                </Link>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
