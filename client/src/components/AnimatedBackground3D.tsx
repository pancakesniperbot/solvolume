import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

// Particle system component
function ParticleSystem({ count = 500, color = '#ffffff' }) {
  const particles = useRef<THREE.Points>(null);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  
  // Create random particles
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 10;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;
    
    const color = new THREE.Color(Math.random() < 0.5 ? '#9945FF' : Math.random() < 0.5 ? '#14F195' : '#03E1FF');
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
    
    sizes[i] = Math.random() * 0.1 + 0.05;
  }
  
  // Animation
  useFrame(({ clock }) => {
    if (!particles.current) return;
    particles.current.rotation.y = clock.getElapsedTime() * 0.05;
    particles.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
  });
  
  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Scene camera setup
function SceneSetup() {
  const { camera } = useThree();
  
  camera.position.z = 5;
  
  return null;
}

// AnimatedBackground3D component
export default function AnimatedBackground3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-70">
      <Canvas dpr={[1, 2]} style={{ background: 'transparent' }}>
        <Suspense fallback={null}>
          <SceneSetup />
          <ambientLight intensity={0.5} />
          <ParticleSystem count={300} />
        </Suspense>
      </Canvas>
    </div>
  );
} 