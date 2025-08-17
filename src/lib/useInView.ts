'use client';

import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number | number[];
  root?: Element | Document | null;
  rootMargin?: string;
  once?: boolean;
}

export function useInView<T extends HTMLElement = HTMLElement>(options: UseInViewOptions = {}) {
  const { threshold = 0.1, root = null, rootMargin = '0px', once = true } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip when IntersectionObserver not available
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once && element) {
              observer.unobserve(element);
            }
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, root: (root as Element | null) ?? null, rootMargin }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, once]);

  return { ref, inView } as const;
}
