import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, MeshWobbleMaterial, PerspectiveCamera, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion-3d';

// --- Constants ---
const COLORS = {
  NAVY: '#1A2F4B',
  GOLD: '#D4AF37',
  PARCHMENT: '#F9F7F2',
  ACCENT: '#E1AD01'
};

const FEATURES = [
  {
    title: "Superior Paper Quality",
    description: "High-GSM archival sheets for timeless writing.",
    position: [-2.5, 1.5, 0],
    color: COLORS.PARCHMENT
  },
  {
    title: "Ergonomic Design",
    description: "Engineered for reading comfort and flat-lay ease.",
    position: [2.5, 1.5, 0],
    color: COLORS.GOLD
  },
  {
    title: "Eco-Conscious Materials",
    description: "FSC-certified sustainable sourcing for a better planet.",
    position: [-2.5, -1.5, 0],
    color: COLORS.ACCENT
  },
  {
    title: "Unmatched Durability",
    description: "Industrial-grade binding strength that lasts decades.",
    position: [2.5, -1.5, 0],
    color: COLORS.NAVY
  }
];

// --- 3D Feature Card Component ---
function FeatureCard({ title, description, position, color, index }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Smoothly animate scale and rotation on hover
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Gentle floating motion
      meshRef.current.position.y = position[1] + Math.sin(t + index) * 0.1;
      
      // Hover effects
      meshRef.current.scale.lerp(new THREE.Vector3(hovered ? 1.1 : 1, hovered ? 1.1 : 1, 1), 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, hovered ? 0.2 : 0, 0.1);
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[4, 2.5, 0.2]} />
          <meshPhysicalMaterial 
            color={hovered ? COLORS.GOLD : COLORS.NAVY}
            metalness={0.8}
            roughness={0.2}
            clearcoat={1}
            transmission={0.5}
            thickness={1}
          />
          
          {/* Card Content (Typography) */}
          <Text
            position={[0, 0.4, 0.15]}
            fontSize={0.25}
            color={hovered ? COLORS.NAVY : COLORS.PARCHMENT}
            font="https://fonts.gstatic.com/s/cormorantgaramond/v11/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYpHtK.woff"
            anchorX="center"
            anchorY="middle"
            maxWidth={3.5}
          >
            {title.toUpperCase()}
          </Text>
          
          <Text
            position={[0, -0.4, 0.15]}
            fontSize={0.12}
            color={hovered ? COLORS.NAVY : COLORS.PARCHMENT}
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
            anchorX="center"
            anchorY="middle"
            maxWidth={3.2}
            opacity={0.8}
          >
            {description}
          </Text>

          {/* Border Glow */}
          <mesh position={[0, 0, -0.05]}>
            <planeGeometry args={[4.2, 2.7]} />
            <meshBasicMaterial color={COLORS.GOLD} transparent opacity={hovered ? 0.3 : 0.05} />
          </mesh>
        </mesh>
      </Float>
    </group>
  );
}

// --- Main Scene ---
export default function NatarajFeatures3D() {
  return (
    <div style={{ width: '100%', height: '100vh', background: COLORS.NAVY }}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Environment & Shadows */}
        <Environment preset="city" />
        <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />

        {/* Content Group */}
        <group>
          {FEATURES.map((feature, i) => (
            <FeatureCard key={i} {...feature} index={i} />
          ))}
        </group>

        {/* Title Background Overlay (3D) */}
        <Text
          position={[0, 0, -5]}
          fontSize={6}
          color={COLORS.GOLD}
          opacity={0.03}
          transparent
          font="https://fonts.gstatic.com/s/cormorantgaramond/v11/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYpHtK.woff"
        >
          NATARAJ
        </Text>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.2}
          maxAzimuthAngle={Math.PI / 8}
          minAzimuthAngle={-Math.PI / 8}
        />
      </Canvas>

      {/* 2D HUD (Optional) */}
      <div style={{ 
        position: 'absolute', 
        top: '10%', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        textAlign: 'center',
        pointerEvents: 'none'
      }}>
        <h2 style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          color: COLORS.GOLD, 
          fontSize: '0.8rem', 
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          marginBottom: '1rem'
        }}>
          Engineering Excellence
        </h2>
        <h1 style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          color: COLORS.PARCHMENT, 
          fontSize: '3rem',
          fontWeight: '400'
        }}>
          Manufacturing the Future
        </h1>
      </div>
    </div>
  );
}
