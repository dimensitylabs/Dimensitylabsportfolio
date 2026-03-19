"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  duration?: number;
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ 
  duration = 2500,
  onComplete = () => {}
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Hide native body scrollbar while preloader is visible
    document.body.style.overflow = 'hidden';

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, duration / 100);

    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
      document.body.style.overflow = '';
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [duration, onComplete]);

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.6, 0.01, 0.05, 0.95] as [number, number, number, number],
      },
    }),
  };

  const text = "DIMENSITY LABS";
  const letters = text.split("");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-black"
          style={{ zIndex: 9999999, backgroundColor: 'var(--clr-dark)', color: 'var(--clr-white)' }}
        >
          <div className="relative">
            <div className="flex items-center justify-center space-x-1 mb-8">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className={`text-4xl md:text-6xl font-bold ${
                    letter === " " ? "w-4" : ""
                  }`}
                  style={{
                    fontFamily: 'var(--font-instrument), system-ui, -apple-system, sans-serif',
                    letterSpacing: '0.05em',
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="relative w-full max-w-md mx-auto px-4"
            >
              <div 
                className="h-1 rounded-full overflow-hidden" 
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: 'var(--clr-accent)' }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-center mt-4 text-sm"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                {progress}%
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 1.2] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(198, 241, 53, 0.1) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
