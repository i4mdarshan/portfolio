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
// const photographyGallery = [
//   {
//     id: 1,
//     src: `${import.meta.env.BASE_URL}/photos/IMG_6832.jpeg`,
//     alt: "Landscape photography",
//     aspectRatio: "7/5",
//   },
//   {
//     id: 2,
//     src: `${import.meta.env.BASE_URL}/photos/IMG_6832.jpeg`,
//     alt: "Portrait photography",
//     aspectRatio: "7/5",
//   },
//   {
//     id: 3,
//     src: `${import.meta.env.BASE_URL}/photos/IMG_6832.jpeg`,
//     alt: "Street photography",
//     aspectRatio: "7/5",
//   },
//   {
//     id: 4,
//     src: `${import.meta.env.BASE_URL}/photos/IMG_6832.jpeg`,
//     alt: "Nature photography",
//     aspectRatio: "7/5",
//   },
//   {
//     id: 5,
//     src: `${import.meta.env.BASE_URL}/photos/IMG_6832.jpeg`,
//     alt: "Urban photography",
//     aspectRatio: "7/5",
//   },
//   {
//     id: 6,
//     src: `${import.meta.env.BASE_URL}/photos/IMG_6832.jpeg`,
//     alt: "Abstract photography",
//     aspectRatio: "7/5",
//   },
// ];

const photographyGallery = [];

const START_NUMBER = 3000;
const END_NUMBER = 3033;

for (let i = START_NUMBER; i <= END_NUMBER; i++) {
  // Use a sequential ID starting from 1
  const sequentialId = i - START_NUMBER + 1;

  photographyGallery.push({
    id: sequentialId,
    // Construct the full path using the current image number
    src: `${import.meta.env.BASE_URL}/photos/IMG_${i}.jpg`,
    // Create a descriptive alt text
    alt: `Gallery photo IMG_${i}`,
    // Maintain the original aspect ratio
    aspectRatio: "7/5",
  });
}

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
      {/* Parallax background elements */}

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
          {/* <div className='flex items-center gap-3 mb-8'>
            <div className='w-12 h-12 rounded-xl glass flex items-center justify-center'>
              <Camera className='w-6 h-6 text-foreground' />
            </div>
            <h3 className='font-display text-3xl font-semibold text-foreground'>
              Photography
            </h3>
          </div> */}
          {/* Carousel Container */}
          <div className='relative w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-0 px-0'>
            {/* <div className="relative h-[280px] sm:h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden">
              {photographyGallery.map((item, index) => {
                const totalItems = photographyGallery.length;
                const position = (index - photoIndex + totalItems) % totalItems;
                const normalizedPosition = position > totalItems / 2 ? position - totalItems : position;
                const isFocused = normalizedPosition === 0;
                const distance = Math.abs(normalizedPosition);
                
                return (
                  <motion.div
                    key={item.id}
                    onClick={() => setPhotoIndex(index)}
                    initial={false}
                    animate={{
                      scale: isFocused ? 1 : 0.65,
                      opacity: isFocused ? 1 : 0.4,
                      filter: isFocused ? "blur(0px)" : "blur(6px)",
                      x: `${normalizedPosition * 180}px`,
                      zIndex: isFocused ? 10 : 5 - distance,
                    }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="absolute w-full h-1200 sm:w-full sm:h-64 md:w-full md:h-1200 rounded-2xl glass overflow-hidden cursor-pointer group"
                  >
                    <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-all duration-400" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img className="group-hover:scale-110 group-hover:text-foreground/60 transition-all duration-400" src={item.src} height={1000} width={1200} alt={item.alt} />
                    </div>
                  </motion.div>
                );
              })}
            </div> */}

            {/* Navigation Buttons - Bottom Centered */}
            {/* <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setPhotoIndex((prev) => prev - 1)}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center hover:scale-110 hover:shadow-[var(--mesh-shadow)] transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={() => setPhotoIndex((prev) => prev + 1)}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center hover:scale-110 hover:shadow-[var(--mesh-shadow)] transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div> */}

            {/* Indicators */}
            {/* <div className="flex justify-center gap-2 mt-4">
              {photographyGallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPhotoIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === photoIndex ? 'bg-foreground w-8' : 'bg-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div> */}
            <div
              className='md:-ml-14'
              style={{
                width: "100vw",
                height: "100vh",
                background: "var(--background)",
              }}
            >
              <DomeGallery images={photographyGallery} grayscale={false} />{" "}
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
