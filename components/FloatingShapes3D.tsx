import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ShapeProps {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
}

const FloatingCube: React.FC<ShapeProps> = ({ position, color, speed = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshWobbleMaterial
          color={color}
          factor={0.3}
          speed={2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

const FloatingSphere: React.FC<ShapeProps> = ({ position, color, distort = 0.4 }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
};

const FloatingTorus: React.FC<ShapeProps> = ({ position, color, speed = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.6, 0.25, 16, 32]} />
        <MeshWobbleMaterial
          color={color}
          factor={0.4}
          speed={1.5}
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
};

const FloatingOctahedron: React.FC<ShapeProps> = ({ position, color, speed = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.25 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.35 * speed;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.7]} />
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

const FloatingIcosahedron: React.FC<ShapeProps> = ({ position, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.8} floatIntensity={2.2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.65]} />
        <MeshWobbleMaterial
          color={color}
          factor={0.25}
          speed={2.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
};

const Scene: React.FC = () => {
  const colors = useMemo(() => ({
    purple: '#8b5cf6',
    violet: '#a78bfa',
    pink: '#ec4899',
    blue: '#3b82f6',
    cyan: '#06b6d4',
    indigo: '#6366f1',
  }), []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />

      {/* Main shapes */}
      <FloatingSphere position={[-3, 1.5, -2]} color={colors.purple} distort={0.5} />
      <FloatingCube position={[3, -1, -1]} color={colors.violet} speed={0.8} />
      <FloatingTorus position={[-2, -1.5, 0]} color={colors.pink} speed={1.2} />
      <FloatingOctahedron position={[2.5, 2, -1.5]} color={colors.blue} speed={0.9} />
      <FloatingIcosahedron position={[0, 0, -2]} color={colors.indigo} />

      {/* Background shapes */}
      <FloatingSphere position={[-4, 0, -4]} color={colors.cyan} distort={0.3} />
      <FloatingCube position={[4, 1, -3]} color={colors.purple} speed={0.6} />
      <FloatingTorus position={[1, -2, -2]} color={colors.violet} speed={0.7} />
    </>
  );
};

interface FloatingShapes3DProps {
  className?: string;
}

export const FloatingShapes3D: React.FC<FloatingShapes3DProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
