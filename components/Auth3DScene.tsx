import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Floating Lock - represents security
const FloatingLock: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={groupRef} position={position}>
        {/* Lock body */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[0.6, 0.5, 0.2]} />
          <MeshDistortMaterial color="#8b5cf6" distort={0.15} speed={2} />
        </mesh>
        {/* Lock shackle */}
        <mesh position={[0, 0.25, 0]}>
          <torusGeometry args={[0.2, 0.06, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#a78bfa" />
        </mesh>
        {/* Keyhole */}
        <mesh position={[0, -0.1, 0.11]}>
          <circleGeometry args={[0.08, 16]} />
          <meshStandardMaterial color="#1e1b4b" />
        </mesh>
      </group>
    </Float>
  );
};

// Floating Key - represents access
const FloatingKey: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Key head (circle) */}
      <mesh>
        <torusGeometry args={[0.2, 0.05, 16, 32]} />
        <MeshDistortMaterial color="#fbbf24" distort={0.2} speed={2} />
      </mesh>
      {/* Key shaft */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[0.08, 0.5, 0.04]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      {/* Key teeth */}
      <mesh position={[0.08, -0.55, 0]}>
        <boxGeometry args={[0.1, 0.08, 0.04]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[0.08, -0.45, 0]}>
        <boxGeometry args={[0.08, 0.06, 0.04]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
    </group>
  );
};

// Floating Shield - represents protection
const FloatingShield: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <group position={position}>
        {/* Shield body */}
        <mesh ref={meshRef}>
          <cylinderGeometry args={[0.4, 0.25, 0.1, 6]} />
          <MeshWobbleMaterial color="#10b981" factor={0.1} speed={1} />
        </mesh>
        {/* Shield check mark */}
        <mesh position={[0, 0, 0.06]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.15, 0.04, 0.02]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.08, -0.05, 0.06]} rotation={[0, 0, 0.8]}>
          <boxGeometry args={[0.25, 0.04, 0.02]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </Float>
  );
};

// Floating User Avatar - represents identity
const FloatingAvatar: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={groupRef} position={position}>
        {/* Head */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <MeshDistortMaterial color="#3b82f6" distort={0.1} speed={2} />
        </mesh>
        {/* Body */}
        <mesh position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.2, 0.3, 8, 16]} />
          <MeshDistortMaterial color="#3b82f6" distort={0.15} speed={2} />
        </mesh>
      </group>
    </Float>
  );
};

// Floating Stars - represents achievement
const FloatingStars: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.5}>
      <group ref={groupRef} position={position}>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI * 2) / 3) * 0.3,
              Math.sin((i * Math.PI * 2) / 3) * 0.3,
              0
            ]}
          >
            <octahedronGeometry args={[0.1]} />
            <MeshDistortMaterial
              color={i === 0 ? '#fbbf24' : i === 1 ? '#f59e0b' : '#fcd34d'}
              distort={0.3}
              speed={3}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// Floating Rocket - represents getting started
const FloatingRocket: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Rocket body */}
      <mesh rotation={[0, 0, Math.PI / 6]}>
        <coneGeometry args={[0.15, 0.5, 32]} />
        <MeshDistortMaterial color="#ec4899" distort={0.1} speed={2} />
      </mesh>
      {/* Rocket base */}
      <mesh position={[0.15, -0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.15, 0.12, 0.15, 32]} />
        <meshStandardMaterial color="#db2777" />
      </mesh>
      {/* Flame */}
      <mesh position={[0.25, -0.45, 0]} rotation={[0, 0, Math.PI / 6]}>
        <coneGeometry args={[0.1, 0.2, 16]} />
        <MeshDistortMaterial color="#f97316" distort={0.5} speed={5} transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

// Sign In Scene
const SignInScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#8b5cf6" />

      <FloatingLock position={[0, 0, 0]} />
      <FloatingKey position={[1.5, 0.5, -1]} />
      <FloatingShield position={[-1.5, -0.5, -0.5]} />
      <FloatingStars position={[0, 1.5, -1]} />
    </>
  );
};

// Sign Up Scene
const SignUpScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#3b82f6" />

      <FloatingAvatar position={[0, 0, 0]} />
      <FloatingRocket position={[1.5, 0.5, -1]} />
      <FloatingShield position={[-1.5, 0, -0.5]} />
      <FloatingStars position={[0, 1.5, -1]} />
      <FloatingKey position={[-0.8, -1, -0.5]} />
    </>
  );
};

interface Auth3DSceneProps {
  variant: 'signin' | 'signup';
  className?: string;
}

export const Auth3DScene: React.FC<Auth3DSceneProps> = ({ variant, className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        {variant === 'signin' && <SignInScene />}
        {variant === 'signup' && <SignUpScene />}
      </Canvas>
    </div>
  );
};
