import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Camera, Palette, Music, Sparkles } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

// Sample gallery images - replace with actual paths
const photographyGallery = [
  { id: 1, alt: "Landscape photography" },
  { id: 2, alt: "Portrait photography" },
  { id: 3, alt: "Street photography" },
  { id: 4, alt: "Nature photography" },
  { id: 5, alt: "Urban photography" },
  { id: 6, alt: "Abstract photography" },
];

const digitalArtGallery = [
  { id: 1, alt: "Digital illustration 1" },
  { id: 2, alt: "Digital illustration 2" },
  { id: 3, alt: "Digital illustration 3" },
  { id: 4, alt: "Digital illustration 4" },
  { id: 5, alt: "Digital illustration 5" },
  { id: 6, alt: "Digital illustration 6" },
];

const hobbies = [
  {
    title: "Music Production",
    description: "Composing ambient soundscapes that inspire focus and creativity",
    icon: Music,
    quote: "Code in silence, create in sound",
  },
];

const Hobbies = () => {
  const ref = useRef(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section id="hobbies" className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Parallax background elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-subtle rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-subtle rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-6 relative">
        <SectionHeader 
          icon={Sparkles}
          title="Creative Pursuits"
          subtitle="How creativity shapes my approach to problem-solving"
        />

        {/* Photography Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-rainbow flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-display text-3xl font-semibold bg-gradient-rainbow bg-clip-text text-transparent bg-[length:200%_200%] animate-text-shimmer">
              Photography
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photographyGallery.map((item, index) => {
              const itemRef = useRef(null);
              const { scrollYProgress } = useScroll({
                target: itemRef,
                offset: ["start end", "end start"],
              });
              const itemOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

              return (
                <motion.div
                  key={item.id}
                  ref={itemRef}
                  style={{ opacity: itemOpacity }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  onHoverStart={() => setHoveredImage(item.id)}
                  onHoverEnd={() => setHoveredImage(null)}
                  className="relative aspect-square rounded-2xl glass overflow-hidden cursor-pointer group"
                >
                  <div className="absolute inset-0 bg-gradient-rainbow opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-white/40 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>
          <p className="text-muted-foreground mt-6 text-center italic">
            "Every picture tells a story"
          </p>
        </motion.div>

        {/* Digital Art Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-rainbow flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-display text-3xl font-semibold bg-gradient-rainbow bg-clip-text text-transparent bg-[length:200%_200%] animate-text-shimmer">
              Digital Art
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {digitalArtGallery.map((item, index) => {
              const itemRef = useRef(null);
              const { scrollYProgress } = useScroll({
                target: itemRef,
                offset: ["start end", "end start"],
              });
              const itemOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

              return (
                <motion.div
                  key={item.id}
                  ref={itemRef}
                  style={{ opacity: itemOpacity }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  onHoverStart={() => setHoveredImage(item.id + 100)}
                  onHoverEnd={() => setHoveredImage(null)}
                  className="relative aspect-square rounded-2xl glass overflow-hidden cursor-pointer group"
                >
                  <div className="absolute inset-0 bg-gradient-rainbow opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Palette className="w-12 h-12 text-white/40 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>
          <p className="text-muted-foreground mt-6 text-center italic">
            "Art is problem-solving with pixels"
          </p>
        </motion.div>

        {/* Music Production Card */}
        <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto">
          {hobbies.map((hobby, index) => {
            return (
              <motion.div
                key={hobby.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative group"
              >
                <div className="relative p-8 rounded-2xl glass overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-rainbow opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-rainbow flex items-center justify-center mb-6 group-hover:shadow-glow transition-all duration-300">
                      <hobby.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="font-display text-2xl font-semibold mb-3">
                      {hobby.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {hobby.description}
                    </p>

                    <div className="pt-4 border-t border-border">
                      <p className="text-sm italic text-muted-foreground">
                        "{hobby.quote}"
                      </p>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-rainbow opacity-5 rounded-bl-full" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Philosophy section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <div className="p-8 md:p-12 rounded-3xl glass">
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              <span className="text-foreground font-medium">
                "Creativity isn't separate from logic—
              </span>{" "}
              it's what happens when you let curiosity guide your problem-solving.
              Every photograph, every piece of art, every melody teaches me to see
              patterns differently, to approach code as a craft, and to build
              solutions that are both{" "}
              <span className="bg-gradient-rainbow bg-clip-text text-transparent font-medium">
                functional and beautiful
              </span>
              ."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hobbies;
