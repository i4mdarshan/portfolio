import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import VideoStory from "@/components/ui/video-story";

const Hero = () => {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden pt-0 mt-0'>
      {/* Subtle glass background */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-background' />
      </div>

      {/* Content */}
      <div className='relative z-10 container mx-auto xs:px-6 sm:px-6 xs:pt-0 sm:pt-0 md:px-14 md:mt-12'>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12'>
          {/* Text content */}
          <motion.div
            className='flex-1 gap-4 text-center lg:text-left'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <motion.h1
              className='font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-foreground'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            >
              Darshan Mahajan
            </motion.h1>

            <motion.p
              className='text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 max-w-3xl lg:mx-0 mx-auto font-light'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              Developer by trade, creator at heart—
              <br />
              <span className='text-foreground font-medium'>
                blending logic and art.
              </span>
            </motion.p>

            <motion.div
              className='flex gap-4 justify-center lg:justify-start items-center'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.a
                href='#projects'
                className='px-8 py-3 glass text-foreground rounded-full font-medium hover:shadow-card hover:bg-white/10 transition-all duration-300 ease-out'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                View Work
              </motion.a>
              <motion.a
                href='#connect'
                className='px-8 py-3 glass text-foreground rounded-full font-medium hover:shadow-card hover:bg-white/10 transition-all duration-300 ease-out'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Let's Connect
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Video Story - Right side on desktop, below on mobile */}
          <div className='flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-end'>
            <VideoStory
              videoUrl='/videos/hero-intro.mp4'
              sectionId='hero'
              position='right'
              className='w-[90%] sm:w-[400px] lg:w-[350px]'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
