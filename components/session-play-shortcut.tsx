"use client";

import { useEffect, useState } from "react";

type SessionPlayShortcutProps = {
  audioId: string;
  className?: string;
};

export function SessionPlayShortcut({
  audioId,
  className,
}: SessionPlayShortcutProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = document.getElementById(audioId);

    if (!(audioElement instanceof HTMLAudioElement)) {
      return;
    }

    const syncPlaybackState = () => {
      setIsPlaying(!audioElement.paused && !audioElement.ended);
    };

    syncPlaybackState();
    audioElement.addEventListener("play", syncPlaybackState);
    audioElement.addEventListener("pause", syncPlaybackState);
    audioElement.addEventListener("ended", syncPlaybackState);

    return () => {
      audioElement.removeEventListener("play", syncPlaybackState);
      audioElement.removeEventListener("pause", syncPlaybackState);
      audioElement.removeEventListener("ended", syncPlaybackState);
    };
  }, [audioId]);

  const handleClick = async () => {
    const audioElement = document.getElementById(audioId);

    if (!(audioElement instanceof HTMLAudioElement)) {
      return;
    }

    if (audioElement.paused || audioElement.ended) {
      try {
        await audioElement.play();
      } catch {
        setIsPlaying(false);
      }

      return;
    }

    audioElement.pause();
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      aria-controls={audioId}
      aria-label={isPlaying ? "Pause session audio" : "Play session audio"}
    >
      {isPlaying ? "Pause Session" : "Play Session"}
    </button>
  );
}