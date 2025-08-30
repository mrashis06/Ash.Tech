import type { GitHubRepo } from '@/types';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { AboutSection } from '@/components/about-section';
import { SkillsSection } from '@/components/skills-section';
import { ExperienceSection } from '@/components/experience-section';
import { BlogsSection } from '@/components/blogs-section';
import { ContactSection } from '@/components/contact-section';
import { summarizeText } from '@/ai/flows/summarize-text-flow';
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

    // Fetch README and summarize if description is missing
    for (const repo of repos) {
      // Manually set description for SmartSetu
      if (repo.name.toLowerCase() === 'smartsetu') {
        repo.description = 'SmartSetu is a modern web application designed to streamline user onboarding and document verification, leveraging AI and Firebase for a seamless, secure, and user-friendly experience.';
        continue;
      }
      if (!repo.description) {
        try {
          const readmeResponse = await fetch(`https://api.github.com/repos/mrashis06/${repo.name}/readme`);
          if (readmeResponse.ok) {
            const readmeData = await readmeResponse.json();
            const readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf-8');
            repo.description = await summarizeText({ textToSummarize: readmeContent });
          }
        } catch (error)
          console.error(`Error fetching README for ${repo.name}:`, error);
        }
      }
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
