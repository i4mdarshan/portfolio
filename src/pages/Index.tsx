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

  const iconUrls = [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original-wordmark.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/djangorest/djangorest-original-wordmark.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-plain-wordmark.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original-wordmark.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-line-wordmark.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg"

  ];

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />


        <main>
          <Hero />
          <Experience />
          
          {/* Skills Marquee Banner */}
          <div className="relative z-10 w-full">
            <div className="glass border-y border-border/50 py-4 overflow-hidden">
              <Marquee speed="fast">
                {iconUrls.map((url, index) => (
                  <div
                    key={index}
                    className="mx-6 sm:mx-8 md:mx-10 flex items-center gap-3"
                  >
                    <img src={url} alt="tech icon" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
          
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
