
'use client';

import React from 'react';

const CustomLoadingBar = () => {
  return (
    <div className="w-[200px] my-3"> {/* Container for the bar */}
      {/* Background track for the loading bar */}
      <div className="relative h-[20px] bg-muted/30 rounded-full overflow-hidden shadow-inner">
        {/* Animated Neon Purple Fill Bar */}
        <div className="absolute top-0 left-0 h-full bg-gradient-to-b from-fuchsia-500 via-purple-600 to-violet-700 rounded-full animate-loadingFill" />
        
        {/* Static White Shine Bars (overlay) */}
        <div className="absolute inset-0 flex items-center justify-start gap-[15px] -translate-x-1/4 pointer-events-none opacity-60">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="w-[6px] h-[30px] bg-gradient-to-tl from-white/25 via-white/15 to-transparent rotate-45"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomLoadingBar;
