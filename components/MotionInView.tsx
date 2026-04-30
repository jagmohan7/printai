"use client";
import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import { ReactNode, useMemo } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

function buildVariants(from: Direction, distance: number): Variants {
  const offsets: Record<Direction, { x: number; y: number }> = {
    up:    { x: 0,         y: distance  },
    down:  { x: 0,         y: -distance },
    left:  { x: distance,  y: 0         },
    right: { x: -distance, y: 0         },
    none:  { x: 0,         y: 0         },
  };
  const o = offsets[from];
  return {
    hidden:  { opacity: 0, x: o.x, y: o.y },
    visible: { opacity: 1, x: 0,   y: 0   },
  };
}

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
  /**
   * Direction the element travels FROM as it animates in.
   * - "up"    (default) — element starts below and rises
   * - "down"  — element starts above and falls
   * - "left"  — element starts on the right and slides left
   * - "right" — element starts on the left and slides right
   * - "none"  — pure fade with no translation
   */
  from?: Direction;
  /** translation distance in px (default 40) */
  distance?: number;
};

export default function MotionInView({
  children,
  delay = 0,
  amount = 0.2,
  duration = 0.8,
  replay = false,
  as = "div",
  from = "up",
  distance = 40,
  className,
  ...rest
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = (motion as any)[as];

  const variants = useMemo(() => buildVariants(from, distance), [from, distance]);

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
