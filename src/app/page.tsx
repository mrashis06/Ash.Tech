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
    const data = await response.json();
    return data.slice(0, 6);
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
