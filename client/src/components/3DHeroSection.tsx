import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float, Sphere, useTexture } from "@react-three/drei";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, BarChart3, RefreshCw } from "lucide-react";
// Import from our centralized THREE imports file
import { 
  Color, DoubleSide, AdditiveBlending, MeshBasicMaterial,
  ThreeMesh, ThreeGroup
} from "@/lib/three";
// Import THREE namespace for backward compatibility during refactoring
import THREE from "@/lib/three";
import { CyberpunkHeroBackground } from "@/components/CyberpunkHeroBackground";
// Import Solana mascot image directly
import solanaMascotImage from "../assets/SOLANA-VOLUME-BOT-MASCOTTE.png";
import { CtaButton } from "@/components/CtaButton";

// Token bubble floating component with sentiment
const TokenBubble = ({ 
  position = [0, 0, 0] as [number, number, number], 
  name, 
  color, 
  imageUrl, 
  scale = 1, 
  speed = 1,
  price = 0,
  change24h = 0,
  sentiment = 50, // 0-100 sentiment score
  volume24h = 0
}: { 
  position: [number, number, number], 
  name: string, 
  color: string, 
  imageUrl: string, 
  scale?: number, 
  speed?: number,
  price?: number,
  change24h?: number,
  sentiment?: number,
  volume24h?: number
}) => {
  const meshRef = useRef<ThreeMesh>(null);
  const texture = useTexture(imageUrl);
  const glowRef = useRef<ThreeMesh>(null);
  const sentimentRingRef = useRef<ThreeMesh>(null);
  const changeIndicatorRef = useRef<ThreeMesh>(null);
  
  // Get sentiment color
  const getSentimentColor = () => {
    if (sentiment >= 70) return "#14F195"; // Very bullish - green
    if (sentiment >= 55) return "#7CFC00"; // Bullish - light green
    if (sentiment >= 45) return "#9945FF"; // Neutral - purple
    if (sentiment >= 30) return "#FF9900"; // Bearish - orange
    return "#FF3B30"; // Very bearish - red
  };
  
  const sentimentColor = getSentimentColor();
  
  // Adjust speed based on volume and sentiment
  const dynamicSpeed = speed * (1 + (sentiment / 100) * 0.5);
  
  // Randomize motion parameters
  const rotSpeed = useRef(Math.random() * 0.02 * dynamicSpeed);
  const floatSpeed = useRef(Math.random() * 0.01 * dynamicSpeed);
  const floatRadius = useRef(Math.random() * 0.3 + 0.1);
  const floatOffset = useRef(Math.random() * Math.PI * 2);
  
  // Animate the token bubble
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    // Rotate the bubble
    meshRef.current.rotation.y += rotSpeed.current;
    
    // Float up and down with dynamic speed based on sentiment
    const t = clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * floatSpeed.current + floatOffset.current) * floatRadius.current;
    
    // Pulse the glow based on sentiment - more active for bullish, slower for bearish
    if (glowRef.current) {
      const pulseFrequency = 1 + (sentiment / 100);
      const pulseIntensity = 0.1 + (sentiment / 500); // 0.1 to 0.3 range
      const pulse = 0.9 + Math.sin(t * pulseFrequency) * pulseIntensity;
      glowRef.current.scale.set(pulse, pulse, pulse);
      
      // Change opacity based on sentiment
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.15 + (sentiment / 500); // 0.15 to 0.35 based on sentiment
    }
    
    // Animate sentiment ring
    if (sentimentRingRef.current) {
      // Rotate the ring
      sentimentRingRef.current.rotation.z += 0.005 * (sentiment / 50); // Faster rotation for higher sentiment
      
      // Pulse effect stronger for extreme sentiments
      const sentimentPulse = 1 + Math.sin(t * 1.5) * (Math.abs(sentiment - 50) / 250);
      sentimentRingRef.current.scale.set(sentimentPulse, sentimentPulse, sentimentPulse);
    }
    
    // Animate price change indicator
    if (changeIndicatorRef.current && Math.abs(change24h) > 0.5) {
      const direction = change24h >= 0 ? 1 : -1;
      const intensity = Math.min(Math.abs(change24h) / 10, 1); // Cap at 10% change for max intensity
      
      // Pulse more intensely for bigger changes
      const changePulse = 1 + Math.sin(t * (2 + intensity * 2)) * (0.1 + intensity * 0.2);
      changeIndicatorRef.current.scale.set(changePulse, changePulse, changePulse);
      
      // Make it move slightly in direction of change
      changeIndicatorRef.current.position.y = direction * Math.sin(t * 3) * 0.03;
    }
  });
  
  // Format price for display
  const formatPrice = (price: number) => {
    if (price < 0.0001) return price.toExponential(2);
    if (price < 0.01) return price.toFixed(6);
    if (price < 1) return price.toFixed(4);
    if (price < 100) return price.toFixed(2);
    return price.toFixed(0);
  };
  
  // Get price change class and symbol
  const getPriceChangeColor = () => {
    if (change24h > 3) return "#14F195"; // Strong positive
    if (change24h > 0) return "#7CFC00"; // Positive
    if (change24h < -3) return "#FF3B30"; // Strong negative
    if (change24h < 0) return "#FF9900"; // Negative
    return "#9945FF"; // Neutral
  };
  
  const priceChangeColor = getPriceChangeColor();
  const priceChangeSymbol = change24h >= 0 ? "+" : "";
  
  return (
    <Float
      speed={dynamicSpeed * 0.5}
      rotationIntensity={0.2 * (sentiment / 50)}
      floatIntensity={0.2 * (sentiment / 50)}
      position={position}
    >
      {/* Sentiment ring - shows overall market sentiment */}
      <mesh ref={sentimentRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7 * scale, 0.03 * scale, 16, 100]} />
        <meshBasicMaterial 
          color={sentimentColor} 
          transparent={true} 
          opacity={0.6} 
          side={DoubleSide}
          blending={AdditiveBlending}
        />
      </mesh>
      
      {/* Glow sphere - intensity based on sentiment */}
      <Sphere args={[0.6 * scale, 16, 16]} ref={glowRef}>
        <meshBasicMaterial 
          color={sentimentColor} 
          transparent={true} 
          opacity={0.15 + (sentiment / 500)} 
          depthWrite={false}
        />
      </Sphere>
      
      {/* Main token sphere */}
      <Sphere args={[0.5 * scale, 36, 36]} ref={meshRef}>
        <meshStandardMaterial 
          map={texture} 
          toneMapped={false} 
          emissive={new Color(color)}
          emissiveIntensity={1.2 * (sentiment / 50)}
          transparent={true}
          opacity={0.95}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
      
      {/* Price change indicator */}
      {Math.abs(change24h) > 0.5 && (
        <mesh 
          ref={changeIndicatorRef} 
          position={[0, -0.5 * scale, 0.5 * scale]}
          rotation={[0, 0, change24h >= 0 ? 0 : Math.PI]}
        >
          <coneGeometry args={[0.1 * scale, 0.2 * scale, 32]} />
          <meshBasicMaterial 
            color={priceChangeColor} 
            transparent={true} 
            opacity={0.9}
          />
        </mesh>
      )}
      
      {/* Token name with enhanced glow */}
      <Text
        position={[0, -0.7 * scale, 0]}
        fontSize={0.15 * scale}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor={color}
        font="/fonts/BlenderProBold.ttf"
      >
        {name}
      </Text>
      
      {/* Price display */}
      {price > 0 && (
        <Text
          position={[0, -0.9 * scale, 0]}
          fontSize={0.08 * scale}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/BlenderProBold.ttf"
        >
          ${formatPrice(price)}
        </Text>
      )}
      
      {/* Price change display */}
      {change24h !== 0 && (
        <Text
          position={[0, -1.05 * scale, 0]}
          fontSize={0.08 * scale}
          color={priceChangeColor}
          anchorX="center"
          anchorY="middle"
          font="/fonts/BlenderProBold.ttf"
        >
          {priceChangeSymbol}{change24h.toFixed(1)}%
        </Text>
      )}
    </Float>
  );
};

