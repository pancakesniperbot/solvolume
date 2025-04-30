import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Points, Point } from '@react-three/drei';
// Import types from our centralized Three.js file
import { type ThreeObject3D } from '@/lib/three';

// Animated particle system for the background
const ParticleSystem = ({ count = 500, size = 0.03, color = "#14F195" }) => {
  const points = useRef<any>(null!);
  const { viewport } = useThree();
  
  // Create randomized particle positions
  const positions = Array.from({ length: count }, () => {
    return [
      (Math.random() - 0.5) * viewport.width * 2,
      (Math.random() - 0.5) * viewport.height * 2,
      (Math.random() - 0.5) * 10
    ];
  }).flat();
  
  // Animation for particles
  useFrame(({ clock }) => {
    if (!points.current) return;
    
    const t = clock.getElapsedTime() * 0.1;
    const positionArray = points.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Gentle random motion
      positionArray[i3 + 1] += Math.sin(t + i) * 0.01;
      positionArray[i3] += Math.cos(t + i) * 0.01;
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <Points ref={points} limit={count}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(positions)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </Points>
  );
};

// Animated floating Solana logo elements
const SolanaElements = () => {
  const { viewport } = useThree();
  
  return (
    <group>
      {/* Larger central ring */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0, -2]} rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[1.5, 0.05, 16, 100]} />
          <meshBasicMaterial color="#9945FF" transparent opacity={0.7} />
        </mesh>
      </Float>
      
      {/* Smaller ring */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.2}>
        <mesh position={[-2, 1.5, -1]} rotation={[Math.PI / 3, 0, 0]} scale={0.7}>
          <torusGeometry args={[1, 0.05, 16, 50]} />
          <meshBasicMaterial color="#03E1FF" transparent opacity={0.6} />
        </mesh>
      </Float>
      
      {/* Another ring */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.3}>
        <mesh position={[2, -1, -3]} rotation={[0, Math.PI / 5, 0]} scale={0.8}>
          <torusGeometry args={[1.2, 0.07, 16, 70]} />
          <meshBasicMaterial color="#14F195" transparent opacity={0.5} />
        </mesh>
      </Float>
      
      {/* Small light spheres */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Float 
          key={i}
          speed={1 + Math.random()}
          rotationIntensity={0.3}
          floatIntensity={0.5}
          position={[
            (Math.random() - 0.5) * viewport.width * 0.8,
            (Math.random() - 0.5) * viewport.height * 0.8,
            -1 - Math.random() * 3
          ]}
        >
          <mesh scale={0.1 + Math.random() * 0.2}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial 
              color={
                i % 3 === 0 ? "#14F195" : 
                i % 3 === 1 ? "#9945FF" : 
                "#03E1FF"
              } 
              transparent 
              opacity={0.7} 
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

export const ThreeDBackground = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`fixed inset-0 z-0 ${className}`}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleSystem count={300} color="#14F195" size={0.03} />
        <ParticleSystem count={200} color="#9945FF" size={0.02} />
        <ParticleSystem count={100} color="#03E1FF" size={0.025} />
        <SolanaElements />
      </Canvas>
    </div>
  );
};