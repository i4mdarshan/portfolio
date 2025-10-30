import { useEffect, useRef, useState } from "react";
import { useVideoContext } from "@/contexts/VideoContext";

interface UseVideoStoryProps {
  sectionId: string;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const useVideoStory = ({ sectionId, videoRef }: UseVideoStoryProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeVideoId, setActiveVideo, clearActiveVideo } = useVideoContext();

  // Handle play/pause based on active video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (activeVideoId === sectionId && !isPlaying) {
      video.play().catch(() => {
        // Autoplay might be blocked
        setIsPlaying(false);
      });
      setIsPlaying(true);
    } else if (activeVideoId !== sectionId && isPlaying) {
      video.pause();
      setIsPlaying(false);
    }
  }, [activeVideoId, sectionId, isPlaying, videoRef]);

  // Intersection Observer for auto-play
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveVideo(sectionId);
          } else if (!entry.isIntersecting && activeVideoId === sectionId) {
            clearActiveVideo();
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px" }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [sectionId, activeVideoId, setActiveVideo, clearActiveVideo]);

  // Track video progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [videoRef]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      clearActiveVideo();
    } else {
      setActiveVideo(sectionId);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return {
    isPlaying,
    isMuted,
    progress,
    isLoading,
    containerRef,
    togglePlay,
    toggleMute,
  };
};
