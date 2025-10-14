"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ButtonProps {
  children?: React.ReactNode;
  icon?: LucideIcon;
  variant?: "default" | "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  tooltip?: string;
  ripple?: boolean;
  glow?: boolean;
  magnetic?: boolean;
}

export default function Button({
  children,
  icon: Icon,
  variant = "default",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  loading = false,
  tooltip,
  ripple = true,
  glow = true,
  magnetic = false,
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isReleased, setIsReleased] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Motion values pour les effets magnétiques
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 15 });

  // Gestion des variants
  const getVariantClasses = () => {
    const baseClasses = "relative flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      default: "bg-white text-gray-900 shadow-sm border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700",
      primary: "bg-blue-600 text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
      secondary: "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
      ghost: "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
      destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };

    return `${baseClasses} ${variants[variant]} ${sizes[size]}`;
  };

  // Gestion des effets de ripple
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ripple || disabled || loading) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  // Gestion des effets magnétiques
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || disabled || loading) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = (e.clientX - centerX) / (rect.width / 2);
    const distanceY = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(distanceX);
    mouseY.set(distanceY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Effet de glow
  const getGlowEffect = () => {
    if (!glow || !isHovered || disabled || loading) return null;

    const glowColors = {
      default: "shadow-[0_0_20px_rgba(0,0,0,0.1)]",
      primary: "shadow-[0_0_20px_rgba(59,130,246,0.3)]",
      secondary: "shadow-[0_0_20px_rgba(107,114,128,0.2)]",
      ghost: "shadow-[0_0_20px_rgba(107,114,128,0.1)]",
      destructive: "shadow-[0_0_20px_rgba(239,68,68,0.3)]",
    };

    return (
      <motion.div
        className={`absolute inset-0 rounded-lg ${glowColors[variant]} pointer-events-none`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
    );
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`${getVariantClasses()} ${className}`}
      onClick={(e) => {
        handleRipple(e);
        onClick?.();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={() => {
        setIsPressed(true);
        setIsReleased(false);
      }}
      onMouseUp={() => {
        setIsPressed(false);
        setIsReleased(true);
        setTimeout(() => setIsReleased(false), 300);
      }}
      disabled={disabled || loading}
      style={{
        transform: magnetic ? "perspective(1000px)" : undefined,
        rotateX: magnetic ? rotateX : undefined,
        rotateY: magnetic ? rotateY : undefined,
      }}
      whileHover={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1), inset 0 1px 2px rgba(0,0,0,0.1)" }}
      whileTap={{ 
        scale: 0.9,
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1), inset 0 1px 2px rgba(0,0,0,0.1)"
      }}
      whileFocus={{ 
        scale: 0.9,
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1), inset 0 1px 2px rgba(0,0,0,0.1)"
      }}
      animate={isReleased ? { 
        scale: [0.90, 1.05]
      } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      title={tooltip}
      aria-disabled={disabled || loading}
    >
      {/* Effet de glow */}
      {getGlowEffect()}

      {/* Ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 40, height: 40, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Contenu du bouton */}
      <motion.div 
        className="relative flex items-center justify-center gap-2"
        animate={isPressed ? { y: 1, scale: 0.95 } : { y: 0, scale: 1 }}
        transition={{ duration: 0.1 }}
      >
        {/* Icône de chargement */}
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Icône */}
        {Icon && !loading && (
          <motion.div
            className="flex items-center justify-center"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.1 }}
          >
            <Icon className="w-4 h-4" />
          </motion.div>
        )}

        {/* Texte */}
        {children && (
          <motion.span
            animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
            transition={{ duration: 0.1 }}
          >
            {children}
          </motion.span>
        )}
      </motion.div>

      {/* Effet de pression avec ombre interne */}
      {(isPressed || isReleased) && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 100%)",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1), inset 0 1px 2px rgba(0,0,0,0.1)"
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isPressed ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

    </motion.button>
  );
}
