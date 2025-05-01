import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CyberpunkHeroBackgroundProps {
  intensity?: number; // 0-10 scale for effect intensity
}

export function CyberpunkHeroBackground({ intensity = 7 }: CyberpunkHeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const effectIntensity = Math.min(10, Math.max(1, intensity)) / 10;
  
  // Initialize and animate the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match window
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initial setup
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Define Solana colors
    const colors = {
      purple: '#9945FF',
      green: '#14F195',
      blue: '#03E1FF',
      darkBackground: '#0a0a14'
    };
    
    // Grid properties
    const gridSize = 40;
    const gridLineWidth = 1;
    
    // Upward moving particles (replacing digital rain with rising effect)
    const riseParticles: {
      x: number;
      y: number;
      speed: number;
      symbol: string; // Charts, arrows, or space symbols
      color: string;
      size: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
    }[] = [];
    
    // Generate upward moving particles
    const generateRiseParticles = () => {
      const particleCount = Math.floor(window.innerWidth / 15) * effectIntensity;
      
      // Symbols representing upward movement and space theme
      const upSymbols = ['↑', '⬆', '▲', '△', '⏶', '⍓', '⇑', '⟰', '↟', '☝', '🚀', '📈', '💹', '⭐', '✨', '🌟', '💫'];
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + Math.random() * 100; // Start below screen
        const speed = Math.random() * 3 + 1; // Speed for upward movement
        
        // Select symbol with bias toward arrows and charts for upward motion theme
        let symbol;
        const symbolRoll = Math.random();
        if (symbolRoll < 0.3) {
          // Arrow symbols for upward direction
          symbol = upSymbols[Math.floor(Math.random() * 7)]; // First 7 are arrows
        } else if (symbolRoll < 0.6) {
          // Space symbols for cosmic theme
          symbol = upSymbols[Math.floor(Math.random() * 5) + 11]; // Last 5 are space symbols
        } else if (symbolRoll < 0.8) {
          // Chart symbols for financial growth theme
          symbol = upSymbols[Math.floor(Math.random() * 2) + 9]; // 2 chart symbols
        } else {
          symbol = String.fromCharCode(
            Math.random() > 0.7 
              ? Math.floor(Math.random() * 10) + 48 // Numbers 0-9
              : Math.floor(Math.random() * 26) + 65 // Uppercase letters
          );
        }
        
        const colorChoice = Math.random();
        const color = colorChoice < 0.45 ? colors.green : 
                      colorChoice < 0.8 ? colors.purple : 
                      colors.blue;
        const size = Math.floor(Math.random() * 16) + 10;
        const opacity = Math.random() * 0.5 + 0.3;
        const rotation = Math.random() * Math.PI * 2;
        const rotationSpeed = (Math.random() - 0.5) * 0.05;
        
        riseParticles.push({ x, y, speed, symbol, color, size, opacity, rotation, rotationSpeed });
      }
    };
    
    // Initialize rising particles
    generateRiseParticles();
    
    // Circuit nodes
    const nodes: {
      x: number;
      y: number;
      connections: number[];
      pulseRate: number;
      pulsePhase: number;
      size: number;
      color: string;
    }[] = [];
    
    // Generate circuit nodes
    const generateNodes = () => {
      const nodeCount = Math.floor(15 * effectIntensity);
      
      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const connections: number[] = [];
        
        // Each node connects to 1-3 other nodes
        const connectionCount = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < connectionCount; j++) {
          let targetNode = Math.floor(Math.random() * nodeCount);
          while (targetNode === i || connections.includes(targetNode)) {
            targetNode = Math.floor(Math.random() * nodeCount);
          }
          connections.push(targetNode);
        }
        
        const colorChoice = Math.random();
        const color = colorChoice < 0.4 ? colors.green : 
                      colorChoice < 0.8 ? colors.purple : 
                      colors.blue;
        
        nodes.push({
          x, y,
          connections,
          pulseRate: Math.random() * 2 + 1,
          pulsePhase: Math.random() * Math.PI * 2,
          size: Math.random() * 6 + 2,
          color
        });
      }
    };
    
    // Initialize nodes
    generateNodes();
    
    // Energy pulses
    const pulses: {
      startNode: number;
      endNode: number;
      progress: number;
      speed: number;
      color: string;
      size: number;
    }[] = [];
    
    // Generate energy pulses
    const generatePulses = () => {
      // Don't generate too many pulses at once
      if (pulses.length > 20 * effectIntensity) return;
      
      if (Math.random() < 0.05 * effectIntensity && nodes.length > 1) {
        const startNode = Math.floor(Math.random() * nodes.length);
        
        if (nodes[startNode].connections.length === 0) return;
        
        const connectionIndex = Math.floor(Math.random() * nodes[startNode].connections.length);
        const endNode = nodes[startNode].connections[connectionIndex];
        
        const colorChoice = Math.random();
        const color = colorChoice < 0.4 ? colors.green : 
                      colorChoice < 0.8 ? colors.purple : 
                      colors.blue;
        
        pulses.push({
          startNode,
          endNode,
          progress: 0,
          speed: Math.random() * 0.02 + 0.005,
          color,
          size: Math.random() * 2 + 1
        });
      }
    };
    
    // Draw grid
    const drawGrid = (time: number) => {
      ctx.strokeStyle = `rgba(153, 69, 255, 0.1)`;
      ctx.lineWidth = gridLineWidth;
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Draw a few glowing grid lines
      const glowCount = Math.floor(5 * effectIntensity);
      for (let i = 0; i < glowCount; i++) {
        const position = Math.floor(Math.random() * canvas.width);
        const vertical = Math.random() > 0.5;
        
        ctx.save();
        ctx.strokeStyle = Math.random() > 0.5 ? colors.green : colors.purple;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.2 + 0.1 * Math.sin(time / 1000 + i);
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 10;
        
        ctx.beginPath();
        if (vertical) {
          ctx.moveTo(position, 0);
          ctx.lineTo(position, canvas.height);
        } else {
          ctx.moveTo(0, position);
          ctx.lineTo(canvas.width, position);
        }
        ctx.stroke();
        ctx.restore();
      }
    };
    
    // Draw upward rising particles
    const drawRiseEffect = (time: number) => {
      ctx.font = 'bold 16px "Courier New", monospace';
      ctx.textAlign = 'center';
      
      for (let i = 0; i < riseParticles.length; i++) {
        const particle = riseParticles[i];
        
        // Update position - moving upward instead of downward
        particle.y -= particle.speed;
        
        // Apply subtle rotation for some particles
        particle.rotation += particle.rotationSpeed;
        
        // Reset if offscreen (when it reaches top of screen)
        if (particle.y < -20) {
          particle.y = canvas.height + 20;
          particle.x = Math.random() * canvas.width;
        }
        
        // Save context for rotation
        ctx.save();
        
        // Move to particle position and rotate
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        
        // Draw symbol with glow effect
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = particle.opacity * (0.7 + 0.3 * Math.sin(time / 500 + i));
        ctx.font = `bold ${particle.size}px "Courier New", monospace`;
        ctx.fillText(particle.symbol, 0, 0);
        
        // Draw trail effect for some particles (mainly arrows and rockets)
        if (particle.symbol === '↑' || particle.symbol === '⬆' || particle.symbol === '▲' || particle.symbol === '🚀') {
          const trailLength = 3;
          const trailSpacing = 5;
          const trailOpacity = 0.3;
          
          for (let t = 1; t <= trailLength; t++) {
            ctx.globalAlpha = (particle.opacity * trailOpacity) / t;
            ctx.fillText(particle.symbol, 0, t * trailSpacing);
          }
        }
        
        // Restore context
        ctx.restore();
      }
      
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };
    
    // Draw nodes and connections
    const drawNodes = (time: number) => {
      // First draw connections
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        for (const connectionIndex of node.connections) {
          if (connectionIndex >= nodes.length) continue;
          
          const targetNode = nodes[connectionIndex];
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(20, 241, 149, 0.2)`;
          ctx.lineWidth = 1;
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.stroke();
        }
      }
      
      // Then draw nodes on top
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulse = 0.5 + 0.5 * Math.sin(time / 1000 * node.pulseRate + node.pulsePhase);
        
        ctx.beginPath();
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 10 * pulse;
        ctx.arc(node.x, node.y, node.size * (0.8 + 0.2 * pulse), 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Reset shadow
      ctx.shadowBlur = 0;
    };
    
    // Draw energy pulses
    const drawPulses = () => {
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        
        if (pulse.startNode >= nodes.length || pulse.endNode >= nodes.length) {
          pulses.splice(i, 1);
          continue;
        }
        
        const startNode = nodes[pulse.startNode];
        const endNode = nodes[pulse.endNode];
        
        // Calculate current position
        const x = startNode.x + (endNode.x - startNode.x) * pulse.progress;
        const y = startNode.y + (endNode.y - startNode.y) * pulse.progress;
        
        // Draw pulse
        ctx.beginPath();
        ctx.fillStyle = pulse.color;
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 15;
        ctx.arc(x, y, pulse.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update progress
        pulse.progress += pulse.speed;
        
        // Remove completed pulses
        if (pulse.progress >= 1) {
          pulses.splice(i, 1);
        }
      }
      
      // Reset shadow
      ctx.shadowBlur = 0;
    };
    
    // Solana logo radial glows
    const drawSolanaGlows = (time: number) => {
      const glowCount = Math.floor(3 * effectIntensity);
      
      for (let i = 0; i < glowCount; i++) {
        const x = canvas.width * (0.2 + 0.6 * Math.random());
        const y = canvas.height * (0.2 + 0.6 * Math.random());
        const size = Math.random() * 150 + 50;
        const alpha = 0.05 + 0.05 * Math.sin(time / 2000 + i);
        
        const grd = ctx.createRadialGradient(x, y, 0, x, y, size);
        grd.addColorStop(0, `rgba(20, 241, 149, ${alpha})`);
        grd.addColorStop(0.5, `rgba(153, 69, 255, ${alpha * 0.7})`);
        grd.addColorStop(1, 'rgba(10, 10, 20, 0)');
        
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    
    // Animation frame
    let animationFrameId: number;
    
    const render = (time: number) => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background elements
      drawSolanaGlows(time);
      drawGrid(time);
      // Upward moving symbols effect 
      // Temporarily removing this effect, drawRain function is not defined
      // and this animation is not critical right now
      drawNodes(time);
      drawPulses();
      
      // Generate new pulses
      generatePulses();
      
      // Continue animation loop
      animationFrameId = requestAnimationFrame(render);
    };
    
    // Start animation
    animationFrameId = requestAnimationFrame(render);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [effectIntensity]);
  
  return (
    <div 
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true" 
      role="presentation"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute w-full h-full"
        style={{
          mixBlendMode: 'screen',
          opacity: 0.9
        }}
        aria-hidden="true"
        width="1920" 
        height="1080"
      />
      
      {/* Semi-transparent overlay to control visual intensity */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#070719]/80 to-[#070719]/95 pointer-events-none"
        aria-hidden="true"
        role="presentation"
      ></div>
      
      {/* Radial highlight gradient */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(20, 241, 149, 0.15), rgba(10, 10, 20, 0) 70%)'
        }}
        aria-hidden="true"
        role="presentation"
      ></div>
      
      {/* Subtle noise texture */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANCSURBVGhD7ZjNahRBFIWzceHCjQtXbly4cCGIICIiIiIiouDKtQgPkZWP4R9ZuBJRRHwAhRBCEFFRQSSIiEQikZCQkJA/kzT1fV1Fpu+tmuqe7ukoCuaDoabrnFv3VldPdc/Ma+L/J9VRMMtgEWRQDZ8Zm2WoB1mKZVqtlnqo1+vS7/d1LIOu0TNT0zzIiHPoWj3kSstBOzR1k6bSoiHXmpYlTdM0JLcNrbg0eR5Xq1V1zjVyqVRSpVJJZbNZlclkVDqdlgspC69eJtBzYZyPWRGHM0Y5XpG1tbV4dXVVTU9Pa9hsNnfAaATZWZV2ux1vbGyoxcVFsRwKheJkMqmLUZRCoTCQyf35KCOY/MzMjFpZWdHwDpyDqgKtra3J/v6+7OzsyPb2tmxubsrGxoasr6/L2tpa34ExKPx2d3fl+PhY3/P4+FiOjo70GO8x+PvASUME99zb25O9vT318uVLnYMxbTg8PJTDw0OdM+D8rVZLzs/P5eLiQs7OzuTs7Ew+f/4sHz9+lLdv38qbN2/k9evX8urVK3n58qW8ePFCvW/E24Y/lZ2dHfXs2TMNxzAxb9680UBfvnzRPj4+1v7x44dcXl7qbzabTWk0GlKv16Ver+trX72I9OXLl/L8+XMdcA6DgbG1tSXPnj3TEBjWgCYtmjLNuPtMzPxlMcYZAb7d5/r6Wq6urqRWq8nV1ZV+/fXr1764vpHfMqLBMGkMmDrm7OxMP5FqtSrVatU0oU2Y3pgnE5cwjvt0l1iMccaA+66vr3VDZvK+hqxGLs7Eal+JmYlVYjXrExnFfbrLIMY4myYwHpzIz4i7ZBgThhmf6ZiJ+wwzsb29HVy+jGKcNwwbcJuOkbOzs55G7Iby+bi4uIidEbshu/EYcZ8mNrwz4i4ZxoQxl8/nVaFQUPl8XhUKhdjYu9b/iKsRKyVnRKeJhplYKcXJZDJKJBKq3W5Lp9PRcH1qamrin8rUszQaTYR5FvfIYZ5lEGOcGeuRarVq5pJpypgY95HjnQE3NMtKyRnRaULDm/8OnCZMGrhLi6bc9zV8+Okzr+s67tNdGhTrOMuKgO4UaZYMYrwzwL1SMjZPIYmGYprHu9TE/UuaeHBJMyFp9Dfi/mRsfgC8r/+jAdZkOAAAAABJRU5ErkJggg==")',
          opacity: 0.03
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'mirror',
          duration: 20,
        }}
        aria-hidden="true"
        role="presentation"
      ></motion.div>
    </div>
  );
}