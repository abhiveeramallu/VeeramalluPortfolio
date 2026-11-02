import { useState, useEffect, useRef } from 'react';

export function useInView(options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: '200px',
        threshold: 0.05,
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}
