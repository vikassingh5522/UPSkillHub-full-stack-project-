import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Floating Envelope - represents messages/contact
const FloatingEnvelope: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={groupRef} position={position}>
        {/* Envelope body */}
        <mesh>
          <boxGeometry args={[1.4, 0.9, 0.1]} />
          <MeshWobbleMaterial color="#8b5cf6" factor={0.1} speed={1} />
        </mesh>
        {/* Envelope flap */}
        <mesh position={[0, 0.35, 0.05]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[1.3, 0.5, 0.05]} />
          <MeshDistortMaterial color="#a78bfa" distort={0.1} speed={2} />
        </mesh>
        {/* Paper inside */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.1, 0.7, 0.05]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
      </group>
    </Float>
  );
};

// Floating Phone - represents call/communication
const FloatingPhone: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.15;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1.5}>
      <group position={position}>
        {/* Phone body */}
        <mesh ref={meshRef}>
          <boxGeometry args={[0.5, 1, 0.08]} />
          <MeshDistortMaterial color="#3b82f6" distort={0.15} speed={2} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0.05, 0.045]}>
          <boxGeometry args={[0.4, 0.75, 0.01]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Camera notch */}
        <mesh position={[0, 0.4, 0.05]}>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>
    </Float>
  );
};

// Floating Chat Bubble - represents messaging
const FloatingChatBubble: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={groupRef} position={position}>
        {/* Bubble body */}
        <mesh>
          <boxGeometry args={[1, 0.6, 0.15]} />
          <MeshWobbleMaterial color={color} factor={0.1} speed={1} />
        </mesh>
        {/* Bubble tail */}
        <mesh position={[-0.4, -0.35, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.2, 0.2, 0.1]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* Message dots */}
        {[-0.25, 0, 0.25].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.08]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// Floating Location Pin - represents location
const FloatingLocationPin: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Pin head */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <MeshDistortMaterial color="#ef4444" distort={0.2} speed={2} />
      </mesh>
      {/* Pin point */}
      <mesh position={[0, -0.25, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.25, 0.5, 32]} />
        <MeshDistortMaterial color="#ef4444" distort={0.1} speed={2} />
      </mesh>
      {/* Inner circle */}
      <mesh position={[0, 0.2, 0.2]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

// Floating At Symbol - represents email
const FloatingAtSymbol: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.4, 0.12, 16, 32]} />
        <MeshDistortMaterial color="#10b981" distort={0.2} speed={2} />
      </mesh>
      {/* Inner element */}
      <mesh position={position}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <MeshDistortMaterial color="#34d399" distort={0.15} speed={2} />
      </mesh>
    </Float>
  );
};

// Floating Heart - represents connection/care
const FloatingHeart: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
      <group ref={groupRef} position={position}>
        {/* Heart shape using spheres */}
        <mesh position={[-0.15, 0.1, 0]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <MeshDistortMaterial color="#ec4899" distort={0.2} speed={2} />
        </mesh>
        <mesh position={[0.15, 0.1, 0]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <MeshDistortMaterial color="#ec4899" distort={0.2} speed={2} />
        </mesh>
        <mesh position={[0, -0.15, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.35, 0.35, 0.25]} />
          <MeshDistortMaterial color="#ec4899" distort={0.15} speed={2} />
        </mesh>
      </group>
    </Float>
  );
};

// Floating Send Icon - represents sending messages
const FloatingSendIcon: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      groupRef.current.rotation.z = -Math.PI / 4 + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1.2}>
      <group ref={groupRef} position={position}>
        {/* Paper plane body */}
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <coneGeometry args={[0.3, 0.8, 3]} />
          <MeshDistortMaterial color="#f59e0b" distort={0.15} speed={2} />
        </mesh>
        {/* Wing detail */}
        <mesh position={[0.1, -0.1, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.4, 0.05, 0.3]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
      </group>
    </Float>
  );
};

// Hero Scene for Contact page
const ContactHeroScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[10, -10, 5]} intensity={0.3} color="#3b82f6" />

      <FloatingEnvelope position={[0, 0.5, 0]} />
      <FloatingPhone position={[3, 0, -2]} />
      <FloatingChatBubble position={[-3, 1, -1]} color="#3b82f6" />
      <FloatingLocationPin position={[2.5, -1.5, 1]} />
      <FloatingAtSymbol position={[-2.5, -1, 0]} />
      <FloatingSendIcon position={[0, 2, -2]} />
    </>
  );
};

// Form Section Scene
const FormScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#8b5cf6" />

      <FloatingEnvelope position={[0, 0, 0]} />
      <FloatingSendIcon position={[-1.5, 0.5, -1]} />
      <FloatingHeart position={[1.5, -0.5, -1]} />
    </>
  );
};

// FAQ Section Scene
const FAQScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      <FloatingChatBubble position={[0, 0, 0]} color="#8b5cf6" />
      <FloatingChatBubble position={[-1.5, 0.5, -1]} color="#3b82f6" />
      <FloatingChatBubble position={[1.5, -0.5, -1]} color="#10b981" />
    </>
  );
};

interface Contact3DSceneProps {
  variant: 'hero' | 'form' | 'faq';
  className?: string;
}

export const Contact3DScene: React.FC<Contact3DSceneProps> = ({ variant, className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        {variant === 'hero' && <ContactHeroScene />}
        {variant === 'form' && <FormScene />}
        {variant === 'faq' && <FAQScene />}
      </Canvas>
    </div>
  );
};
