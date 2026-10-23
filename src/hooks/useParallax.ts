import { useEffect, useRef, useState } from 'react';

/**
 * Hook for subtle, performant parallax scroll effect on an element.
 * Uses IntersectionObserver to strictly throttle work only when the element is visible in viewport,
 * requestAnimationFrame to avoid layout thrashing, and respects prefers-reduced-motion.
 */
export function useElementParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.08,
  maxOffset: number = 24
) {
  const ref = useRef<T | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setOffset(0);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setOffset(0);
      return;
    }

    const element = ref.current;
    if (!element) return;

    let isVisible = false;
    let ticking = false;

    const updateParallax = () => {
      if (!element || !isVisible) {
        ticking = false;
        return;
      }

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;

      // Relative delta from center of screen: negative when scrolled down past center
      const delta = (elementCenter - viewportCenter) * speed;
      const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, delta));

      setOffset(Math.round(clampedOffset * 10) / 10);
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!ticking && isVisible) {
        ticking = true;
        window.requestAnimationFrame(updateParallax);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            updateParallax();
          }
        });
      },
      {
        rootMargin: '100px 0px 100px 0px',
        threshold: 0
      }
    );

    observer.observe(element);
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // Initial calculation
    updateParallax();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [speed, maxOffset, prefersReducedMotion]);

  return { ref, offset, prefersReducedMotion };
}

/**
 * Hook for Hero Banner Parallax scrolling effect.
 * Translates hero background image at a fraction of scroll velocity as user navigates down.
 */
export function useHeroParallax<T extends HTMLElement = HTMLElement>(
  speed: number = 0.25,
  maxOffset: number = 140
) {
  const ref = useRef<T | null>(null);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setOffsetY(0);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setOffsetY(0);
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          // Only calculate if hero is visible or near top
          const heroHeight = ref.current?.offsetHeight || 750;
          if (scrollY <= heroHeight + 100) {
            const rawOffset = scrollY * speed;
            const clamped = Math.min(rawOffset, maxOffset);
            setOffsetY(Math.round(clamped * 10) / 10);
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, maxOffset, prefersReducedMotion]);

  return { ref, offsetY, prefersReducedMotion };
}