// Enhanced Cyberpunk Solana Rings (Made more prominent for better visibility)
const SolanaRing = ({ position = [0, 0, 0] as [number, number, number], scale = 1 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const middleRingRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const centerSphereRef = useRef<THREE.Mesh>(null);
  const glowSphereRef = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!groupRef.current || !innerRingRef.current || !outerRingRef.current || 
        !middleRingRef.current || !centerSphereRef.current || !glowSphereRef.current) return;
    
    const t = clock.getElapsedTime();
    
    // Rotate the entire group slowly
    groupRef.current.rotation.z = t * 0.15;
    
    // Rotate the rings at different speeds in different directions
    innerRingRef.current.rotation.z = -t * 0.3;
    middleRingRef.current.rotation.z = t * 0.25;
    outerRingRef.current.rotation.z = -t * 0.2;
    
    // Pulse the outer ring
    const outerPulse = Math.sin(t * 2) * 0.08 + 1.02;
    outerRingRef.current.scale.set(outerPulse, outerPulse, outerPulse);
    
    // Pulse the middle ring with a different frequency
    const middlePulse = Math.sin(t * 1.5 + 1) * 0.1 + 1.05;
    middleRingRef.current.scale.set(middlePulse, middlePulse, middlePulse);
    
    // Pulse the center sphere
    const centerPulse = Math.sin(t * 3) * 0.15 + 1.1;
    centerSphereRef.current.scale.set(centerPulse, centerPulse, centerPulse);
    
    // Pulse the glow intensity by changing opacity
    const glowMaterial = glowSphereRef.current.material as THREE.MeshBasicMaterial;
    glowMaterial.opacity = 0.4 + Math.sin(t * 0.8) * 0.15;
    
    // Additional outer glow pulse
    if (outerGlowRef.current) {
      const outerGlowMaterial = outerGlowRef.current.material as THREE.MeshBasicMaterial;
      outerGlowMaterial.opacity = 0.3 + Math.sin(t * 0.5) * 0.2;
      
      // Scale pulse for outer glow
      const glowPulse = Math.sin(t * 0.3) * 0.1 + 1.05;
      outerGlowRef.current.scale.set(glowPulse, glowPulse, glowPulse);
    }
    
    // Enhanced wobble to the entire structure - more dynamic
    groupRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.08;
    groupRef.current.position.x = position[0] + Math.sin(t * 0.7) * 0.05;
  });
  
  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Enhanced outer glow sphere for ambient effect */}
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#9945FF" transparent opacity={0.3} depthWrite={false} />
      </mesh>
      
      {/* Inner glow sphere */}
      <mesh ref={glowSphereRef}>
        <sphereGeometry args={[2.0, 32, 32]} />
        <meshBasicMaterial color="#14F195" transparent opacity={0.25} depthWrite={false} />
      </mesh>
      
      {/* Outer ring - thicker and more vibrant */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.6, 0.08, 16, 48]} />
        <meshBasicMaterial 
          color="#9945FF" 
          transparent 
          opacity={0.9}
        />
      </mesh>
      
      {/* Middle ring - performance optimized */}
      <mesh ref={middleRingRef}>
        <torusGeometry args={[1.2, 0.06, 16, 48]} />
        <meshBasicMaterial 
          color="#03E1FF" 
          transparent 
          opacity={0.9}
        />
      </mesh>
      
      {/* Inner ring - performance optimized */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[0.8, 0.1, 16, 48]} />
        <meshBasicMaterial 
          color="#14F195" 
          transparent 
          opacity={0.9}
        />
      </mesh>
      
      {/* Center sphere - performance optimized */}
      <mesh ref={centerSphereRef}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial 
          color="#03E1FF" 
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Additional inner pulse rings for enhanced effect */}
      {[0.45, 0.55, 0.65, 0.75].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2 * Math.random(), 0, 0]}>
          <ringGeometry args={[radius, radius + 0.02, 32]} />
          <meshBasicMaterial 
            color={i % 2 === 0 ? "#14F195" : "#9945FF"} 
            transparent 
            opacity={0.6} 
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      
      {/* Extra rays emanating from center for more prominence */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={`ray-${i}`} rotation={[0, 0, (Math.PI * 2 / 12) * i]}>
          <planeGeometry args={[0.1, 2.5]} />
          <meshBasicMaterial 
            color={i % 3 === 0 ? "#14F195" : i % 3 === 1 ? "#9945FF" : "#03E1FF"} 
            transparent 
            opacity={0.15} 
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

// Volume bar visualization
const VolumeBar = ({ position = [0, 0, 0] as [number, number, number], height = 1, color = "#14F195" }) => {
  const barRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!barRef.current || !glowRef.current) return;
    
    // Animate height
    const t = clock.getElapsedTime();
    const newHeight = height * (0.8 + Math.sin(t * 2) * 0.2);
    barRef.current.scale.y = newHeight;
    
    // Match glow to bar height
    glowRef.current.scale.y = newHeight;
    
    // Subtle pulse effect on opacity
    const material = glowRef.current.material as THREE.MeshBasicMaterial;
    material.opacity = 0.4 + Math.sin(t * 3) * 0.1;
  });
  
  return (
    <group position={position}>
      {/* Core volume bar */}
      <mesh ref={barRef}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.4} 
          transparent 
          opacity={0.9} 
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <boxGeometry args={[0.3, 1.05, 0.3]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.4} 
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

