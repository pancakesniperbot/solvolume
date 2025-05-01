import { ReactNode, useState, useEffect } from "react";
import { motion, MotionValue, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

// ==========================================
// SOLANA 3D CARD COMPONENT
// ==========================================
interface Solana3DCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "purple" | "green" | "blue" | "multi";
  depth?: "low" | "medium" | "high";
  interactive?: boolean;
  hoverScale?: number;
}

export function Solana3DCard({
  children,
  className = "",
  glowColor = "purple",
  depth = "medium",
  interactive = true,
  hoverScale = 1.02,
}: Solana3DCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  // Color maps for glow effects
  const glowColors = {
    purple: "rgba(153, 69, 255, 0.25)",
    green: "rgba(20, 241, 149, 0.25)",
    blue: "rgba(3, 225, 255, 0.25)",
    multi: "conic-gradient(from 225deg, rgba(153, 69, 255, 0.25), rgba(20, 241, 149, 0.25), rgba(3, 225, 255, 0.25), rgba(153, 69, 255, 0.25))",
  };
  
  // Depth settings
  const depthShadow = {
    low: "0 8px 20px rgba(0, 0, 0, 0.2)",
    medium: "0 12px 30px rgba(0, 0, 0, 0.3)",
    high: "0 20px 50px rgba(0, 0, 0, 0.4)",
  };
  
  const depthInsetShadow = {
    low: "inset 0 1px 1px rgba(255, 255, 255, 0.06)",
    medium: "inset 0 1px 2px rgba(255, 255, 255, 0.08)",
    high: "inset 0 1px 3px rgba(255, 255, 255, 0.1)",
  };
  
  // 3D effect intensity
  const tiltIntensity = {
    low: 3,
    medium: 5,
    high: 7,
  }[depth];
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    setMousePosition({ x, y });
    
    rotateX.set(-y * tiltIntensity);
    rotateY.set(x * tiltIntensity);
  };
  
  const springConfig = { damping: 15, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  
  return (
    <motion.div
      className={cn(
        "relative bg-gradient-to-b from-[#10101c] to-[#070710] rounded-xl border border-[#1a1a2e] overflow-hidden",
        className
      )}
      style={{
        boxShadow: isHovered 
          ? `${depthShadow[depth]}, ${depthInsetShadow[depth]}`
          : `${depthShadow[depth]}, ${depthInsetShadow[depth]}`,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        rotateX.set(0);
        rotateY.set(0);
      }}
      whileHover={interactive ? { scale: hoverScale } : {}}
      transition={{ type: "spring", bounce: 0.2 }}
    >
      {/* Inner glass effect */}
      <div className="absolute inset-0 rounded-xl z-0">
        {/* Top highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {/* Left highlight */}
        <div className="absolute left-0 inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>
      
      {/* Hover glow effect */}
      <motion.div
        className="absolute -inset-px rounded-xl opacity-0 z-0"
        style={{
          background: typeof glowColors[glowColor] === "string" 
            ? glowColors[glowColor] 
            : glowColors.multi,
          filter: "blur(15px)",
          opacity: isHovered ? 0.5 : 0,
        }}
        animate={{
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content with 3D effect */}
      <motion.div 
        className="relative z-10 h-full"
        style={{
          transform: "translateZ(20px)",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// ==========================================
// SOLANA 3D BUTTON COMPONENT
// ==========================================
interface Solana3DButtonProps {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  glowColor?: "purple" | "green" | "blue" | "multi";
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export function Solana3DButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  glowColor = "purple",
  fullWidth = false,
  disabled = false,
  icon,
  iconPosition = "left",
}: Solana3DButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  
  // Size maps
  const sizeMaps = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-5 text-base",
    lg: "py-4 px-6 text-lg",
  };
  
  // Variant styles
  const baseStyle = "rounded-full font-medium transition-all transform duration-200 ease-out";
  
  // Dynamic variants
  const variantStyles = {
    primary: "bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black shadow-lg shadow-[#9945FF]/20",
    secondary: "bg-[#0a0a14] text-white border border-[#1e2035] shadow-lg hover:border-[#14F195]/40",
    outline: "bg-transparent border border-[#1e2035] text-white hover:bg-[#0a0a14]/30 hover:border-[#9945FF]/40",
    ghost: "bg-transparent text-white hover:bg-white/5",
  };
  
  // Glow colors
  const glowColors = {
    purple: "rgba(153, 69, 255, 0.35)",
    green: "rgba(20, 241, 149, 0.35)",
    blue: "rgba(3, 225, 255, 0.35)",
    multi: "linear-gradient(to right, rgba(153, 69, 255, 0.35), rgba(20, 241, 149, 0.35))",
  };
  
  const buttonStyle = cn(
    baseStyle,
    sizeMaps[size],
    variantStyles[variant],
    fullWidth ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    className
  );
  
  return (
    <motion.button
      className={buttonStyle}
      onClick={disabled ? undefined : onClick}
      initial={{ y: 0 }}
      whileHover={!disabled ? { scale: 1.03, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.97, y: 1 } : {}}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{
        boxShadow: isPressed || disabled ? "none" : variant === "primary" 
          ? `0 6px 15px ${glowColors[glowColor]}`
          : "",
      }}
    >
      <div className="flex items-center justify-center gap-2">
        {icon && iconPosition === "left" && <span>{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span>{icon}</span>}
      </div>
    </motion.button>
  );
}

// ==========================================
// SOLANA FLOATING BADGE COMPONENT
// ==========================================
interface SolanaFloatingBadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "success" | "warning" | "error" | "gradient";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export function SolanaFloatingBadge({
  children,
  className = "",
  variant = "default",
  size = "md",
  animated = true,
}: SolanaFloatingBadgeProps) {
  // Size classes
  const sizeClasses = {
    sm: "py-1 px-3 text-xs",
    md: "py-1.5 px-4 text-sm",
    lg: "py-2 px-5 text-base",
  };
  
  // Variant classes
  const variantClasses = {
    default: "bg-[#1a1a2e] text-white/80 border-[#333347]",
    success: "bg-[#081f16] text-[#14F195] border-[#14F195]/30",
    warning: "bg-[#1f1908] text-[#f1c414] border-[#f1c414]/30",
    error: "bg-[#1f0808] text-[#f14141] border-[#f14141]/30",
    gradient: "bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white border-transparent",
  };
  
  // Build the badge class
  const badgeClass = cn(
    "inline-flex items-center justify-center rounded-full font-medium shadow-lg border",
    sizeClasses[size],
    variantClasses[variant],
    className
  );
  
  return (
    <motion.div
      className={`relative ${animated ? "group" : ""}`}
      whileHover={animated ? { y: -3 } : {}}
    >
      {/* Glow effect - only for animated and certain variants */}
      {animated && variant !== "default" && (
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 z-0 transition-opacity duration-300"
          style={{ 
            background: 
              variant === "gradient" 
                ? "linear-gradient(to right, rgba(153, 69, 255, 0.4), rgba(20, 241, 149, 0.4))" 
                : variant === "success" 
                  ? "rgba(20, 241, 149, 0.4)" 
                  : variant === "warning" 
                    ? "rgba(241, 196, 20, 0.4)" 
                    : "rgba(241, 65, 65, 0.4)",
            filter: "blur(8px)",
            transform: "translate(0, 5px) scale(1.1)",
          }}
        />
      )}
      
      {/* Badge content */}
      <motion.div className={badgeClass}>
        {children}
        
        {/* Inner highlight effect */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20 rounded-full w-4/5 mx-auto" />
      </motion.div>
    </motion.div>
  );
}

// ==========================================
// SOLANA GLOW TEXT COMPONENT
// ==========================================
interface SolanaGlowTextProps {
  children: ReactNode;
  className?: string;
  color?: "purple" | "green" | "blue" | "gradient";
  intensity?: "low" | "medium" | "high";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export function SolanaGlowText({
  children,
  className = "",
  color = "purple",
  intensity = "medium",
  as = "span",
}: SolanaGlowTextProps) {
  // Color maps
  const colorMap = {
    purple: "#9945FF",
    green: "#14F195",
    blue: "#03E1FF",
    gradient: "bg-clip-text text-transparent bg-gradient-to-r from-[#9945FF] to-[#14F195]",
  };
  
  // Glow intensity
  const intensityMap = {
    low: "2px",
    medium: "4px",
    high: "6px",
  };
  
  // Should we use gradient (for text color)?
  const useGradient = color === "gradient";
  
  // Compute the class
  const textClass = cn(
    useGradient ? colorMap.gradient : "text-[" + colorMap[color] + "]",
    className
  );
  
  // Apply text shadow unless it's a gradient
  const textStyle = !useGradient
    ? {
        textShadow: `0 0 ${intensityMap[intensity]} ${colorMap[color]}60`,
      }
    : {};
  
  // Create the element based on the "as" prop
  const Component = motion[as] as any;
  
  return (
    <Component
      className={textClass}
      style={textStyle}
      whileHover={{
        textShadow: !useGradient
          ? `0 0 ${intensityMap.high} ${colorMap[color]}80`
          : undefined,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </Component>
  );
}

// ==========================================
// SOLANA FLOATING STAT CARD COMPONENT
// ==========================================
interface SolanaFloatingStatCardProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
  iconColor?: "purple" | "green" | "blue" | "gradient";
  className?: string;
  valueSize?: "sm" | "md" | "lg" | "xl";
}

export function SolanaFloatingStatCard({
  value,
  label,
  icon,
  iconColor = "green",
  className = "",
  valueSize = "lg",
}: SolanaFloatingStatCardProps) {
  // Color maps
  const colorMap = {
    purple: "#9945FF",
    green: "#14F195",
    blue: "#03E1FF",
    gradient: "bg-gradient-to-r from-[#9945FF] to-[#14F195]",
  };
  
  // Value size classes
  const valueSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };
  
  return (
    <motion.div
      className={cn(
        "bg-black/50 backdrop-blur-lg p-3 rounded-xl border border-[#1a1a2e] shadow-xl",
        className
      )}
      initial={{ y: 0 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        borderColor: iconColor === "gradient" 
          ? "rgba(153, 69, 255, 0.4)" 
          : `${colorMap[iconColor]}40`,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div 
            className={`p-2 rounded-lg ${
              iconColor === "gradient" 
                ? colorMap.gradient 
                : `bg-${colorMap[iconColor]}/10`
            }`}
          >
            {icon}
          </div>
        )}
        
        <div>
          <div 
            className={cn(
              valueSizeClasses[valueSize], 
              "font-bold",
              iconColor === "gradient" 
                ? "bg-clip-text text-transparent bg-gradient-to-r from-[#9945FF] to-[#14F195]" 
                : `text-[${colorMap[iconColor]}]`
            )}
            style={{ 
              textShadow: iconColor !== "gradient" 
                ? `0 0 10px ${colorMap[iconColor]}40` 
                : "none" 
            }}
          >
            {value}
          </div>
          <div className="text-xs text-white/60">{label}</div>
        </div>
      </div>
      
      {/* Inner highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10 w-4/5 mx-auto" />
    </motion.div>
  );
}