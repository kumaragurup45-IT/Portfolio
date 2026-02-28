import React, { useRef, useMemo, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Sphere, Float, Stars, PerspectiveCamera, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Globe Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const bgLightRef = useRef<THREE.PointLight>(null);

  // Load textures using useTexture for better stability and reliability
  const textures = useTexture({
    map: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r154/examples/textures/planets/earth_atmos_2048.jpg',
    normalMap: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r154/examples/textures/planets/earth_normal_2048.jpg',
    specularMap: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r154/examples/textures/planets/earth_specular_2048.jpg',
    // Using a more reliable cloud texture or a fallback if needed
    cloudsMap: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png',
  });

  useFrame(({ mouse, clock }) => {
    const elapsedTime = clock.getElapsedTime();
    
    if (earthRef.current) {
      earthRef.current.rotation.y = elapsedTime / 10;
      // Subtle parallax
      earthRef.current.rotation.x = THREE.MathUtils.lerp(earthRef.current.rotation.x, mouse.y * 0.1, 0.05);
      earthRef.current.rotation.z = THREE.MathUtils.lerp(earthRef.current.rotation.z, -mouse.x * 0.1, 0.05);
    }
    
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = elapsedTime / 8;
    }

    // Dynamic light effect - rotating around the earth
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(elapsedTime * 0.5) * 4;
      lightRef.current.position.z = Math.cos(elapsedTime * 0.5) * 4;
      lightRef.current.position.y = Math.sin(elapsedTime * 0.3) * 2;
    }

    // Background light loop mode - pulsing intensity
    if (bgLightRef.current) {
      bgLightRef.current.intensity = 1.5 + Math.sin(elapsedTime * 0.8) * 0.5;
    }
  });

  return (
    <>
      {/* Sun Light - Stronger and more directional for cinematic look */}
      <directionalLight position={[5, 3, 5]} intensity={3.5} color="#ffffff" />
      {/* Ambient Light - Lowered for deeper shadows */}
      <ambientLight intensity={0.1} />
      {/* Rim Light - To highlight the edges like in the video */}
      <pointLight position={[-5, 0, -5]} intensity={2} color="#44aaff" />
      
      {/* Dynamic Moving Light Effect */}
      <pointLight ref={lightRef} intensity={3} color="#00f5ff" distance={10} />

      {/* Background Light Loop */}
      <pointLight ref={bgLightRef} position={[0, 0, -10]} intensity={2} color="#8b5cf6" distance={20} />
      
      <group scale={1.4} position={[0, 0, 0]} rotation={[0.41, 0, 0]}>
        {/* Main Earth Body */}
        <Sphere ref={earthRef} args={[1, 64, 64]}>
          <meshPhongMaterial
            map={textures.map}
            normalMap={textures.normalMap}
            specularMap={textures.specularMap}
            shininess={10}
            specular={new THREE.Color('#333333')}
          />
        </Sphere>

        {/* Cloud Layer - More subtle */}
        <Sphere ref={cloudsRef} args={[1.01, 64, 64]}>
          <meshPhongMaterial
            map={textures.cloudsMap}
            transparent
            opacity={0.3}
            depthWrite={false}
          />
        </Sphere>

        {/* Atmospheric Glow - Refined for a 'perfect' look */}
        <Sphere args={[1.04, 64, 64]}>
          <meshBasicMaterial
            color="#00f5ff"
            transparent
            opacity={0.05}
            side={THREE.BackSide}
          />
        </Sphere>
      </group>
    </>
  );
};

export const Globe = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Background Light Loop Mode - Pulsing Glow */}
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,transparent_70%)] pointer-events-none"
      />

      <ErrorBoundary fallback={<div className="fixed inset-0 bg-bg-dark" />}>
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
          <color attach="background" args={['#020205']} />
          <Stars radius={300} depth={60} count={10000} factor={4} saturation={0} fade speed={0.5} />
          <React.Suspense fallback={null}>
            <group position={[0, 0, 0]}>
              <Earth />
            </group>
          </React.Suspense>
        </Canvas>
      </ErrorBoundary>
      {/* Overlays for depth and legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/40 via-transparent to-bg-dark/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,15,26,0.4)_100%)] pointer-events-none" />
    </div>
  );
};
