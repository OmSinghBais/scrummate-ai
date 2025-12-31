'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  tilt?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  tilt = false,
}: GlassCardProps) {
  return (
    <motion.div
      className={`glass-card rounded-2xl p-6 ${className}`}
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        transformStyle: tilt ? 'preserve-3d' : 'flat',
      }}
    >
      {children}
    </motion.div>
  );
}

