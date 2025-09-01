
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
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // By changing the key, we force the animation component to remount on refresh
    setAnimationKey(prevKey => prevKey + 1);

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
    return <LandingAnimation key={animationKey} onComplete={handleAnimationComplete} />;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ScrollAnimation>
          <HeroSection />
        </ScrollAnimation>
        <ScrollAnimation>
          <AboutSection />
        </ScrollAnimation>
        <ScrollAnimation>
          <SkillsSection />
        </ScrollAnimation>
        <ScrollAnimation>
          <ExperienceSection />
        </ScrollAnimation>
        <ScrollAnimation>
          <ProjectsSection repos={repos} />
        </ScrollAnimation>
        <ScrollAnimation>
          <BlogsSection blogs={blogs} />
        </ScrollAnimation>
        <ScrollAnimation>
          <ContactSection />
        </ScrollAnimation>
      </main>
      <Footer />
    </div>
  );
}
