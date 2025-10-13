"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface ScrollBarProps {
  activeSection?: number;
  showScrollCard?: boolean;
}

export const ScrollBar = ({ activeSection = 0, showScrollCard = false }: ScrollBarProps = {}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseX, setMouseX] = useState(0);

  // Calculer le pourcentage de scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Suivre la position de la souris
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setMouseX(percentage);
  };

  // Gérer le clic sur la timeline
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const scrollTo = (percentage / 100) * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: scrollTo, behavior: "smooth" });
  };

  // Générer les traits verticaux (timeline marks)
  const timelineMarks = Array.from({ length: 40 }, (_, i) => i);

  return (
    <>
      {/* ScrollBar horizontale - Carte blanche avec timeline */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Carte blanche cassée avec bordures légèrement arrondies */}
        <motion.div
          className="bg-stone-50/95 dark:bg-stone-800/95 backdrop-blur-sm px-4 py-1 border border-stone-200/50 dark:border-stone-700/50"
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
            borderRadius: "16px",
          }}
        >
          {/* Timeline horizontale avec traits */}
          <div 
            className="relative w-[240px] h-8 flex items-center justify-center cursor-pointer"
            onClick={handleTimelineClick}
            onMouseMove={handleMouseMove}
          >
            {/* Traits verticaux */}
            <div className="absolute inset-0 flex items-center justify-between px-1">
              {timelineMarks.map((mark, index) => {
                const markProgress = (mark / (timelineMarks.length - 1)) * 100;
                const isNearMouse = isHovered && Math.abs(markProgress - mouseX) < 4;
                // Premier et dernier trait sont toujours grands, puis tous les 5
                const isBigMark = index === 0 || index === timelineMarks.length - 1 || mark % 5 === 0;
                
                return (
                  <motion.div
                    key={mark}
                    className={`w-[1.5px] rounded-full transition-all duration-200 ${
                      isBigMark
                        ? "bg-black/50 dark:bg-white/50"
                        : "bg-gray-300 dark:bg-gray-500"
                    }`}
                    style={{
                      height: isNearMouse
                        ? "24px" 
                        : isBigMark
                        ? "16px" 
                        : "12px",
                    }}
                    animate={{
                      scaleY: isNearMouse ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.15 }}
                  />
                );
              })}
            </div>

            {/* Curseur orange à la position de scroll */}
            <div
              className="absolute pointer-events-none flex items-center"
              style={{ 
                left: `${scrollProgress}%`,
                top: "0",
                bottom: "0",
                transform: "translateX(-50%)"
              }}
            >
              <div className="w-[3px] h-[28px] bg-orange-500 dark:bg-orange-400 rounded-full shadow-md" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

