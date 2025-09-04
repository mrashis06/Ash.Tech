
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeCustomizer } from './theme-customizer';


interface HeaderProps {
  animated?: boolean;
}

export function Header({ animated = false }: HeaderProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  const navLinks = [
    { href: "#about", label: "About", number: "01." },
    { href: "#skills", label: "Skills", number: "02." },
    { href: "#achievements", label: "Achievements", number: "03." },
    { href: "#projects", label: "Highlights", number: "04." },
    { href: "#blogs", label: "Blogs", number: "05." },
    { href: "#contact", label: "Contact", number: "06." },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className={cn(
          "flex items-center opacity-0",
          animated && "animate-fade-in"
        )} style={{ animationDelay: '0.1s' }}>
          <span className="font-bold text-2xl text-primary transition-colors hover:text-foreground">A.K.R</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map((link, index) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={cn(
                "transition-colors hover:text-primary opacity-0",
                 animated && "animate-fade-in"
              )}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <span className="text-primary">{link.number}</span> {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className={cn("opacity-0", animated && "animate-fade-in")} style={{ animationDelay: '0.9s' }}>
             <ThemeCustomizer />
          </div>
          <div className={cn("hidden md:flex opacity-0 items-center", animated && "animate-fade-in")} style={{ animationDelay: '1s' }}>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
            </Button>
          </div>
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
                {navLinks.map((link) => (
                   <Link key={link.href} href={link.href} className="text-lg font-medium transition-colors hover:text-primary" onClick={handleLinkClick}>
                     <span className="text-primary">{link.number}</span> {link.label}
                   </Link>
                ))}
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
