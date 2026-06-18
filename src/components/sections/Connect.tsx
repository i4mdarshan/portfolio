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
import NavIconCard from "../NavIconCard";

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
      // pass the component reference instead of a JSX element
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
              return (
                <NavIconCard
                  key={link.name}
                  // NavIconCard expects a component type; pass it through
                  navCardIcon={link.icon}
                  navCardLinkURL={link.url}
                  navCardLinkLabel={link.name}
                  navCardDescription={link.description}
                />
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
              Available for Fall 2026 Internships
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Connect;
