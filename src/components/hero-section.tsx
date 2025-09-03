
export function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center">
      <div className="container px-4 md:px-6 text-center">
        <div className="space-y-4">
          <p className="text-lg font-code text-primary">
            Hi, my name is
          </p>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Ashis Kumar Rai
          </h1>
          <p className="max-w-[700px] mx-auto text-primary text-xl md:text-2xl font-semibold">
            AI/ML & MLOps Enthusiast | Full Stack Developer | DevOps Practitioner
          </p>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            Passionate about creating smart solutions, automating workflows, and deploying AI-driven applications efficiently
          </p>
        </div>
      </div>
    </section>
  );
}
