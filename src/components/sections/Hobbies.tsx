import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Camera,
  Palette,
  Music,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Image,
} from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import DomeGallery from "./DomeGallery";

// Sample gallery images - replace with actual paths
const photographyGallery = [
  {
    id: 1,
    src: "/photos/IMG_6832.jpeg",
    alt: "Landscape photography",
    aspectRatio: "7/5",
  },
  {
    id: 2,
    src: "/photos/IMG_6832.jpeg",
    alt: "Portrait photography",
    aspectRatio: "7/5",
  },
  {
    id: 3,
    src: "/photos/IMG_6832.jpeg",
    alt: "Street photography",
    aspectRatio: "7/5",
  },
  {
    id: 4,
    src: "/photos/IMG_6832.jpeg",
    alt: "Nature photography",
    aspectRatio: "7/5",
  },
  {
    id: 5,
    src: "/photos/IMG_6832.jpeg",
    alt: "Urban photography",
    aspectRatio: "7/5",
  },
  {
    id: 6,
    src: "/photos/IMG_6832.jpeg",
    alt: "Abstract photography",
    aspectRatio: "7/5",
  },
];

const digitalArtGallery = [
  {
    id: 1,
    src: "/photos/IMG_6832.jpeg",
    alt: "Digital illustration 1",
    aspectRatio: "7/5",
  },
  {
    id: 2,
    src: "/photos/IMG_6832.jpeg",
    alt: "Digital illustration 2",
    aspectRatio: "4/5",
  },
  {
    id: 3,
    src: "/photos/IMG_6832.jpeg",
    alt: "Digital illustration 3",
    aspectRatio: "7/5",
  },
  {
    id: 4,
    src: "/photos/IMG_6832.jpeg",
    alt: "Digital illustration 4",
    aspectRatio: "4/5",
  },
  {
    id: 5,
    src: "/photos/IMG_6832.jpeg",
    alt: "Digital illustration 5",
    aspectRatio: "7/5",
  },
  {
    id: 6,
    src: "/photos/IMG_6832.jpeg",
    alt: "Digital illustration 6",
    aspectRatio: "4/5",
  },
];

const hobbies = [
  {
    title: "Music Production",
    description:
      "Composing ambient soundscapes that inspire focus and creativity",
    icon: Music,
    quote: "Code in silence, create in sound",
  },
];

const Hobbies = () => {
  const ref = useRef(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [artIndex, setArtIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      id='hobbies'
      className='py-24 md:py-32 relative overflow-hidden'
      ref={ref}
    >
      <div className='container mx-auto px-6 relative'>
        <SectionHeader
          icon={Sparkles}
          title='My Creative Pursuits'
          subtitle='How creativity shapes my approach to problem-solving'
        />

        {/* Photography Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className='mb-16'
        >
          {/* Carousel Container */}
          <div className='relative w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-0 px-0'>
            <div
              className='md:-ml-14'
              style={{
                width: "100vw",
                height: "100vh",
                background: "var(--background)",
              }}
            >
              <DomeGallery grayscale={false} />{" "}
            </div>
          </div>
          <p className='text-muted-foreground mt-6 text-center italic'>
            "Every picture tells a story"
          </p>
        </motion.div>

        {/* Philosophy section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className='mt-20 max-w-3xl mx-auto text-center'
        >
          <div className='p-8 md:p-12 rounded-3xl glass'>
            <p className='text-lg md:text-xl leading-relaxed text-muted-foreground'>
              <span className='text-foreground font-medium'>
                "Creativity isn't separate from logic -
              </span>{" "}
              it's what happens when you let curiosity guide your
              problem-solving. Every photograph, every piece of art, every
              melody teaches me to see patterns differently, to approach code as
              a craft, and to build solutions that are both{" "}
              <span className='text-foreground font-medium'>
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
