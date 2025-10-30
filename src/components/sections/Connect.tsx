import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import VideoStory from "@/components/ui/video-story";

const Connect = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/i4mdarshan",
      gradient: "from-slate-500/20 to-slate-500/5",
      description: "Check out my code",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/darshan-mahajan/",
      gradient: "from-steel-500/20 to-steel-500/5",
      description: "Let's connect professionally",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:m.darshan.tech@gmail.com",
      gradient: "from-mist-500/20 to-mist-500/5",
      description: "Send me a message",
    },
  ];

  return (
    <section
      id='connect'
      className='py-24 md:py-32 relative overflow-hidden'
      ref={ref}
    >
      {/* Animated background */}
      <motion.div
        style={{ y: backgroundY }}
        className='absolute inset-0 opacity-30'
      >
        <motion.div
          className='absolute top-0 left-0 w-full h-full bg-gradient-rainbow'
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />
      </motion.div>

      <div className='container mx-auto px-6 relative'>
        {/* Video Story - Center top */}
        <div className='flex justify-center mb-12'>
          <VideoStory
            videoUrl='/videos/connect.mp4'
            sectionId='connect'
            position='center'
            className='w-[90%] sm:w-[400px] lg:w-[450px]'
          />
        </div>
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className='text-center max-w-4xl mx-auto'
        >
          {/* Main heading */}
          <div className='flex items-center justify-center gap-3 mb-6'>
            <MessageCircle className='w-6 h-6 md:w-8 md:h-8 text-foreground' />
            <h2 className='font-display text-4xl md:text-6xl lg:text-7xl font-bold'>
              Let's connect
            </h2>
          </div>
          <p className='text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6'>
            and create{" "}
            <span className='bg-gradient-rainbow bg-clip-text text-transparent'>
              something extraordinary
            </span>
          </p>

          <p className='text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto'>
            Whether you have a project in mind, want to collaborate, or just
            want to chat about tech and creativity—I'd love to hear from you.
          </p>

          {/* Social links */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
            {socialLinks.map((link, index) => {
              const progressFactor = 1;
              const linkY = useTransform(
                scrollYProgress,
                [0.2 + progressFactor * 0.1, 0.5 + progressFactor * 0.1],
                [30, 0]
              );
              const linkOpacity = useTransform(
                scrollYProgress,
                [0.2 + progressFactor * 0.1, 0.4 + progressFactor * 0.1],
                [0, 1]
              );

              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ y: linkY, opacity: linkOpacity }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className='relative p-6 rounded-2xl glass group'
                >
                  <div className='absolute inset-0 rounded-2xl bg-gradient-rainbow opacity-0 group-hover:opacity-10 transition-opacity duration-200' />

                  <div className='relative flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-xl bg-gradient-rainbow flex items-center justify-center group-hover:shadow-glow transition-all duration-200'>
                      <link.icon className='w-6 h-6 text-white' />
                    </div>
                    <div className='flex-1 text-left'>
                      <h3 className='font-display text-lg font-semibold mb-1'>
                        {link.name}
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        {link.description}
                      </p>
                    </div>
                    <ArrowRight className='w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300' />
                  </div>
                </motion.a>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <a
              href='mailto:m.darshan.tech@gmail.com'
              className='inline-flex items-center gap-3 px-10 py-4 bg-gradient-rainbow text-white font-display font-semibold rounded-full hover:shadow-glow transition-all duration-200 hover:scale-105 text-lg'
            >
              Start a Conversation
              <ArrowRight className='w-5 h-5' />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className='mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full glass'
          >
            <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
            <span className='text-sm text-muted-foreground'>
              Available for Summer 2026 Internships
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Connect;
