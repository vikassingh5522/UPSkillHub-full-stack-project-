import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Box, Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

// Floating Globe - represents global learning
const FloatingGlobe: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          distort={0.3}
          speed={2}
          transparent
          opacity={0.8}
          wireframe
        />
      </mesh>
      {/* Inner solid sphere */}
      <mesh position={position}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <MeshDistortMaterial
          color="#a78bfa"
          distort={0.2}
          speed={1.5}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
};

// Floating Books Stack - represents knowledge
const FloatingBooks: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group ref={groupRef} position={position}>
        {/* Book 1 */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.2, 0.15, 0.9]} />
          <MeshWobbleMaterial color="#3b82f6" factor={0.1} speed={1} />
        </mesh>
        {/* Book 2 */}
        <mesh position={[0.05, 0.2, -0.05]} rotation={[0, 0.1, 0]}>
          <boxGeometry args={[1.1, 0.12, 0.85]} />
          <MeshWobbleMaterial color="#8b5cf6" factor={0.1} speed={1} />
        </mesh>
        {/* Book 3 */}
        <mesh position={[-0.03, 0.38, 0.02]} rotation={[0, -0.05, 0]}>
          <boxGeometry args={[1.15, 0.14, 0.88]} />
          <MeshWobbleMaterial color="#ec4899" factor={0.1} speed={1} />
        </mesh>
      </group>
    </Float>
  );
};

// Floating Graduation Cap
const FloatingCap: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Cap top */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1, 0.08, 1]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      {/* Cap base */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.3, 32]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      {/* Tassel */}
      <mesh position={[0.4, 0.1, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
    </group>
  );
};

// Floating Atoms - represents technology/science
const FloatingAtom: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ring1Ref.current) ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.8;
    if (ring2Ref.current) ring2Ref.current.rotation.x = state.clock.elapsedTime * 0.6;
    if (ring3Ref.current) ring3Ref.current.rotation.y = state.clock.elapsedTime * 0.7;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={groupRef} position={position}>
        {/* Nucleus */}
        <mesh>
          <sphereGeometry args={[0.2, 32, 32]} />
          <MeshDistortMaterial color="#8b5cf6" distort={0.3} speed={2} />
        </mesh>
        {/* Electron rings */}
        <mesh ref={ring1Ref} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.6, 0.02, 16, 100]} />
          <meshStandardMaterial color="#60a5fa" transparent opacity={0.8} />
        </mesh>
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.6, 0.02, 16, 100]} />
          <meshStandardMaterial color="#a78bfa" transparent opacity={0.8} />
        </mesh>
        <mesh ref={ring3Ref} rotation={[0, Math.PI / 3, Math.PI / 6]}>
          <torusGeometry args={[0.6, 0.02, 16, 100]} />
          <meshStandardMaterial color="#f472b6" transparent opacity={0.8} />
        </mesh>
      </group>
    </Float>
  );
};

// Abstract geometric shapes
const FloatingGeometry: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.5]} />
        <MeshDistortMaterial
          color={color}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
};

// Hero Scene for About page
const AboutHeroScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[10, -10, 5]} intensity={0.3} color="#ec4899" />

      <FloatingGlobe position={[0, 0, 0]} />
      <FloatingAtom position={[-3, 1, -2]} />
      <FloatingAtom position={[3, -1, -1]} />
      <FloatingGeometry position={[-2.5, -1.5, 1]} color="#3b82f6" />
      <FloatingGeometry position={[2.5, 1.5, -1]} color="#ec4899" />
      <FloatingGeometry position={[0, 2, -2]} color="#10b981" />
    </>
  );
};

// Values Scene
const ValuesScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#8b5cf6" />

      <FloatingBooks position={[0, 0, 0]} />
      <FloatingGeometry position={[-2, 1, -1]} color="#8b5cf6" />
      <FloatingGeometry position={[2, -1, -1]} color="#3b82f6" />
    </>
  );
};

// Team Scene
const TeamScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      <FloatingCap position={[0, 0, 0]} />
      <FloatingAtom position={[-2, 0, -1]} />
      <FloatingGeometry position={[2, 0, -1]} color="#fbbf24" />
    </>
  );
};

interface About3DSceneProps {
  variant: 'hero' | 'values' | 'team';
  className?: string;
}

export const About3DScene: React.FC<About3DSceneProps> = ({ variant, className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        {variant === 'hero' && <AboutHeroScene />}
        {variant === 'values' && <ValuesScene />}
        {variant === 'team' && <TeamScene />}
      </Canvas>
    </div>
  );
};
