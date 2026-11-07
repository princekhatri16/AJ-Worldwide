import type { Variants, Transition } from "framer-motion";

export const standardEase = [0.25, 1, 0.5, 1] as const;

export const defaultTransition: Transition = {
  duration: 0.5,
  ease: standardEase,
};

// Section / Element scroll reveal (fade up 16px to 0)
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

// Quick fade
export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Stagger container
export const staggerContainerVariant = (staggerDelay = 0.07): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.05,
    },
  },
});

// Card reveal in a staggered grid
export const cardStaggerItemVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: standardEase },
  },
};

// Section Rule draw from left
export const ruleDrawVariant: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    originX: 0,
    transition: { duration: 0.5, ease: standardEase, delay: 0.15 },
  },
};

// Inner Page Banner Sequence Variants
export const bannerBreadcrumbVariant: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const bannerHeadingVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: standardEase, delay: 0.1 },
  },
};

export const bannerRuleVariant: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    originX: 0,
    transition: { duration: 0.5, ease: standardEase, delay: 0.25 },
  },
};

// Hero Staggered Entrance Variants
export const heroItemVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: standardEase },
  },
};

export const heroRuleVariant: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    originX: 0,
    transition: { duration: 0.6, ease: standardEase, delay: 0.2 },
  },
};

// Image area scale / soft clip reveal
export const imageRevealVariant: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: standardEase },
  },
};

