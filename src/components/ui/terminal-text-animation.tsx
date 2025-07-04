
'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TerminalTextAnimationProps {
  textToType: string;
  className?: string;
  typingSpeed?: number; 
}

const TerminalTextAnimation: React.FC<TerminalTextAnimationProps> = ({
  textToType,
  className,
  typingSpeed = 50, // Default speed in ms
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Reset animation if textToType changes
    setDisplayedText('');
    setCurrentIndex(0);
    setShowCursor(true);
  }, [textToType]);

  useEffect(() => {
    if (currentIndex < textToType.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + textToType[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeoutId);
    } else {
      // Typing finished, keep cursor blinking
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 700); // Blink speed
      return () => clearInterval(cursorInterval);
    }
  }, [currentIndex, textToType, typingSpeed]);

  return (
    <div className={cn("font-mono text-sm w-full min-h-[6em]", className)}>
      <pre className="whitespace-pre-wrap break-words">
        {displayedText}
        {(currentIndex < textToType.length || showCursor) && (
          <span className="inline-block w-px h-4 bg-current translate-y-0.5 animate-blink-cursor-soft align-middle"></span>
        )}
      </pre>
    </div>
  );
};

export default TerminalTextAnimation;
