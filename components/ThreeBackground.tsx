
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Fix: Aliased intrinsic elements to bypass missing JSX namespace definitions in strict TS environments
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const TorusKnotGeometry = 'torusKnotGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const BoxGeometry = 'boxGeometry' as any;
const OctahedronGeometry = 'octahedronGeometry' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;

const InteractiveGroup = ({ children }: { children?: React.ReactNode }) => {
  // Fix: Renamed variable 'group' to 'groupRef' to avoid shadowing the aliased 'Group' component
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (groupRef.current) {
      // Slow constant rotation
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      
      // Subtle mouse-follow parallax
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouse.x * 2, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouse.y * 2, 0.1);
    }
  });

  return <Group ref={groupRef}>{children}</Group>;
};

const FloatingShapes = () => {
  // Generate random positions for additional small shapes
  const smallShapes = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      ] as [number, number, number],
      color: i % 2 === 0 ? "#99f6e4" : "#bae6fd",
      speed: 1 + Math.random() * 2,
      scale: 0.1 + Math.random() * 0.3
    }));
  }, []);

  return (
    <InteractiveGroup>
      {/* Large Main Shapes */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1.5, 64, 64]} position={[-6, 4, -8]}>
          <MeshDistortMaterial
            color="#99f6e4"
            speed={1.5}
            distort={0.3}
            radius={1}
            transparent
            opacity={0.4}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
        <Mesh position={[8, -4, -10]}>
          <TorusKnotGeometry args={[1.2, 0.4, 128, 16]} />
          <MeshStandardMaterial color="#bae6fd" transparent opacity={0.3} wireframe />
        </Mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <Mesh position={[-4, -6, -6]}>
          <BoxGeometry args={[1.5, 1.5, 1.5]} />
          <MeshStandardMaterial color="#fef08a" transparent opacity={0.25} />
        </Mesh>
      </Float>

      {/* Scattering of smaller decorative shapes */}
      {smallShapes.map((shape, i) => (
        <Float key={i} speed={shape.speed} rotationIntensity={2} floatIntensity={1}>
          <Mesh position={shape.position} scale={shape.scale}>
            <OctahedronGeometry />
            <MeshStandardMaterial color={shape.color} transparent opacity={0.3} />
          </Mesh>
        </Float>
      ))}
    </InteractiveGroup>
  );
};

const ThreeBackground: React.FC = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }} dpr={[1, 2]}>
        <AmbientLight intensity={0.6} />
        <PointLight position={[10, 10, 10]} intensity={1.2} />
        <PointLight position={[-10, -10, -10]} intensity={0.5} color="#99f6e4" />
        <FloatingShapes />
        <ContactShadows opacity={0.2} scale={20} blur={2} far={10} resolution={256} color="#000000" />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
