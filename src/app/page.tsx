
"use client";

import { useState, useEffect } from 'react';
import type { GitHubRepo, MediumPost } from '@/types';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { AboutSection } from '@/components/about-section';
import { SkillsSection } from '@/components/skills-section';
import { ExperienceSection } from '@/components/experience-section';
import { BlogsSection } from '@/components/blogs-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { ScrollAnimation } from '@/components/scroll-animation';
import { LandingAnimation } from '@/components/landing-animation';
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

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


const PINNED_REPOS = ['SmartSetu', 'rag', 'OFFLINE_FILE_TRANSFER', 'musox'];

async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    // Fetch all repos sorted by most recently pushed
    const response = await fetch('https://api.github.com/users/mrashis06/repos?type=public&sort=pushed&direction=desc', {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      console.error('Failed to fetch GitHub repos:', response.statusText);
      return [];
    }

    const allRepos: GitHubRepo[] = await response.json();
    
    // Manually set descriptions for specific repos
    const repoDetails: { [key: string]: { description?: string; homepage?: string } } = {
      smartsetu: {
        description: 'SmartSetu is a modern web application designed to streamline user onboarding and document verification, leveraging AI and Firebase for a seamless, secure, and user-friendly experience.',
        homepage: 'https://smart-setu.vercel.app/'
      },
      rag: {
        description: 'Implemented a RAG system combining retrieval-based and generative models to enhance response generation.'
      },
      offline_file_transfer: {
        description: 'Developed a system enabling file transfers without an active internet connection.'
      },
      musox: {
        description: 'Musox – A Python-based web app that uses the Spotify API to fetch song details, find matching audio on YouTube, and stream it seamlessly.'
      }
    };

    allRepos.forEach(repo => {
      const details = repoDetails[repo.name.toLowerCase()];
      if (details) {
        if (details.description) {
          repo.description = details.description;
        }
        if (details.homepage) {
          repo.homepage = details.homepage;
        }
      }
    });

    // Separate pinned repos from the rest
    const pinnedRepos: GitHubRepo[] = [];
    const otherRepos: GitHubRepo[] = [];

    allRepos.forEach(repo => {
      if (PINNED_REPOS.some(pinned => pinned.toLowerCase() === repo.name.toLowerCase())) {
        pinnedRepos.push(repo);
      } else {
        otherRepos.push(repo);
      }
    });

    // Sort pinned repos according to the PINNED_REPOS array order
    pinnedRepos.sort((a, b) => {
      const aIndex = PINNED_REPOS.findIndex(name => name.toLowerCase() === a.name.toLowerCase());
      const bIndex = PINNED_REPOS.findIndex(name => name.toLowerCase() === b.name.toLowerCase());
      return aIndex - bIndex;
    });

    // Combine pinned repos with a slice of other repos to total 6
    const combinedRepos = [...pinnedRepos, ...otherRepos.slice(0, 6 - pinnedRepos.length)];
    
    return combinedRepos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

async function getMediumBlogs(): Promise<MediumPost[]> {
  try {
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40ash-tech', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!response.ok) {
      console.error('Failed to fetch Medium blogs:', response.statusText);
      return [];
    }
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching Medium blogs:', error);
    return [];
  }
}

export default function Home() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [blogs, setBlogs] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [repoData, blogData] = await Promise.all([
        getGitHubRepos(),
        getMediumBlogs()
      ]);
      setRepos(repoData);
      setBlogs(blogData);
    }
    fetchData();
  }, []);

  const handleAnimationComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return <LandingAnimation onComplete={handleAnimationComplete} />;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header animated={!loading} />
      <main className="flex-1">
        <HeroSection animated={!loading} />
        <div className="container max-w-5xl mx-auto">
          <ScrollAnimation>
            <AboutSection />
          </ScrollAnimation>
          <ScrollAnimation>
            <SkillsSection />
          </ScrollAnimation>
          <ScrollAnimation duration={0.3}>
            <ExperienceSection />
          </ScrollAnimation>
          <ScrollAnimation duration={0.3}>
            <ProjectsSection repos={repos} />
          </ScrollAnimation>
          <ScrollAnimation duration={0.3}>
            <BlogsSection blogs={blogs} />
          </ScrollAnimation>
          <ScrollAnimation>
            <ContactSection />
          </ScrollAnimation>
        </div>
      </main>
      <Footer />
      
      {/* Left Social Bar */}
      <div className={cn(
        "hidden md:flex fixed left-10 bottom-0 flex-col items-center space-y-6 z-50 opacity-0",
        !loading && "animate-fade-in"
      )} style={{ animationDelay: '1.2s' }}>
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
      <div className={cn(
        "hidden md:flex fixed right-10 bottom-0 flex-col items-center space-y-6 z-50 opacity-0",
        !loading && "animate-fade-in"
      )} style={{ animationDelay: '1.2s' }}>
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
    </div>
  );
}
