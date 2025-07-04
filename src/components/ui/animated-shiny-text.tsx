
import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
}

const AnimatedShinyText = ({
  children,
  className,
  style,
  ...props
}: AnimatedShinyTextProps) => {
  return (
    <span
      className={cn(
        "relative", // Base class
        className   // Classes passed from parent, including animation, gradient, bg-clip, etc.
      )}
      style={{
        '--shimmer-width': '200%', // Default shimmer width, can be overridden
        ...(style || {}),
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </span>
  );
};

export default AnimatedShinyText;
