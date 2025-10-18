import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Certificates from "@/components/sections/Certificates";
import Hobbies from "@/components/sections/Hobbies";
import Connect from "@/components/sections/Connect";
import Loader from "@/components/ui/loader";
import Marquee from "@/components/ui/marquee";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const skills = [
    "React",
    "TypeScript",
    "Python",
    "AWS",
    "Docker",
    "Node.js",
    "Machine Learning",
    "Cloud Architecture",
    "UI/UX Design",
    "Data Science",
  ];

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />

        {/* Top Marquee Banner */}
        <div className="fixed top-0 left-0 right-0 z-30 pt-20 md:pt-24 pointer-events-none">
          <div className="glass border-y border-border/50 py-3 overflow-hidden">
            <Marquee speed="fast">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="mx-6 text-sm md:text-base font-medium text-muted-foreground whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
            </Marquee>
          </div>
        </div>

        <main>
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <Certificates />
          <Hobbies />
          <Connect />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
