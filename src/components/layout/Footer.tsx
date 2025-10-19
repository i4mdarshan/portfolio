import { motion } from "framer-motion";
import Marquee from "@/components/ui/marquee";

const Footer = () => {
  const taglines = [
    "Developer by trade, creator at heart",
    "Blending logic and art",
    "Building digital experiences",
    "Code meets creativity",
  ];

  return (
    <footer className="relative border-t border-border overflow-hidden">
      {/* Big CTA with Marquee */}
      <div className="py-20 md:py-32 overflow-hidden">
        <Marquee speed="slow" className="mb-8">
          {taglines.map((text, index) => (
            <span
              key={index}
              className="mx-8 font-display text-4xl md:text-6xl lg:text-8xl font-bold text-foreground whitespace-nowrap"
            >
              {text}
            </span>
          ))}
        </Marquee>
        
        <Marquee reverse speed="slow">
          {taglines.map((text, index) => (
            <span
              key={index}
              className="mx-8 font-display text-4xl md:text-6xl lg:text-8xl font-bold text-muted-foreground/30 whitespace-nowrap"
            >
              {text}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto px-6 py-8 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            © {new Date().getFullYear()} Darshan Mahajan. Built with ❤️ and code.
          </motion.p>
          
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Terms
            </a>
            <a
              href="#connect"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
