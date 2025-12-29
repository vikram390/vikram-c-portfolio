
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const InteractiveGroup = ({ children }: { children?: React.ReactNode }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation based on time
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
      
      // Smooth lerping for mouse parallax to create depth
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouse.x * 2, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouse.y * 2, 0.05);
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

const FloatingShapes = () => {
  const smallShapes = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 10 - 5
      ] as [number, number, number],
      color: i % 3 === 0 ? "#99f6e4" : i % 3 === 1 ? "#bae6fd" : "#fef08a",
      speed: 0.4 + Math.random() * 0.8,
      scale: 0.1 + Math.random() * 0.3
    }));
  }, []);

  return (
    <InteractiveGroup>
      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.8}>
        <Sphere args={[1.8, 64, 64]} position={[-7, 5, -5]}>
          <MeshDistortMaterial
            color="#99f6e4"
            speed={2}
            distort={0.3}
            radius={1}
            transparent
            opacity={0.4}
          />
        </Sphere>
      </Float>

      <Float speed={1.2} rotationIntensity={1.5} floatIntensity={1.2}>
        <mesh position={[9, -5, -8]}>
          <torusKnotGeometry args={[1.5, 0.5, 128, 16]} />
          <meshStandardMaterial color="#bae6fd" transparent opacity={0.25} wireframe />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh position={[-5, -7, -4]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#fef08a" transparent opacity={0.2} />
        </mesh>
      </Float>

      {smallShapes.map((shape, i) => (
        <Float key={i} speed={shape.speed} rotationIntensity={1.2} floatIntensity={0.8}>
          <mesh position={shape.position} scale={shape.scale}>
            <octahedronGeometry />
            <meshStandardMaterial color={shape.color} transparent opacity={0.25} />
          </mesh>
        </Float>
      ))}
    </InteractiveGroup>
  );
};

const ThreeBackground: React.FC = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 45 }} 
        dpr={[1, 2]} 
        gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[15, 15, 15]} intensity={1.5} />
        <pointLight position={[-15, -15, -15]} intensity={0.5} color="#99f6e4" />
        <FloatingShapes />
        <ContactShadows opacity={0.2} scale={30} blur={2.5} far={15} resolution={256} color="#000000" />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
