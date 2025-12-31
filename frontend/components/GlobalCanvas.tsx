'use client';

import { ReactNode } from 'react';

interface GlobalCanvasProps {
  children: ReactNode;
}

export default function GlobalCanvas({ children }: GlobalCanvasProps) {
  return (
    <div className="mx-auto max-w-[1400px] w-full">
      <div className="glass rounded-[2rem] p-8 md:p-12 lg:p-16 relative overflow-hidden">
        {/* Subtle glow effect */}
        <div 
          className="absolute inset-0 rounded-[2rem] pointer-events-none" 
          style={{
            boxShadow: 'inset 0 0 100px rgba(20, 184, 166, 0.05), 0 0 200px rgba(20, 184, 166, 0.1)',
          }} 
        />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

