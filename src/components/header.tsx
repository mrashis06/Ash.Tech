
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
    { href: "#projects", label: "Projects", number: "02." },
    { href: "#experience", label: "Experience", number: "03." },
    { href: "#skills", label: "Skills", number: "04." },
    { href: "#achievements", label: "Achievements", number: "05." },
    { href: "#blogs", label: "Blogs", number: "06." },
    { href: "#contact", label: "Contact", number: "07." },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className={cn(
          "flex items-center opacity-0",
          animated && "animate-fade-in"
        )} style={{ animationDelay: '0.1s' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/logo-black.png" 
            alt="A.K.R." 
            className="block dark:hidden h-10 w-auto object-contain transition-all duration-300 hover:opacity-80 hover:drop-shadow-[0_0_6px_rgba(0,0,0,0.1)]"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/logo-white.png" 
            alt="A.K.R." 
            className="hidden dark:block h-10 w-auto object-contain transition-all duration-300 hover:opacity-80 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
          />
        </Link>
        <div className="flex items-center gap-3">
          <div className={cn("opacity-0", animated && "animate-fade-in")} style={{ animationDelay: '0.9s' }}>
            <ThemeCustomizer />
          </div>
          <div className={cn("hidden sm:flex opacity-0 items-center", animated && "animate-fade-in")} style={{ animationDelay: '1s' }}>
            <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
              <a href="https://drive.google.com/file/d/1tQPrHgEN1GEfSzCN67UXAZ-OKRFQCnI4/view" target="_blank" rel="noopener noreferrer">Resume</a>
            </Button>
          </div>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9 border-border/60 hover:border-primary/50 hover:bg-primary/10">
                <Menu className="h-5 w-5 text-foreground" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-background/98 backdrop-blur-xl border-l border-border/50">
              <SheetHeader className="text-left pb-4 border-b border-border/40">
                <SheetTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  Navigation Menu
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 pt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 text-base font-medium p-2 rounded-lg transition-all hover:bg-primary/10 hover:text-primary group"
                    onClick={handleLinkClick}
                  >
                    <span className="text-xs font-mono text-primary font-bold px-2 py-0.5 rounded bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {link.number}
                    </span>
                    <span>{link.label}</span>
                  </Link>
                ))}
                <div className="pt-4 border-t border-border/40 sm:hidden">
                  <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary">
                    <a href="https://drive.google.com/file/d/1tQPrHgEN1GEfSzCN67UXAZ-OKRFQCnI4/view" target="_blank" rel="noopener noreferrer">Resume</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