// Enhanced cyberpunk background particles
const ParticleField = ({ count = 100, color = "#ffffff" }) => {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const particlesGroup = useRef<THREE.Group>(null);
  
  // Generate random positions for particles with varied properties
  const particles = Array.from({ length: count }, () => ({
    position: [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 5
    ] as [number, number, number],
    size: Math.random() * 0.05 + 0.01,
    speed: Math.random() * 2 + 1,
    intensity: Math.random() * 0.4 + 0.2,
    floatRadius: Math.random() * 0.3 + 0.05
  }));
  
  // Reference for particle meshes
  const particleRefs = useRef<(THREE.Mesh | null)[]>(particles.map(() => null));
  
  // Animate particles
  useFrame(({ clock }) => {
    if (!particlesGroup.current) return;
    
    const t = clock.getElapsedTime();
    
    // Update individual particles
    particleRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      
      const particle = particles[i];
      
      // Pulse size and opacity
      const pulse = 0.9 + Math.sin(t * particle.speed + i) * 0.1;
      mesh.scale.set(pulse, pulse, pulse);
      
      // Get material and update opacity
      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = particle.intensity * (0.8 + Math.sin(t * 0.5 + i * 0.1) * 0.2);
    });
  });
  
  return (
    <group ref={particlesGroup}>
      {particles.map((particle, i) => (
        <Float
          key={i}
          speed={particle.speed}
          rotationIntensity={0.1}
          floatIntensity={0.8}
          position={particle.position}
        >
          <mesh ref={el => particleRefs.current[i] = el}>
            <sphereGeometry args={[particle.size, 12, 12]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={particle.intensity} 
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Camera control
const CameraController = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.z = 5;
    camera.position.y = 0;
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  useFrame(({ clock, mouse }) => {
    // Subtle camera movement based on mouse position
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.1) * 0.5 + mouse.x * 0.5;
    camera.position.y = Math.cos(t * 0.1) * 0.5 + mouse.y * 0.5;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

import { getCoinLogo } from "@/utils/getCoinLogo";

// Meme coin data with sentiment information
const memeCoinsData = [
  {
    name: "BONK",
    symbol: "BONK",
    color: "#F7A44C",
    imageUrl: getCoinLogo("BONK"),
    position: [-2.5, 1, 0] as [number, number, number],
    scale: 0.8,
    speed: 1.0,
    price: 0.00001807,
    change24h: 5.2,
    sentiment: 78, // bullish
    volume24h: 92932723
  },
  {
    name: "WIF",
    symbol: "WIF",
    color: "#B1B549",
    imageUrl: getCoinLogo("WIF"), 
    position: [2.5, 0.5, 0.5] as [number, number, number],
    scale: 0.7,
    speed: 1.2,
    price: 1.35,
    change24h: 2.5,
    sentiment: 65, // somewhat bullish
    volume24h: 126653448
  },
  {
    name: "POPCAT",
    symbol: "POPCAT",
    color: "#FF5D8F",
    imageUrl: getCoinLogo("POPCAT"),
    position: [-1.8, -1.5, 0.2] as [number, number, number],
    scale: 0.7,
    speed: 0.8,
    price: 0.013,
    change24h: -2.1,
    sentiment: 42, // somewhat bearish
    volume24h: 7500000
  },
  {
    name: "BOOK",
    symbol: "BOOK",
    color: "#14F195",
    imageUrl: getCoinLogo("BOOK"),
    position: [2, -1, -0.5] as [number, number, number],
    scale: 0.9,
    speed: 1.5,
    price: 0.0035,
    change24h: 8.7,
    sentiment: 71, // bullish
    volume24h: 12000000
  },
  {
    name: "MOCHI",
    symbol: "MOCHI",
    color: "#E95F98",
    imageUrl: getCoinLogo("MOCHI"),
    position: [0, 2, 0.3] as [number, number, number],
    scale: 0.85,
    speed: 1.1,
    price: 0.00000721,
    change24h: 21.3,
    sentiment: 85, // very bullish
    volume24h: 9500000
  },
  {
    name: "BODEN",
    symbol: "BODEN",
    color: "#5DADE2",
    imageUrl: getCoinLogo("BODEN"),
    position: [-3, -0.2, -0.3] as [number, number, number],
    scale: 0.75,
    speed: 0.9,
    price: 0.000054,
    change24h: -7.3,
    sentiment: 34, // bearish
    volume24h: 5800000
  }
];

// Main component
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <CameraController />
      
      {/* Solana ring in the center */}
      <SolanaRing position={[0, 0, -1]} scale={1.5} />
      
      {/* Popular Solana Meme Coins with sentiment data */}
      {memeCoinsData.map((coin, index) => (
        <TokenBubble
          key={coin.name}
          position={coin.position}
          name={coin.name}
          color={coin.color}
          imageUrl={coin.imageUrl}
          scale={coin.scale}
          speed={coin.speed}
          price={coin.price}
          change24h={coin.change24h}
          sentiment={coin.sentiment}
          volume24h={coin.volume24h}
        />
      ))}
      
      {/* Market activity indicators */}
      <group position={[0, -3, 0]}>
        {/* Market sentiment gauge */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.8, 1.9, 64]} />
          <meshBasicMaterial 
            color="#14F195" 
            transparent 
            opacity={0.3} 
            side={DoubleSide}
          />
        </mesh>
        
        {/* Overall sentiment needle that rotates based on average sentiment */}
        <mesh 
          position={[0, 0, 0]} 
          rotation={[Math.PI / 2, 0, (memeCoinsData.reduce((sum, coin) => sum + coin.sentiment, 0) / memeCoinsData.length / 100) * Math.PI]}
        >
          <cylinderGeometry args={[0.02, 0.02, 1.7, 12]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>
      
      {/* Volume bars - height based on actual volume data */}
      {memeCoinsData.map((coin, index) => {
        const normalizedVolume = coin.volume24h / 25000000; // Normalize based on max volume
        const barHeight = 1 + normalizedVolume * 2; // Scale for visualization
        return (
          <VolumeBar 
            key={`volume-${coin.name}`}
            position={[-3 + index * 0.5, -1, -1]} 
            height={barHeight} 
            color={coin.sentiment > 50 ? "#14F195" : "#FF5D8F"} 
          />
        );
      })}
      
      {/* Background particles */}
      <ParticleField count={60} color="#14F195" />
      <ParticleField count={40} color="#9945FF" />
      <ParticleField count={20} color="#03E1FF" />
    </>
  );
};

// Main 3D scene with real-time sentiment visualizations
const DynamicScene = ({ coinData }: { coinData: typeof memeCoinsData }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <CameraController />
      
      {/* Solana ring in the center */}
      <SolanaRing position={[0, 0, -1]} scale={1.5} />
      
      {/* Popular Solana Meme Coins with sentiment data */}
      {coinData.map((coin) => (
        <TokenBubble
          key={coin.name}
          position={coin.position}
          name={coin.name}
          color={coin.color}
          imageUrl={coin.imageUrl}
          scale={coin.scale}
          speed={coin.speed}
          price={coin.price}
          change24h={coin.change24h}
          sentiment={coin.sentiment}
          volume24h={coin.volume24h}
        />
      ))}
      
      {/* Market activity indicators */}
      <group position={[0, -3, 0]}>
        {/* Market sentiment gauge */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.8, 1.9, 64]} />
          <meshBasicMaterial 
            color="#14F195" 
            transparent={true}
            opacity={0.3} 
            side={DoubleSide}
          />
        </mesh>
        
        {/* Overall sentiment needle that rotates based on average sentiment */}
        <mesh 
          position={[0, 0, 0]} 
          rotation={[Math.PI / 2, 0, (coinData.reduce((sum, coin) => sum + (coin.sentiment || 50), 0) / coinData.length / 100) * Math.PI]}
        >
          <cylinderGeometry args={[0.02, 0.02, 1.7, 12]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>
      
      {/* Volume bars - height based on actual volume data */}
      {coinData.map((coin, index) => {
        // Default to a reasonable volume if none provided
        const volumeValue = coin.volume24h || 10000000;
        const normalizedVolume = volumeValue / 25000000; // Normalize based on max volume
        const barHeight = 1 + normalizedVolume * 2; // Scale for visualization
        return (
          <VolumeBar 
            key={`volume-${coin.name}`}
            position={[-3 + index * 0.5, -1, -1]} 
            height={barHeight} 
            color={(coin.sentiment || 50) > 50 ? "#14F195" : "#FF5D8F"} 
          />
        );
      })}
      
      {/* Background particles */}
      <ParticleField count={60} color="#14F195" />
      <ParticleField count={40} color="#9945FF" />
      <ParticleField count={20} color="#03E1FF" />
    </>
  );
};

export function ThreeDHeroSection() {
  const [hasStarted, setHasStarted] = useState(false);
  // Load live coin data from our service
  const [coinData, setCoinData] = useState<typeof memeCoinsData>(memeCoinsData);
  // Reference for the mascot image
  const mascotRef = useRef<HTMLDivElement>(null);
  
  // State for tracking when a refresh is in progress
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Function to fetch coin data (defined outside useEffect to be accessible)
  const fetchCoinData = async () => {
    setIsRefreshing(true);
    try {
      // Import dynamically to avoid circular dependencies
      const memeCoinsService = await import('@/services/memeCoinsService');
      const latestCoins = await memeCoinsService.getMemeCoins();
      
      if (latestCoins && latestCoins.length) {
        // Map service data to our 3D model structure
        const updatedCoinData = memeCoinsData.map((coin, index) => {
          // Find the matching coin in our service data by symbol
          const matchedCoin = latestCoins.find((c: any) => c.symbol === coin.symbol) || 
                             latestCoins[index % latestCoins.length];
          
          if (matchedCoin) {
            return {
              ...coin,
              price: matchedCoin.price,
              change24h: matchedCoin.change24h,
              sentiment: matchedCoin.sentiment, 
              volume24h: matchedCoin.volume24h,
              imageUrl: matchedCoin.icon || '' // Use icon from API for coin image
            };
          }
          return coin;
        });
        
        setCoinData(updatedCoinData);
      }
    } catch (error) {
      console.error("Error fetching real-time coin data:", error);
      // Keep using the default data if fetching fails
    } finally {
      // Always stop refreshing after fetch completes (success or failure)
      setTimeout(() => {
        setIsRefreshing(false);
      }, 500);
    }
  };
  
  // Effect to initialize data on component mount
  useEffect(() => {
    // Initial data fetch
    fetchCoinData();
    
    // No automatic refresh interval - users must manually refresh
    // This reduces server load and prevents unnecessary data transfers
    
    return () => {
      // Cleanup if needed
    };
  }, []);
  
  // Skip 3D rendering to avoid WebGL context errors
  return (
    <section className="min-h-screen relative overflow-hidden bg-black">
      {/* Advanced Cyberpunk Background */}
      <CyberpunkHeroBackground intensity={8} />
      
      {/* 3D Canvas removed temporarily - uncomment when WebGL issues fixed */}
      {/* <div className="absolute inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]} 
          style={{ display: 'fixed', pointerEvents: 'none' }}
          className="h-full w-full z-0"
        >
          <DynamicScene coinData={coinData} />
        </Canvas>
      </div> */}
      
      {/* Removed manual refresh button from header area */}

      {/* Solana mascot image - left side with float animation */}
      <div className="absolute left-10 bottom-40 z-10 hidden lg:block" ref={mascotRef}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, -15, 0],
            transition: {
              x: { duration: 0.7, delay: 0.5 },
              opacity: { duration: 0.7, delay: 0.5 },
              y: { 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatType: "reverse" 
              }
            }
          }}
        >
          <img 
            src={solanaMascotImage} 
            alt="Solana Volume Bot Mascot" 
            className="h-[400px] object-contain"
            style={{ 
              filter: 'drop-shadow(0 0 25px rgba(20, 241, 149, 0.6))',
              transform: 'rotate(5deg)'
            }}
          />
        </motion.div>
      </div>
      
      {/* Content layer */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-20">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Badge className="mb-6 px-4 py-1.5 text-lg bg-gradient-to-r from-[#9945FF] to-[#14F195] border-none">
              #1 Solana Volume Bot
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#14F195] to-[#9945FF]" id="main-headline">
              Professional Solana <span className="text-[#14F195]">Volume Bot</span> Platform
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Boost your token's visibility and ranking on <span className="font-bold text-[#9945FF]">DEXScreener</span>, <span className="font-bold text-[#14F195]">Pump.Fun</span>, and <span className="font-bold text-[#03E1FF]">DEXTools</span> through strategic volume distribution and natural transaction patterns
            </p>
            
            <div className="bg-[#0c0c15]/80 backdrop-blur-md rounded-xl p-5 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-r from-[#9945FF] to-[#14F195] p-2 rounded-lg">
                  <Zap size={24} className="text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white">Strategic Solana Token Volume Bot</h3>
              </div>
              <p className="text-gray-300 ml-12">
                Enhance token visibility through strategic volume generation with compliant, natural-looking transaction patterns
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <div className="flex justify-center max-w-xl w-full mx-auto">
                <CtaButton 
                  size="lg" 
                  className="cyberpunk-btn bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black font-semibold text-lg px-10 py-6 relative z-20 w-full"
                  icon={<ArrowRight className="ml-2 h-5 w-5" />}
                  aria-label="Start using Solana Volume Bot to enhance token visibility"
                >
                  Boost Token Visibility
                </CtaButton>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-6 text-gray-400">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm sm:text-base">Strategic volume distribution</span>
              </div>
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm sm:text-base">Natural transaction patterns</span>
              </div>
            </div>
            
            {/* Security features section */}
            <div className="mt-10 max-w-2xl mx-auto bg-gradient-to-r from-[#0f0f1a]/60 to-[#131325]/60 backdrop-blur-sm p-6 rounded-xl border border-[#9945FF]/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-[#9945FF] text-xl">🔐</span>
                  <span className="text-white">No private key</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#14F195] text-xl">🔗</span>
                  <span className="text-white">No wallet connection</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#03E1FF] text-xl">🛡️</span>
                  <span className="text-white">No password required</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <span className="text-white">Simply enter token address</span>
                </div>
              </div>
              <p className="text-center text-gray-300 text-sm mt-2">
                Enter your token address to start boosting your token's visibility through strategic volume distribution
              </p>
            </div>
          </motion.div>
          

        </div>
      </div>
      
      {/* Volume Increase removed - per user request */}
      

      
      {/* "24/7 Monitoring" text removed - per user request */}
      

    </section>
  );
}