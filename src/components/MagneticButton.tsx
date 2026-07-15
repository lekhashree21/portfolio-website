import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick,
  href,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * strength, y: y * strength });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  const motionProps = {
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    animate: { x: pos.x, y: pos.y },
    transition: { type: 'spring' as const, stiffness: 200, damping: 15 },
    className,
    ref: ref as never,
  };

  if (href) {
    return (
      <motion.a href={href} onClick={onClick} {...motionProps}>
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  );
}
