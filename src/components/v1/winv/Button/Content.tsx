"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Copy, 
  Check, 
  Download, 
  Code, 
  Palette, 
  Settings, 
  MousePointer,
  Sparkles,
  Zap,
  Heart,
  Star,
  Download as DownloadIcon,
  Send,
  Plus,
  Minus,
  X,
  Check as CheckIcon
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Button from "@/components/v1/winv/Button/Button";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ContentProps {
  setProgress: (v: number) => void;
}

export const Content = ({ setProgress }: ContentProps) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState("default");
  const [selectedSize, setSelectedSize] = useState("md");
  const [rippleEnabled, setRippleEnabled] = useState(true);
  const [glowEnabled, setGlowEnabled] = useState(true);
  const [magneticEnabled, setMagneticEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const variantOptions = [
    { value: "default", label: "Par défaut", class: "bg-white text-gray-900 border border-gray-200" },
    { value: "primary", label: "Primaire", class: "bg-blue-600 text-white" },
    { value: "secondary", label: "Secondaire", class: "bg-gray-100 text-gray-900" },
    { value: "ghost", label: "Fantôme", class: "text-gray-700 hover:bg-gray-100" },
    { value: "destructive", label: "Destructif", class: "bg-red-600 text-white" },
  ];

  const sizeOptions = [
    { value: "sm", label: "Petit", class: "h-8 px-3 text-sm" },
    { value: "md", label: "Moyen", class: "h-10 px-4 text-sm" },
    { value: "lg", label: "Grand", class: "h-12 px-6 text-base" },
  ];

  const copyToClipboard = useCallback(async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  const generateCode = useMemo(() => {
    return `import Button from "@/components/v1/winv/Button/Button";
import { Heart, Star, Download } from "lucide-react";

export default function MyComponent() {
  return (
    <div className="space-x-4">
      {/* Bouton simple */}
      <Button onClick={() => console.log('Clic!')}>
        Cliquez-moi
      </Button>
      
      {/* Bouton avec icône */}
      <Button 
        icon={DownloadIcon} 
        variant="primary"
        onClick={() => console.log('Téléchargement!')}
      >
        Télécharger
      </Button>
      
      {/* Boutons icon-only */}
      <Button icon={DownloadIcon} variant="secondary" />
      <Button icon={Star} variant="ghost" />
      
      {/* Bouton de chargement */}
      <Button 
        loading={true}
        variant="secondary"
      >
        Chargement...
      </Button>
      
      {/* Bouton avec effets désactivés */}
      <Button 
        ripple={false}
        glow={false}
        magnetic={false}
        variant="ghost"
      >
        Simple
      </Button>
    </div>
  );
}`;
  }, []);

  const generateInstallCode = useMemo(() => {
    return `// Installation des dépendances
npm install framer-motion lucide-react

// Ou avec yarn
yarn add framer-motion lucide-react

// Ou avec pnpm
pnpm add framer-motion lucide-react`;
  }, []);

  const generateSourceCode = useMemo(() => {
    return `/**
 * Button Component - @winv
 * Composant bouton avec effets d'animation avancés
 * Inspiré d'Animations.dev avec Framer Motion
 */
import React, { useState, useRef } from "react";
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

    return \`\${baseClasses} \${variants[variant]} \${sizes[size]}\`;
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
        className={\`absolute inset-0 rounded-lg \${glowColors[variant]} pointer-events-none\`}
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
      className={\`\${getVariantClasses()} \${className}\`}
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
          transition={{ duration: 0.4 }}
        />
      )}

    </motion.button>
  );
}`;
  }, []);

  return (
    <div className="h-screen overflow-y-scroll">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 p-4 sm:p-8 md:p-12 lg:p-16"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MousePointer className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Button Component</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            Créé par <span className="font-mono text-primary">@winv</span>
          </div>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Composant Button avec effets d'animation</CardTitle>
            <CardDescription>
              Bouton interactif avec effets de ripple, glow, magnétique et animations fluides.
              Inspiré d'Animations.dev avec Framer Motion et TypeScript.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Démo en direct */}
        <Card>
          <CardHeader>
            <CardTitle>Démo en direct</CardTitle>
            <CardDescription>
              Testez les différents variants et effets - survolez et cliquez sur les boutons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Variants */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Par défaut</Button>
                  <Button variant="primary">Primaire</Button>
                  <Button variant="secondary">Secondaire</Button>
                  <Button variant="ghost">Fantôme</Button>
                  <Button variant="destructive">Destructif</Button>
                </div>
              </div>

              {/* Tailles */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Tailles</h3>
                <div className="flex items-center gap-4">
                  <Button size="sm">Petit</Button>
                  <Button size="md">Moyen</Button>
                  <Button size="lg">Grand</Button>
                </div>
              </div>

              {/* Boutons avec icônes */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Boutons avec icônes</h3>
                <div className="flex flex-wrap gap-4">
                  <Button icon={DownloadIcon} variant="primary">Télécharger</Button>
                  <Button icon={Send} variant="secondary">Envoyer</Button>
                  <Button icon={Plus} variant="default">Ajouter</Button>
                  <Button icon={Minus} variant="ghost">Retirer</Button>
                  <Button icon={X} variant="destructive">Supprimer</Button>
                  <Button icon={CheckIcon} variant="primary">Valider</Button>
                  <Button icon={Star} variant="secondary">Favoris</Button>
                  <Button icon={Heart} variant="ghost">J'aime</Button>
                </div>
              </div>

              {/* Boutons icon-only */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Boutons icon-only</h3>
                <div className="flex flex-wrap gap-4">
                  <Button icon={DownloadIcon} variant="primary" />
                  <Button icon={Send} variant="secondary" />
                  <Button icon={Plus} variant="default" />
                  <Button icon={Minus} variant="ghost" />
                    <Button icon={X} variant="destructive" />
                  <Button icon={CheckIcon} variant="primary" />
                  <Button icon={Star} variant="secondary" />
                  <Button icon={Heart} variant="ghost" />
                  <Button icon={Sparkles} variant="default" />
                  <Button icon={Zap} variant="primary" />
                </div>
              </div>

              {/* États spéciaux */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">États spéciaux</h3>
                <div className="flex flex-wrap gap-4">
                  <Button loading={loading} onClick={handleLoadingDemo}>
                    {loading ? "Chargement..." : "Démo chargement"}
                  </Button>
                  <Button disabled>Désactivé</Button>
                  <Button ripple={false}>Sans ripple</Button>
                  <Button glow={false}>Sans glow</Button>
                  <Button magnetic={false}>Sans magnétique</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>
              Personnalisez l'apparence et les effets de votre bouton
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Variant */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Variant
                </label>
                <select
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  {variantOptions.map((variant) => (
                    <option key={variant.value} value={variant.value}>
                      {variant.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Taille */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Taille
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  {sizeOptions.map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Effets */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Effets</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rippleEnabled}
                      onChange={(e) => setRippleEnabled(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Ripple</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={glowEnabled}
                      onChange={(e) => setGlowEnabled(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Glow</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={magneticEnabled}
                      onChange={(e) => setMagneticEnabled(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Magnétique</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Aperçu */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Aperçu</label>
              <div className="p-4 border rounded-lg bg-muted/50">
                <Button
                  variant={selectedVariant as any}
                  size={selectedSize as any}
                  ripple={rippleEnabled}
                  glow={glowEnabled}
                  magnetic={magneticEnabled}
                  icon={CheckIcon}
                >
                  Bouton de test
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Code d'installation */}
        <Card>
          <CardHeader>
            <CardTitle>Installation</CardTitle>
            <CardDescription>
              Installez les dépendances nécessaires
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <SyntaxHighlighter
                language="bash"
                style={vscDarkPlus}
                customStyle={{
                  background: '#1E1E1E',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  fontSize: '0.875rem',
                }}
              >
                {generateInstallCode}
              </SyntaxHighlighter>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => copyToClipboard(generateInstallCode, "install")}
                className="absolute top-2 right-2"
                icon={copied === "install" ? Check : Copy}
              >
                
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Code d'utilisation */}
        <Card>
          <CardHeader>
            <CardTitle>Code d'utilisation</CardTitle>
            <CardDescription>
              Copiez ce code pour intégrer le bouton dans votre projet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <SyntaxHighlighter
                language="tsx"
                style={vscDarkPlus}
                customStyle={{
                  background: '#1E1E1E',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  fontSize: '0.875rem',
                }}
              >
                {generateCode}
              </SyntaxHighlighter>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => copyToClipboard(generateCode, "usage")}
                className="absolute top-2 right-2"
                icon={copied === "usage" ? Check : Copy}
              >
                
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Code source du composant */}
        <Card>
          <CardHeader>
            <CardTitle>Code source du composant</CardTitle>
            <CardDescription>
              Voici le code complet du Button.tsx
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <SyntaxHighlighter
                language="tsx"
                style={vscDarkPlus}
                customStyle={{
                  background: '#1E1E1E',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  fontSize: '0.875rem',
                }}
              >
                {generateSourceCode}
              </SyntaxHighlighter>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => copyToClipboard(generateSourceCode, "source")}
                className="absolute top-2 right-2"
                icon={copied === "source" ? Check : Copy}
                >
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Fonctionnalités */}
        <Card>
          <CardHeader>
            <CardTitle>Fonctionnalités</CardTitle>
            <CardDescription>
              Découvrez toutes les capacités de ce composant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium">🎨 Effets visuels</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Effet ripple au clic</li>
                  <li>• Glow au survol</li>
                  <li>• Effet magnétique 3D</li>
                  <li>• Animations fluides</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">⚡ Performance</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Optimisé avec Framer Motion</li>
                  <li>• TypeScript ready</li>
                  <li>• Accessible (ARIA)</li>
                  <li>• Responsive design</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};