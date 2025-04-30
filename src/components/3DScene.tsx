import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, useTexture, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion-3d';

interface CoinData {
  symbol: string;
  price: number;
  volume24h: number;
  change24h: number;
}

interface TokenBubbleProps {
  position: [number, number, number];
  data: CoinData;
  index: number;
}

const TokenBubble: React.FC<TokenBubbleProps> = ({ position, data, index }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1;
    }
  });

  return (
    <motion.mesh
      ref={meshRef}
      position={position}
      scale={hovered ? 1.2 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      animate={{
        scale: hovered ? 1.2 : 1,
        transition: { duration: 0.2 }
      }}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={data.change24h >= 0 ? '#4ade80' : '#f87171'} />
      <Text
        position={[0, 0, 0.6]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {data.symbol}
      </Text>
    </motion.mesh>
  );
};

interface SolanaRingProps {
  radius: number;
  segments: number;
}

const SolanaRing: React.FC<SolanaRingProps> = ({ radius, segments }) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.1, 16, segments]} />
      <meshStandardMaterial color="#9945FF" emissive="#9945FF" emissiveIntensity={0.5} />
    </mesh>
  );
};

interface ParticleFieldProps {
  count: number;
  radius: number;
}

const ParticleField: React.FC<ParticleFieldProps> = ({ count, radius }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const [particles] = useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.random();
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  });

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#9945FF" transparent opacity={0.6} />
    </points>
  );
};

interface CameraControllerProps {
  target: [number, number, number];
}

const CameraController: React.FC<CameraControllerProps> = ({ target }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 5, 10);
    camera.lookAt(...target);
  }, [camera, target]);

  return null;
};

interface ThreeDSceneProps {
  coinData: CoinData[];
}

const ThreeDScene: React.FC<ThreeDSceneProps> = ({ coinData }) => {
  return (
    <Canvas
      camera={{ position: [0, 5, 10], fov: 75 }}
      style={{ width: '100%', height: '100vh' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <CameraController target={[0, 0, 0]} />
      
      <SolanaRing radius={5} segments={64} />
      <ParticleField count={1000} radius={8} />
      
      {coinData.map((coin, index) => {
        const angle = (index / coinData.length) * Math.PI * 2;
        const radius = 5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <TokenBubble
            key={coin.symbol}
            position={[x, 0, z]}
            data={coin}
            index={index}
          />
        );
      })}
    </Canvas>
  );
};

export { ThreeDScene }; 