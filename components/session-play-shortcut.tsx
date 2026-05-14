"use client";

type SessionPlayShortcutProps = {
  targetId: string;
  className?: string;
};

export function SessionPlayShortcut({
  targetId,
  className,
}: SessionPlayShortcutProps) {
  const handleClick = () => {
    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      return;
    }

    const targetTop = targetElement.getBoundingClientRect().top + window.scrollY - 24;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      aria-controls={targetId}
      aria-label="Scroll to session audio"
    >
      Play Session
    </button>
  );
}