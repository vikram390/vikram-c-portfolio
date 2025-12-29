
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const Group = 'group' as any;
const Mesh = 'mesh' as any;
const TorusKnotGeometry = 'torusKnotGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const BoxGeometry = 'boxGeometry' as any;
const OctahedronGeometry = 'octahedronGeometry' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;

const InteractiveGroup = ({ children }: { children?: React.ReactNode }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (groupRef.current) {
      // Very gentle rotation
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      
      // Smooth lerping for mouse parallax to avoid jitter
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouse.x * 1.5, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouse.y * 1.5, 0.05);
    }
  });

  return <Group ref={groupRef}>{children}</Group>;
};

const FloatingShapes = () => {
  const smallShapes = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 8 - 4
      ] as [number, number, number],
      color: i % 2 === 0 ? "#99f6e4" : "#bae6fd",
      speed: 0.5 + Math.random() * 1,
      scale: 0.15 + Math.random() * 0.2
    }));
  }, []);

  return (
    <InteractiveGroup>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1.5, 32, 32]} position={[-6, 4, -8]}>
          <MeshDistortMaterial
            color="#99f6e4"
            speed={1}
            distort={0.2}
            radius={1}
            transparent
            opacity={0.3}
          />
        </Sphere>
      </Float>

      <Float speed={1} rotationIntensity={1} floatIntensity={1}>
        <Mesh position={[8, -4, -10]}>
          <TorusKnotGeometry args={[1.2, 0.4, 64, 8]} />
          <MeshStandardMaterial color="#bae6fd" transparent opacity={0.2} wireframe />
        </Mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
        <Mesh position={[-4, -6, -6]}>
          <BoxGeometry args={[1.5, 1.5, 1.5]} />
          <MeshStandardMaterial color="#fef08a" transparent opacity={0.15} />
        </Mesh>
      </Float>

      {smallShapes.map((shape, i) => (
        <Float key={i} speed={shape.speed} rotationIntensity={1} floatIntensity={0.5}>
          <Mesh position={shape.position} scale={shape.scale}>
            <OctahedronGeometry />
            <MeshStandardMaterial color={shape.color} transparent opacity={0.2} />
          </Mesh>
        </Float>
      ))}
    </InteractiveGroup>
  );
};

const ThreeBackground: React.FC = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 50 }} 
        dpr={[1, 1.5]} // Optimized DPR for performance
        gl={{ powerPreference: 'high-performance', antialias: false }} // Performance-oriented GL settings
      >
        <AmbientLight intensity={0.5} />
        <PointLight position={[10, 10, 10]} intensity={1} />
        <PointLight position={[-10, -10, -10]} intensity={0.3} color="#99f6e4" />
        <FloatingShapes />
        <ContactShadows opacity={0.15} scale={20} blur={3} far={10} resolution={128} color="#000000" />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
