import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  delay?: number;
  startOnMount?: boolean;
}

export const useCountUp = ({ end, duration = 3500, delay = 0, startOnMount = true }: UseCountUpOptions) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const easeOutQuart = (t: number): number => {
    return 1 - Math.pow(1 - t, 4);
  };

  const animate = (timestamp: number) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);
    const currentCount = Math.floor(easedProgress * end);

    if (currentCount !== countRef.current) {
      countRef.current = currentCount;
      setCount(currentCount);
    }

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      setCount(end);
      setIsAnimating(false);
    }
  };

  const start = () => {
    setIsAnimating(true);
    startTimeRef.current = null;
    countRef.current = 0;
    setCount(0);
    
    setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, delay);
  };

  useEffect(() => {
    if (startOnMount) {
      start();
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, startOnMount]);

  return { count, isAnimating, start };
};
