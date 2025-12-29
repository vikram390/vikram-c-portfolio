
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
      // Gentle rotation based on time
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
      
      // Smooth lerping for mouse parallax to create depth
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouse.x * 2, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouse.y * 2, 0.05);
    }
  });

  return <Group ref={groupRef}>{children}</Group>;
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
        <Mesh position={[9, -5, -8]}>
          <TorusKnotGeometry args={[1.5, 0.5, 128, 16]} />
          <MeshStandardMaterial color="#bae6fd" transparent opacity={0.25} wireframe />
        </Mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1.5}>
        <Mesh position={[-5, -7, -4]}>
          <BoxGeometry args={[2, 2, 2]} />
          <MeshStandardMaterial color="#fef08a" transparent opacity={0.2} />
        </Mesh>
      </Float>

      {smallShapes.map((shape, i) => (
        <Float key={i} speed={shape.speed} rotationIntensity={1.2} floatIntensity={0.8}>
          <Mesh position={shape.position} scale={shape.scale}>
            <OctahedronGeometry />
            <MeshStandardMaterial color={shape.color} transparent opacity={0.25} />
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
        camera={{ position: [0, 0, 20], fov: 45 }} 
        dpr={[1, 2]} // High quality DPR for crisp 3D elements
        gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
      >
        <AmbientLight intensity={0.6} />
        <PointLight position={[15, 15, 15]} intensity={1.5} />
        <PointLight position={[-15, -15, -15]} intensity={0.5} color="#99f6e4" />
        <FloatingShapes />
        <ContactShadows opacity={0.2} scale={30} blur={2.5} far={15} resolution={256} color="#000000" />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
