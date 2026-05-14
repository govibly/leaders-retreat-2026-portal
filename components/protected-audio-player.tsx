"use client";

import { useEffect, useRef } from "react";

type ProtectedAudioPlayerProps = {
  src: string;
  className?: string;
  id?: string;
};

export function ProtectedAudioPlayer({
  src,
  className,
  id,
}: ProtectedAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (!audioElement) {
      return;
    }

    audioElement.setAttribute("controlsList", "nodownload noremoteplayback");
    audioElement.setAttribute("disableRemotePlayback", "true");
  }, []);

  return (
    <audio
      id={id}
      ref={audioRef}
      controls
      onContextMenu={(event) => event.preventDefault()}
      preload="metadata"
      className={className}
    >
      <source src={src} type="audio/mpeg" />
      Your browser does not support MP3 playback.
    </audio>
  );
}