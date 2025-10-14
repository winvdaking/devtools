import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";

export default function Scrollbar({
  className = "",
  currentPosition = "bottom-6 right-6",
  currentColor = "bg-black dark:bg-white",
  currentSize = { width: "w-[300px]", height: "h-[32px]" },
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [showScrollCard, setShowScrollCard] = useState(true);

  // --- calcul du scroll du conteneur
  useEffect(() => {
    const handleScroll = () => {
      // Trouver le conteneur de scroll (celui avec overflow-y-scroll)
      const scrollContainer = document.querySelector('.h-screen.overflow-y-scroll') as HTMLElement;
      
      if (scrollContainer) {
        const scrollTop = scrollContainer.scrollTop;
        const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    // Écouter le scroll du conteneur spécifique
    const scrollContainer = document.querySelector('.h-screen.overflow-y-scroll') as HTMLElement;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll();
      
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // --- gestion du clic sur la timeline pour scroller le conteneur
  const handleTimelineClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;

    // Trouver le conteneur de scroll et faire défiler
    const scrollContainer = document.querySelector('.h-screen.overflow-y-scroll') as HTMLElement;
    if (scrollContainer) {
      const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const newScrollY = (newProgress / 100) * scrollHeight;

      scrollContainer.scrollTo({
        top: newScrollY,
        behavior: "smooth",
      });
    }
  }, []);

  // --- détection du hover pour effet de proximité
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mousePos = ((e.clientX - rect.left) / rect.width) * 100;
    setMouseX(mousePos);
  }, []);

  return (
      <motion.div
        className={`fixed ${currentPosition} z-50 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showScrollCard ? 1 : 0, y: showScrollCard ? 0 : 20 }}
        transition={{ duration: 0.25 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMouseX(-100); // Réinitialiser à une valeur qui ne correspond à aucun trait
        }}
        aria-hidden={!showScrollCard}
        role="presentation"
      >
      <div
        className="bg-stone-50/95 dark:bg-stone-800/95 backdrop-blur-sm px-3 py-1 border border-stone-200/50 dark:border-stone-700/50"
        style={{
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          borderRadius: 16,
        }}
      >
        <div
          className={`relative ${currentSize.width} ${currentSize.height} flex items-center justify-center cursor-pointer`}
          onClick={handleTimelineClick}
          onMouseMove={handleMouseMove}
        >
          {/* --- Traits de la scrollbar --- */}
          <div className="absolute inset-0 flex items-center justify-between px-1 pointer-events-none">
            {useMemo(() => 
              Array.from({ length: 41 }, (_, i) => {
                const markProgress = (i / 40) * 100;
                const dist = Math.abs(markProgress - mouseX);
                const scale = dist < 2 ? 1.8 : dist < 5 ? 1.4 : 1; // effet de proximité plus prononcé
                const isBig = i === 0 || i === 40 || i % 5 === 0;
                const isEnd = i === 0 || i === 40; // traits de début et fin
                const baseHeight = isEnd ? 14 : isBig ? 16 : 12; // taille de base ajustée
                
                return (
                  <div
                    key={i}
                    className={`w-[2px] rounded-full transition-all duration-150 ${
                      isBig
                        ? "bg-black/80 dark:bg-white/80"
                        : "bg-gray-300 dark:bg-gray-500"
                    }`}
                    style={{
                      height: baseHeight * scale,
                    }}
                  />
                );
              }), [mouseX])
            }
          </div>

          {/* --- Curseur de progression --- */}
          <div
            className="absolute pointer-events-none flex items-center"
            style={{
              left: `${scrollProgress}%`,
              transform: "translateX(-50%)",
              top: 0,
              bottom: 0,
            }}
          >
            <div
              className={`w-[3px] h-[24px] ${currentColor} rounded-full shadow-md`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
