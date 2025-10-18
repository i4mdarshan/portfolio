import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const navWidth = useTransform(scrollYProgress, [0, 0.1], ["95%", "70%"]);
  const navPadding = useTransform(scrollYProgress, [0, 0.1], ["1rem", "0.75rem"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Certificates", href: "#certificates" },
    { name: "Connect", href: "#connect" },
  ];

  const handleDownloadResume = () => {
    // Replace with actual resume URL
    const resumeUrl = "/resume.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Darshan_Mahajan_Resume.pdf";
    link.click();
  };

  return (
    <>
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-rainbow origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Pill Navbar */}
      <div className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-4 px-4">
        <motion.nav
          className="glass rounded-full max-w-7xl w-full"
          style={{ 
            width: navWidth,
            padding: navPadding,
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between px-4 md:px-6">
            <a href="#" className="font-display text-lg md:text-xl font-bold bg-gradient-rainbow bg-clip-text text-transparent">
              DM
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-rainbow group-hover:w-full transition-all duration-200" />
                </a>
              ))}
              
              {/* Resume Download Button */}
              <motion.button
                onClick={handleDownloadResume}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-4 py-2 rounded-full glass hover:shadow-glow transition-all duration-200 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-rainbow opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
                <div className="relative flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Resume</span>
                </div>
              </motion.button>
            </div>

            {/* Mobile Menu Button - Unique Design */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center glass rounded-full"
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 bg-foreground rounded-full origin-center"
                  animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-foreground rounded-full"
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-foreground rounded-full origin-center"
                  animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu - Full Screen Glass Effect */}
      <motion.div
        className="fixed inset-0 z-30 md:hidden glass"
        initial={{ opacity: 0, y: "-100%" }}
        animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ pointerEvents: isMobileMenuOpen ? "auto" : "none" }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-display font-bold text-foreground hover:bg-gradient-rainbow hover:bg-clip-text hover:text-transparent transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              {item.name}
            </motion.a>
          ))}
          <motion.button
            onClick={() => {
              handleDownloadResume();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 text-xl font-medium glass px-8 py-4 rounded-full hover:shadow-glow transition-all duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            Download Resume
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
