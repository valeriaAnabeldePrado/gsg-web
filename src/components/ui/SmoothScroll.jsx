'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Lenis from 'lenis';

export default function SmoothScroll() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    
    setLenis(lenisInstance);

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      // Immediate scroll to top on navigation to mimic native browser behavior
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, searchParams, lenis]);

  return null;
}
