import { Children, useState } from "react";
import Loader from "@/components/ui/loader";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProjectDetailsPageContainer = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        .insight-card { transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease; }
        .insight-card:hover { transform: translateY(-5px); box-shadow: 0 24px 48px -12px rgba(0,0,0,0.13); }
      `}</style>

      <div className='min-h-screen bg-background text-foreground overflow-x-hidden'>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default ProjectDetailsPageContainer;
