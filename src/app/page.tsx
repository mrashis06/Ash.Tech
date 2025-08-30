import type { GitHubRepo } from '@/types';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { AboutSection } from '@/components/about-section';
import { SkillsSection } from '@/components/skills-section';
import { ExperienceSection } from '@/components/experience-section';
import { BlogsSection } from '@/components/blogs-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch('https://api.github.com/users/mrashis06/repos?type=public&sort=stars&direction=desc', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!response.ok) {
      console.error('Failed to fetch GitHub repos:', response.statusText);
      return [];
    }
    const data: GitHubRepo[] = await response.json();
    const repos = data.slice(0, 6);

    // Manually set description for SmartSetu
    const smartSetuRepo = repos.find(repo => repo.name.toLowerCase() === 'smartsetu');
    if (smartSetuRepo) {
      smartSetuRepo.description = 'SmartSetu is a modern web application designed to streamline user onboarding and document verification, leveraging AI and Firebase for a seamless, secure, and user-friendly experience.';
    }

    // Manually set description for rag
    const ragRepo = repos.find(repo => repo.name.toLowerCase() === 'rag');
    if (ragRepo) {
      ragRepo.description = 'Implemented a RAG system combining retrieval-based and generative models to enhance response generation.';
    }

    // Manually set description for OFFLINE_FILE_TRANSFER
    const offlineFileTransferRepo = repos.find(repo => repo.name.toLowerCase() === 'offline_file_transfer');
    if (offlineFileTransferRepo) {
      offlineFileTransferRepo.description = 'Developed a system enabling file transfers without an active internet connection';
    }

    // Manually set description for musox
    const musoxRepo = repos.find(repo => repo.name.toLowerCase() === 'musox');
    if (musoxRepo) {
      musoxRepo.description = 'Musox – A Python-based web app that uses the Spotify API to fetch song details, find matching audio on YouTube, and stream it seamlessly.';
    }
    
    return repos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export default async function Home() {
  const repos = await getGitHubRepos();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection repos={repos} />
        <BlogsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
