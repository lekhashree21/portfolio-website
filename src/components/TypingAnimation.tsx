import { useEffect, useState } from 'react';

export default function TypingAnimation({
  words,
  className = '',
  speed = 100,
  pause = 1500,
}: {
  words: string[];
  className?: string;
  speed?: number;
  pause?: number;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? current.slice(0, prev.length - 1)
              : current.slice(0, prev.length + 1)
          );
        },
        deleting ? speed / 2 : speed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, speed, pause]);

  return (
    <span className={className}>
      {text}
      <span className="inline-block w-0.5 h-[1em] ml-1 bg-brand-500 animate-pulse align-middle" />
    </span>
  );
}
