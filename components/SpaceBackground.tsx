import React, { useRef, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

interface SpaceBackgroundProps {
  starCount?: number;
  speed?: number;
  depth?: number;
  color?: string;
  backgroundColor?: string;
  style?: React.CSSProperties;
}

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ 
  starCount = 200,
  speed = 0.05,
  depth = 3,
  color = '#ffffff',
  backgroundColor = '#000000',
  style = {} 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let stars: Array<{
      x: number;
      y: number;
      radius: number;
      speed: number;
      opacity: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }> = [];
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Create stars with different layers (parallax effect)
    const createStars = () => {
      if (!canvas) return;
      stars = [];
      for (let i = 0; i < starCount; i++) {
        const layerIndex = Math.floor(Math.random() * depth) + 1;
        const layerSpeed = speed * (layerIndex / depth);
        const layerOpacity = 0.3 + (layerIndex / depth) * 0.7;
        
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: (0.1 + Math.random() * 0.9) * (layerIndex / depth) * 2,
          speed: layerSpeed,
          opacity: layerOpacity,
          twinkleSpeed: 0.001 + Math.random() * 0.005,
          twinklePhase: Math.random() * Math.PI * 2
        });
      }
    };
    
    // Draw stars with twinkling effect
    const drawStars = () => {
      if (!canvas || !ctx) return;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        // Update position
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        // Calculate twinkle effect
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = 0.3 * Math.sin(star.twinklePhase) + 0.7;
        
        // Draw star with opacity variation
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(')', `, ${star.opacity * twinkle})`).replace('rgb', 'rgba');
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(drawStars);
    };
    
    // Handle window resize
    const handleResize = () => {
      setCanvasDimensions();
      createStars();
    };
    
    window.addEventListener('resize', handleResize);
    setCanvasDimensions();
    createStars();
    drawStars();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [starCount, speed, depth, color, backgroundColor]);
  
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={-1}
      sx={style}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

export default SpaceBackground;
