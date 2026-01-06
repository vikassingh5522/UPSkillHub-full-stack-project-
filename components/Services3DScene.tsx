import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Floating Gear - represents services/tools
const FloatingGear: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={groupRef} position={position}>
        {/* Gear body */}
        <mesh>
          <torusGeometry args={[0.5, 0.15, 16, 32]} />
          <MeshDistortMaterial color={color} distort={0.2} speed={2} />
        </mesh>
        {/* Gear teeth */}
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[
            Math.cos((i * Math.PI * 2) / 8) * 0.6,
            Math.sin((i * Math.PI * 2) / 8) * 0.6,
            0
          ]}>
            <boxGeometry args={[0.15, 0.15, 0.15]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// Floating Code Block - represents development
const FloatingCodeBlock: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1.5, 1, 0.1]} />
        <MeshWobbleMaterial color="#3b82f6" factor={0.1} speed={1} />
      </mesh>
      {/* Code lines */}
      {[0.3, 0.1, -0.1, -0.3].map((y, i) => (
        <mesh key={i} position={[position[0] - 0.3 + i * 0.1, position[1] + y, position[2] + 0.06]}>
          <boxGeometry args={[0.8 - i * 0.15, 0.05, 0.02]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#60a5fa" : "#a78bfa"} />
        </mesh>
      ))}
    </Float>
  );
};

// Floating Rocket - represents growth/progress
const FloatingRocket: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Rocket body */}
      <mesh>
        <coneGeometry args={[0.3, 1, 32]} />
        <MeshDistortMaterial color="#8b5cf6" distort={0.1} speed={2} />
      </mesh>
      {/* Rocket base */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.3, 0.25, 0.3, 32]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
      {/* Flames */}
      <mesh position={[0, -0.9, 0]}>
        <coneGeometry args={[0.2, 0.4, 16]} />
        <MeshDistortMaterial color="#f97316" distort={0.5} speed={5} transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

// Floating Network Nodes - represents connectivity
const FloatingNetwork: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const nodePositions: [number, number, number][] = [
    [0, 0, 0],
    [0.8, 0.5, 0],
    [-0.8, 0.5, 0],
    [0.5, -0.7, 0.3],
    [-0.5, -0.7, -0.3],
  ];

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
      <group ref={groupRef} position={position}>
        {/* Nodes */}
        {nodePositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <MeshDistortMaterial
              color={i === 0 ? "#8b5cf6" : "#60a5fa"}
              distort={0.2}
              speed={2}
            />
          </mesh>
        ))}
        {/* Connections */}
        {nodePositions.slice(1).map((pos, i) => (
          <mesh key={`line-${i}`} position={[pos[0] / 2, pos[1] / 2, pos[2] / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.9, 8]} />
            <meshStandardMaterial color="#a78bfa" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// Floating Shield - represents security/protection
const FloatingShield: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.6]} />
        <MeshDistortMaterial
          color="#10b981"
          distort={0.3}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
};

// Floating Lightbulb - represents ideas/innovation
const FloatingLightbulb: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Bulb */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <MeshDistortMaterial color="#fbbf24" distort={0.2} speed={3} transparent opacity={0.9} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.3, 16]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      {/* Glow effect */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#fef3c7" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

// Hero Scene for Services page
const ServicesHeroScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[10, -10, 5]} intensity={0.3} color="#3b82f6" />

      <FloatingGear position={[0, 0, 0]} color="#8b5cf6" />
      <FloatingRocket position={[3, 1, -2]} />
      <FloatingNetwork position={[-3, 0, -1]} />
      <FloatingLightbulb position={[2.5, -1.5, 1]} />
      <FloatingShield position={[-2.5, 1.5, -1]} />
    </>
  );
};

// Features Scene
const FeaturesScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#8b5cf6" />

      <FloatingCodeBlock position={[0, 0, 0]} />
      <FloatingGear position={[-2, 1, -1]} color="#3b82f6" />
      <FloatingGear position={[2, -1, -1]} color="#ec4899" />
    </>
  );
};

// Process Scene
const ProcessScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      <FloatingRocket position={[0, 0, 0]} />
      <FloatingLightbulb position={[-2, 0, -1]} />
      <FloatingShield position={[2, 0, -1]} />
    </>
  );
};

interface Services3DSceneProps {
  variant: 'hero' | 'features' | 'process';
  className?: string;
}

export const Services3DScene: React.FC<Services3DSceneProps> = ({ variant, className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        {variant === 'hero' && <ServicesHeroScene />}
        {variant === 'features' && <FeaturesScene />}
        {variant === 'process' && <ProcessScene />}
      </Canvas>
    </div>
  );
};
