import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useVideoStory } from "@/hooks/use-video-story";
import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";

interface VideoStoryProps {
  videoUrl: string;
  sectionId: string;
  position?: "left" | "right" | "center";
  aspectRatio?: "9:16" | "7:5";
  className?: string;
}

const VideoStory = ({
  videoUrl,
  sectionId,
  position = "right",
  aspectRatio = "9:16",
  className,
}: VideoStoryProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    isPlaying,
    isMuted,
    progress,
    isLoading,
    containerRef,
    togglePlay,
    toggleMute,
  } = useVideoStory({ sectionId, videoRef });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className={cn(
        "relative group",
        aspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-[7/5]",
        "w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px]",
        "max-h-[70vh] md:max-h-[80vh]",
        className
      )}
    >
      {/* Loading skeleton */}
      {isLoading && <Skeleton className='absolute inset-0 rounded-2xl' />}

      {/* Video container with glass effect */}
      <div
        className='relative w-full h-full glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-card'
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          className='w-full h-full object-cover'
          playsInline
          loop
          muted={isMuted}
          preload='metadata'
        />

        {/* Play/Pause overlay */}
        <AnimatePresence>
          {(!isPlaying || !isLoading) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className='absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm'
            >
              <div className='w-16 h-16 md:w-20 md:h-20 glass rounded-full flex items-center justify-center'>
                {isPlaying ? (
                  <Pause className='w-8 h-8 md:w-10 md:h-10 text-foreground' />
                ) : (
                  <Play className='w-8 h-8 md:w-10 md:h-10 text-foreground ml-1' />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mute/Unmute button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className={cn(
            "absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center",
            "transition-all duration-300 hover:scale-110",
            isMuted && isPlaying && "animate-pulse"
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className='w-5 h-5 text-foreground' />
          ) : (
            <Volume2 className='w-5 h-5 text-foreground' />
          )}
        </motion.button>

        {/* Progress bar */}
        <div className='absolute bottom-0 left-0 right-0 h-1 bg-white/10'>
          <motion.div
            className='h-full bg-gradient-to-r from-primary to-primary-glow'
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Sound wave indicator when playing with sound */}
        <AnimatePresence>
          {isPlaying && !isMuted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute bottom-4 left-4 flex gap-1'
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className='w-1 bg-primary rounded-full'
                  animate={{
                    height: ["8px", "16px", "8px"],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VideoStory;
