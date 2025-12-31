'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HolographicObject() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px]"
        style={{ y, rotateX, opacity }}
      >
        {/* Abstract 3D Holographic Object */}
        <div className="relative w-full h-full">
          {/* Base Layer */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(20, 184, 166, 0.3), rgba(6, 182, 212, 0.2), transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          
          {/* Middle Layer */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 70% 70%, rgba(94, 234, 212, 0.25), rgba(20, 184, 166, 0.15), transparent 60%)',
              filter: 'blur(80px)',
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          
          {/* Top Layer - Organic Shape */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-1/2 h-1/2"
            style={{
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.4), rgba(6, 182, 212, 0.3))',
              borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
              filter: 'blur(40px)',
            }}
            animate={{
              borderRadius: [
                '40% 60% 70% 30% / 40% 50% 60% 50%',
                '60% 40% 30% 70% / 50% 40% 50% 60%',
                '40% 60% 70% 30% / 40% 50% 60% 50%',
              ],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Accent Glows */}
          <motion.div
            className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(94, 234, 212, 0.5), transparent)',
              filter: 'blur(30px)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

