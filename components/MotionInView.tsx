"use client";
import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

type AsTag = "div" | "section" | "article" | "header" | "ul" | "li" | "span";

type Props = Omit<HTMLMotionProps<"div">, "initial" | "animate" | "variants" | "transition" | "whileInView" | "viewport"> & {
  children: ReactNode;
  /** stagger step in seconds; matches reference site's data-delay (0.15s per step) */
  delay?: number;
  /** override portion of element that needs to be in view (0–1) */
  amount?: number;
  /** override duration in seconds (default 0.8 — matches reference) */
  duration?: number;
  /** if true the animation re-runs each time it enters the viewport */
  replay?: boolean;
  as?: AsTag;
};

export default function MotionInView({
  children,
  delay = 0,
  amount = 0.2,
  duration = 0.8,
  replay = false,
  as = "div",
  className,
  ...rest
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = (motion as any)[as];

  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !replay, amount }}
      transition={{ duration, ease: [0.4, 0, 0.2, 1], delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
