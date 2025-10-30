import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VideoContextType {
  activeVideoId: string | null;
  setActiveVideo: (id: string) => void;
  clearActiveVideo: () => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const setActiveVideo = (id: string) => {
    setActiveVideoId(id);
  };

  const clearActiveVideo = () => {
    setActiveVideoId(null);
  };

  return (
    <VideoContext.Provider value={{ activeVideoId, setActiveVideo, clearActiveVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideoContext must be used within a VideoProvider');
  }
  return context;
};