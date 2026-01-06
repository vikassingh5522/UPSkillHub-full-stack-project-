import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Floating Book - represents knowledge/learning
const FloatingBook: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={groupRef} position={position}>
        {/* Book cover */}
        <mesh>
          <boxGeometry args={[1, 1.3, 0.15]} />
          <MeshWobbleMaterial color={color} factor={0.1} speed={1} />
        </mesh>
        {/* Book pages */}
        <mesh position={[0.02, 0, 0]}>
          <boxGeometry args={[0.9, 1.2, 0.12]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
        {/* Spine */}
        <mesh position={[-0.52, 0, 0]}>
          <boxGeometry args={[0.05, 1.3, 0.15]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </group>
    </Float>
  );
};

// Floating Video Play Button - represents video content
const FloatingVideoIcon: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1.5}>
      <group position={position}>
        {/* Circle background */}
        <mesh ref={meshRef}>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
          <MeshDistortMaterial color="#ef4444" distort={0.2} speed={2} />
        </mesh>
        {/* Play triangle */}
        <mesh position={[0.05, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.25, 0.4, 3]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </Float>
  );
};

// Floating Document/File - represents downloadable resources
const FloatingDocument: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={groupRef} position={position}>
        {/* Document body */}
        <mesh>
          <boxGeometry args={[0.8, 1.1, 0.05]} />
          <MeshWobbleMaterial color="#3b82f6" factor={0.05} speed={1} />
        </mesh>
        {/* Document lines */}
        {[0.35, 0.15, -0.05, -0.25].map((y, i) => (
          <mesh key={i} position={[0, y, 0.03]}>
            <boxGeometry args={[0.5 - i * 0.05, 0.04, 0.01]} />
            <meshStandardMaterial color="#93c5fd" />
          </mesh>
        ))}
        {/* Folded corner */}
        <mesh position={[0.3, 0.45, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.05]} />
          <meshStandardMaterial color="#60a5fa" />
        </mesh>
      </group>
    </Float>
  );
};

// Floating Globe/World - represents global resources
const FloatingGlobe: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          distort={0.2}
          speed={2}
          transparent
          opacity={0.8}
          wireframe
        />
      </mesh>
      {/* Inner sphere */}
      <mesh position={position}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <MeshDistortMaterial
          color="#a78bfa"
          distort={0.1}
          speed={1.5}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
};

// Floating Code Brackets - represents coding resources
const FloatingCodeBrackets: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group ref={groupRef} position={position}>
        {/* Left bracket < */}
        <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.6, 0.1, 0.1]} />
          <MeshDistortMaterial color="#10b981" distort={0.2} speed={2} />
        </mesh>
        <mesh position={[-0.4, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.6, 0.1, 0.1]} />
          <MeshDistortMaterial color="#10b981" distort={0.2} speed={2} />
        </mesh>
        {/* Right bracket > */}
        <mesh position={[0.4, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.6, 0.1, 0.1]} />
          <MeshDistortMaterial color="#10b981" distort={0.2} speed={2} />
        </mesh>
        <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.6, 0.1, 0.1]} />
          <MeshDistortMaterial color="#10b981" distort={0.2} speed={2} />
        </mesh>
        {/* Slash / */}
        <mesh rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.08, 0.8, 0.08]} />
          <meshStandardMaterial color="#34d399" />
        </mesh>
      </group>
    </Float>
  );
};

// Floating Download Arrow - represents downloadable content
const FloatingDownload: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Arrow body */}
      <mesh>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <MeshDistortMaterial color="#f59e0b" distort={0.1} speed={2} />
      </mesh>
      {/* Arrow head */}
      <mesh position={[0, -0.35, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.25, 0.3, 4]} />
        <MeshDistortMaterial color="#f59e0b" distort={0.1} speed={2} />
      </mesh>
      {/* Base line */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.08]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
    </group>
  );
};

// Hero Scene for Resources page
const ResourcesHeroScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[10, -10, 5]} intensity={0.3} color="#3b82f6" />

      <FloatingBook position={[0, 0, 0]} color="#8b5cf6" />
      <FloatingVideoIcon position={[3, 1, -2]} />
      <FloatingDocument position={[-3, 0.5, -1]} />
      <FloatingGlobe position={[2.5, -1, 1]} />
      <FloatingCodeBrackets position={[-2.5, -1.5, 0]} />
      <FloatingDownload position={[0, 2, -2]} />
    </>
  );
};

// Videos Scene
const VideosScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#ef4444" />

      <FloatingVideoIcon position={[0, 0, 0]} />
      <FloatingBook position={[-2, 0.5, -1]} color="#3b82f6" />
      <FloatingBook position={[2, -0.5, -1]} color="#8b5cf6" />
    </>
  );
};

// Downloads Scene
const DownloadsScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      <FloatingDocument position={[0, 0, 0]} />
      <FloatingDownload position={[-1.5, 0, -1]} />
      <FloatingCodeBrackets position={[1.5, 0, -1]} />
    </>
  );
};

interface Resources3DSceneProps {
  variant: 'hero' | 'videos' | 'downloads';
  className?: string;
}

export const Resources3DScene: React.FC<Resources3DSceneProps> = ({ variant, className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        {variant === 'hero' && <ResourcesHeroScene />}
        {variant === 'videos' && <VideosScene />}
        {variant === 'downloads' && <DownloadsScene />}
      </Canvas>
    </div>
  );
};
