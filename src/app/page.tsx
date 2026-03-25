
"use client";

import { useState, useEffect } from 'react';
import type { GitHubRepo, MediumPost } from '@/types';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { AboutSection } from '@/components/about-section';
import { SkillsSection } from '@/components/skills-section';
import { ExperienceSection } from '@/components/experience-section';
import { AchievementsSection } from '@/components/achievements-section';
import { BlogsSection } from '@/components/blogs-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { ScrollAnimation } from '@/components/scroll-animation';
import { LandingAnimation } from '@/components/landing-animation';
import { SocialBars } from '@/components/social-bars';


const PINNED_REPOS = ['SmartSetu', 'rag', 'OFFLINE_FILE_TRANSFER', 'musox'];

async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    // Fetch up to 100 repos, bypass Next.js cache to ensure fresh data
    const response = await fetch('https://api.github.com/users/mrashis06/repos?type=public&per_page=100', {
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error('Failed to fetch GitHub repos:', response.statusText);
      return [];
    }

    const allReposData: any = await response.json();
    
    if (!Array.isArray(allReposData)) {
      console.error('Expected array from GitHub API, but got:', allReposData);
      return [];
    }
    
    const allRepos: GitHubRepo[] = allReposData;
    
    // Manually set descriptions for specific repos
    const repoDetails: { [key: string]: { description?: string; homepage?: string; appType?: string; } } = {
      smartsetu: {
        description: 'SmartSetu is a modern web application designed to streamline user onboarding and document verification, leveraging AI and Firebase for a seamless, secure, and user-friendly experience.',
        homepage: 'https://smart-setu.vercel.app/',
        appType: 'Web'
      },
      rag: {
        description: 'Implemented a RAG system combining retrieval-based and generative models to enhance response generation.',
        appType: 'AI & ML'
      },
      offline_file_transfer: {
        description: 'Developed a system enabling file transfers without an active internet connection.',
        appType: 'Other'
      },
      musox: {
        description: 'Musox – A Python-based web app that uses the Spotify API to fetch song details, find matching audio on YouTube, and stream it seamlessly.',
        appType: 'Web'
      },
      "ash.tech": {
        description: 'This is the GitHub repository for my portfolio website itself. Explore the code to see how it was built.',
        appType: 'Web'
      }
    };

    allRepos.forEach(repo => {
      const details = repoDetails[repo.name.toLowerCase()];
      if (details) {
        if (details.description !== undefined) {
          repo.description = details.description;
        }
        if (details.homepage) {
          repo.homepage = details.homepage;
        }
        if (details.appType) {
          repo.appType = details.appType;
        }
      }
      
      // Fallback inference for appType if not manually defined
      if (!repo.appType) {
        // @ts-ignore - GitHub API returns language but our type might not have it yet
        const lang = repo.language; 
        if (lang === 'Dart' || lang === 'Kotlin' || lang === 'Swift' || lang === 'Java') {
           repo.appType = 'Mobile';
        } else if (lang === 'Python' || lang === 'Jupyter Notebook') {
           repo.appType = 'AI & ML';
        } else if (lang === 'TypeScript' || lang === 'JavaScript' || lang === 'HTML' || lang === 'CSS' || lang === 'Vue') {
           repo.appType = 'Web';
        } else {
           repo.appType = 'Other';
        }
      }
    });

    // Sort all repos by stars descending
    allRepos.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));

    return allRepos;
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
  const [showContent, setShowContent] = useState(false);

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
    // Use a timeout to sync with the fade-out animation of the landing screen
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  };

  if (loading && !showContent) {
    return <LandingAnimation onComplete={handleAnimationComplete} />;
  }
  
  return (
      <div className="flex flex-col min-h-screen">
        <Header animated={showContent} />
        <main className="flex-1">
          <HeroSection animated={showContent} />
          <div className="container max-w-5xl mx-auto px-4 md:px-6">
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
              <AchievementsSection />
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
        <SocialBars animated={showContent} />
      </div>
  );
}
