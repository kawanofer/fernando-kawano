import { useInView } from 'react-intersection-observer';

import { usePrefersReducedMotion } from './useAccessibility';

type ScrollAnimationOptions = {
  threshold?: number;
};

export function useScrollAnimation({
  threshold = 0.15,
}: ScrollAnimationOptions = {}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  // When reduced motion is preferred, treat elements as always visible
  // so no transform/opacity transitions are applied
  return { ref, inView: prefersReducedMotion ? true : inView };
}
