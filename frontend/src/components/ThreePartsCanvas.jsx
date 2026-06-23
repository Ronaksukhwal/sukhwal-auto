import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Import the new realistic assets
import engineCrankcaseImg from '../assets/engine_crankcase.jpg';
import partsPileImg from '../assets/parts_pile.jpg';
import beltComponentImg from '../assets/belt_component.jpg';
import oilyGearsImg from '../assets/oily_gears.jpg';
import pistonAssemblyImg from '../assets/piston_assembly.jpg';

// Helper component for making camera position fully responsive on mobile/tablet/desktop
function ResponsiveCamera({ desktop = 5.5, tablet = 6.6, mobile = 7.8 }) {
  const { camera } = useThree();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        camera.position.z = mobile;
      } else if (window.innerWidth < 768) {
        camera.position.z = tablet;
      } else {
        camera.position.z = desktop;
      }
      camera.updateProjectionMatrix();
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera, desktop, tablet, mobile]);
  return null;
}

// ----------------------------------------------------
// 3D Realistic Image Card component
// Preserves the full-color, realistic detail of images
// ----------------------------------------------------
function ImageCard({ texture, width = 1.6, height = 1.6 }) {
  return (
    <group>
      {/* Front Face: The realistic full-color image texture */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent={true} />
      </mesh>
      {/* Backing Card: Premium styled dark metallic backboard */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width + 0.08, height + 0.08, 0.03]} />
        <meshStandardMaterial color="#221518" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Subtle border outline */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[width + 0.04, height + 0.04, 0.01]} />
        <meshStandardMaterial color="#E91E63" metalness={0.5} roughness={0.2} />
      </mesh>
    </group>
  );
}

// ----------------------------------------------------
// 3D Texture-Mapped Realistic Components with 3D Overlays
// ----------------------------------------------------

// 1. Realistic Engine Crankcase Block Cutout
export function EngineCutout3D({ position, scale, isHovered, onHover, onClick }) {
  const groupRef = useRef();
  const texture = useTexture(pistonAssemblyImg);

  const currentPos = useRef(position || [0, 0, 0]);
  const currentScale = useRef(scale || 1.0);

  useFrame((state, delta) => {
    // Smooth transition for position and scale
    if (position) {
      currentPos.current = currentPos.current.map((val, idx) => 
        THREE.MathUtils.lerp(val, position[idx], 4 * delta)
      );
    }
    if (scale) {
      currentScale.current = THREE.MathUtils.lerp(currentScale.current, scale, 4 * delta);
    }

    if (groupRef.current) {
      // Direct reciprocating vertical engine stroke motion
      const oscY = Math.sin(state.clock.getElapsedTime() * 4.0) * 0.25;
      groupRef.current.position.set(
        currentPos.current[0],
        currentPos.current[1] + oscY,
        currentPos.current[2]
      );
      groupRef.current.scale.setScalar(currentScale.current);
      // Soft vibration/rocking rotation
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.12;
      groupRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.4) * 0.06;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 8.0) * 0.02; // engine vibration
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={(e) => { e.stopPropagation(); onHover && onHover(true); }}
      onPointerOut={() => onHover && onHover(false)}
      onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
    >
      {/* Flat realistic image card */}
      <ImageCard texture={texture} width={1.5} height={1.5} />
    </group>
  );
}

// 2. Realistic Parts Pile & Speedometer Dashboard
export function Speedometer3D({ position, scale, isHovered, onHover, onClick }) {
  const groupRef = useRef();
  const texture = useTexture(partsPileImg);

  const currentPos = useRef(position || [0, 0, 0]);
  const currentScale = useRef(scale || 1.0);

  useFrame((state, delta) => {
    if (position) {
      currentPos.current = currentPos.current.map((val, idx) => 
        THREE.MathUtils.lerp(val, position[idx], 4 * delta)
      );
    }
    if (scale) {
      currentScale.current = THREE.MathUtils.lerp(currentScale.current, scale, 4 * delta);
    }

    if (groupRef.current) {
      groupRef.current.position.set(...currentPos.current);
      groupRef.current.scale.setScalar(currentScale.current);
      
      // Speedometer sweep: swivels the whole card in Z-axis back and forth
      const sweep = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.25;
      groupRef.current.rotation.z = sweep;
      
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.45) * 0.15;
      groupRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.45) * 0.08;
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={(e) => { e.stopPropagation(); onHover && onHover(true); }}
      onPointerOut={() => onHover && onHover(false)}
      onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
    >
      {/* Flat realistic image card */}
      <ImageCard texture={texture} width={1.5} height={1.5} />
    </group>
  );
}

// 3. Realistic Belt Component & Twin Pistons
export function PistonsCrankshaft3D({ position, scale, isHovered, onHover, onClick }) {
  const groupRef = useRef();
  const texture = useTexture(beltComponentImg);

  const currentPos = useRef(position || [0, 0, 0]);
  const currentScale = useRef(scale || 1.0);

  useFrame((state, delta) => {
    if (position) {
      currentPos.current = currentPos.current.map((val, idx) => 
        THREE.MathUtils.lerp(val, position[idx], 4 * delta)
      );
    }
    if (scale) {
      currentScale.current = THREE.MathUtils.lerp(currentScale.current, scale, 4 * delta);
    }

    if (groupRef.current) {
      // Direct vertical reciprocating piston bounce motion on the image card
      const oscY = Math.sin(state.clock.getElapsedTime() * 3.0) * 0.22;
      groupRef.current.position.set(
        currentPos.current[0],
        currentPos.current[1] + oscY,
        currentPos.current[2]
      );
      groupRef.current.scale.setScalar(currentScale.current);
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.12;
      groupRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.06;
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={(e) => { e.stopPropagation(); onHover && onHover(true); }}
      onPointerOut={() => onHover && onHover(false)}
      onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
    >
      {/* Flat realistic image card */}
      <ImageCard texture={texture} width={1.5} height={1.5} />
    </group>
  );
}

// 4. Realistic Oily Gears & Cogs System
export function GearsCogs3D({ position, scale, isHovered, onHover, onClick }) {
  const groupRef = useRef();
  const texture = useTexture(oilyGearsImg);

  const currentPos = useRef(position || [0, 0, 0]);
  const currentScale = useRef(scale || 1.0);

  useFrame((state, delta) => {
    if (position) {
      currentPos.current = currentPos.current.map((val, idx) => 
        THREE.MathUtils.lerp(val, position[idx], 4 * delta)
      );
    }
    if (scale) {
      currentScale.current = THREE.MathUtils.lerp(currentScale.current, scale, 4 * delta);
    }

    if (groupRef.current) {
      groupRef.current.position.set(...currentPos.current);
      groupRef.current.scale.setScalar(currentScale.current);
      
      // Direct 360 degree spinning gear rotation directly on the image card
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.8;
      
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.12;
      groupRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.4) * 0.08;
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={(e) => { e.stopPropagation(); onHover && onHover(true); }}
      onPointerOut={() => onHover && onHover(false)}
      onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
    >
      {/* Flat realistic image card */}
      <ImageCard texture={texture} width={1.5} height={1.5} />
    </group>
  );
}


// ----------------------------------------------------
// Standalone WebGL Canvas Widgets for individual pages
// ----------------------------------------------------

// 1. Piston Widget (Home Page) -> Renders EngineCutout3D centered
export function PistonCanvas() {
  return (
    <div style={{ width: "100%", height: "280px", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 2.3], fov: 40 }} gl={{ antialias: true }}>
        <ResponsiveCamera desktop={2.3} tablet={3.0} mobile={3.6} />
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[0, 4, 2]} intensity={1.2} />
        <React.Suspense fallback={null}>
          <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.4}>
            <EngineCutout3D isHovered={false} />
          </Float>
        </React.Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

// 2. Gear Widget (Bikes Page) -> Renders GearsCogs3D centered
export function GearCanvas() {
  return (
    <div style={{ width: "100%", height: "250px", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 2.2], fov: 40 }} gl={{ antialias: true }}>
        <ResponsiveCamera desktop={2.2} tablet={2.8} mobile={3.4} />
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[0, 4, 2]} intensity={1.2} />
        <React.Suspense fallback={null}>
          <Float speed={2.0} rotationIntensity={0.3} floatIntensity={0.3}>
            <GearsCogs3D isHovered={false} />
          </Float>
        </React.Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

// 3. Spring Widget (Services Page) -> Renders PistonsCrankshaft3D centered
export function SpringCanvas() {
  return (
    <div style={{ width: "100%", height: "300px", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 2.6], fov: 40 }} gl={{ antialias: true }}>
        <ResponsiveCamera desktop={2.6} tablet={3.2} mobile={3.8} />
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[0, 4, 2]} intensity={1.2} />
        <React.Suspense fallback={null}>
          <Float speed={2.2} rotationIntensity={0.3} floatIntensity={0.4}>
            <PistonsCrankshaft3D isHovered={false} />
          </Float>
        </React.Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

// 4. Spark Plug Widget (Book Service Page) -> Renders Speedometer3D centered
export function SparkPlugCanvas() {
  return (
    <div style={{ width: "100%", height: "280px", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 2.4], fov: 40 }} gl={{ antialias: true }}>
        <ResponsiveCamera desktop={2.4} tablet={3.0} mobile={3.6} />
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[0, 4, 2]} intensity={1.2} />
        <React.Suspense fallback={null}>
          <Float speed={2.0} rotationIntensity={0.4} floatIntensity={0.3}>
            <Speedometer3D isHovered={false} />
          </Float>
        </React.Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

// 5. Brake Disc Widget (Contact Page) -> Renders Speedometer3D centered
export function BrakeDiscCanvas() {
  return (
    <div style={{ width: "100%", height: "260px", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 2.4], fov: 40 }} gl={{ antialias: true }}>
        <ResponsiveCamera desktop={2.4} tablet={3.0} mobile={3.6} />
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[0, 4, 2]} intensity={1.2} />
        <React.Suspense fallback={null}>
          <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
            <Speedometer3D isHovered={false} />
          </Float>
        </React.Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

// 6. Engine Assembly Widget (About Us Page) -> Renders combined layout
export function EngineAssemblyCanvas() {
  return (
    <div style={{ width: "100%", height: "320px", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }} gl={{ antialias: true }}>
        <ResponsiveCamera desktop={3.8} tablet={4.6} mobile={5.5} />
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 10, 5]} intensity={2.0} />
        <directionalLight position={[0, 5, 2]} intensity={1.5} />
        <React.Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.2}>
            <group rotation={[Math.PI / 10, Math.PI / 6, 0]}>
              <group position={[0, 0.6, 0]} scale={[0.85, 0.85, 0.85]}>
                <EngineCutout3D isHovered={false} />
              </group>
              <group position={[0, -0.6, 0]} scale={[0.85, 0.85, 0.85]}>
                <GearsCogs3D isHovered={false} />
              </group>
            </group>
          </Float>
        </React.Suspense>
        <OrbitControls enableZoom={true} enablePan={false} maxDistance={7} minDistance={2} />
      </Canvas>
    </div>
  );
}

// Main Canvas Component (Parts Explorer inside Genuine Parts)
export default function ThreePartsCanvas({ isAssembled, onSelectPart }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const support = !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setIsWebGLSupported(support);
    } catch (e) {
      setIsWebGLSupported(false);
    }
  }, []);

  const partDetails = [
    {
      name: "Genuine Engine Block Cutout",
      metric: "High-Compression Cylinder Sleeve & Piston",
      desc: "An inside view of the specialized Hero engine. Formulated to handle high heat cycles while maintaining excellent compression and fuel efficiency.",
      specs: "Bore Size: 50.0mm (Std) | Material: Cast Iron-Alloy | Coating: Moly Skirt"
    },
    {
      name: "Genuine Speedometer Dashboard",
      metric: "Precision Instrument Cluster Assembly",
      desc: "Official Hero MotoCorp speedometer console surrounded by O.E.M. service components. Provides accurate speed, fuel level, and odometer readings.",
      specs: "Speed Range: 0-160 km/h | Input: Mechanical/Electronic Cable | Backlight: LED"
    },
    {
      name: "Genuine Multi-Cylinder Pistons",
      metric: "Reciprocating Twin-Piston Assembly",
      desc: "Synchronized dual piston and connecting rod setup matching factory tolerances. Translates power smoothly with minimized structural vibration.",
      specs: "Piston Count: 2 | Wrist Pin: 13mm | Rod length: 94mm"
    },
    {
      name: "Genuine Synchronization Gears",
      metric: "High-Tensile Transmission Gear Train",
      desc: "Dual transmission cogs meshing together under peak torque. Case-hardened construction prevents gear slippage and noisy operation.",
      specs: "Large Gear: 18 Teeth | Small Gear: 12 Teeth | Hardness: 60 HRC"
    }
  ];

  const triggerSelect = (idx) => {
    setSelectedIdx(idx);
    onSelectPart(partDetails[idx]);
  };

  if (!isWebGLSupported) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 border border-dashed border-red-500/30 rounded-2xl bg-white text-center">
        <div className="text-red-500 font-bold mb-2">3D Graphics Mode Unavailable</div>
        <p className="text-sm text-gray-400 max-w-sm mb-4">
          WebGL is disabled or not supported by your browser. Here is an interactive parts breakdown:
        </p>
        <div className="flex flex-col gap-2 w-full max-w-md">
          {partDetails.map((part, idx) => (
            <div 
              key={idx}
              className="p-3 bg-red-50 border border-pink-200 hover:border-pink-500 rounded-lg cursor-pointer transition text-left"
              onClick={() => triggerSelect(idx)}
            >
              <div className="font-bold text-gray-800 text-sm">{part.name}</div>
              <div className="text-xs text-pink-600 font-semibold">{part.metric}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Positioning the four items dynamically.
  // Active selected part flies to center [0, 0, 0] at 1.4x scale.
  // Inactive parts recede into the background [z = -1.0] at 0.6x scale.
  const getPosition = (idx) => {
    if (selectedIdx === idx) {
      return [0, 0, 0];
    }
    switch (idx) {
      case 0: return [-1.8, 1.1, -1.0]; // Engine Cutout (Top Left)
      case 1: return [1.8, -1.1, -1.0]; // Speedometer (Bottom Right)
      case 2: return [-1.8, -1.1, -1.0]; // Twin Pistons (Bottom Left)
      case 3: return [1.8, 1.1, -1.0]; // Gears & Cogs (Top Right)
      default: return [0, 0, 0];
    }
  };

  const getScale = (idx) => {
    return selectedIdx === idx ? 1.4 : 0.6;
  };

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "450px", position: "relative" }}>
      {/* 3D Canvas Screen */}
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ antialias: true }}>
        <ResponsiveCamera desktop={5.5} tablet={6.8} mobile={8.0} />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <directionalLight position={[0, 5, 5]} intensity={2.0} color="#ffeef2" />
        
        <React.Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
            {/* 1. Engine Cutout */}
            <EngineCutout3D 
              position={getPosition(0)}
              scale={getScale(0)}
              isHovered={hoveredIdx === 0} 
              onHover={(h) => setHoveredIdx(h ? 0 : null)} 
              onClick={() => triggerSelect(0)}
            />

            {/* 2. Speedometer */}
            <Speedometer3D 
              position={getPosition(1)}
              scale={getScale(1)}
              isHovered={hoveredIdx === 1} 
              onHover={(h) => setHoveredIdx(h ? 1 : null)} 
              onClick={() => triggerSelect(1)}
            />

            {/* 3. Twin Pistons */}
            <PistonsCrankshaft3D 
              position={getPosition(2)}
              scale={getScale(2)}
              isHovered={hoveredIdx === 2} 
              onHover={(h) => setHoveredIdx(h ? 2 : null)} 
              onClick={() => triggerSelect(2)}
            />

            {/* 4. Gears & Cogs */}
            <GearsCogs3D 
              position={getPosition(3)}
              scale={getScale(3)}
              isHovered={hoveredIdx === 3} 
              onHover={(h) => setHoveredIdx(h ? 3 : null)} 
              onClick={() => triggerSelect(3)}
            />
          </Float>
        </React.Suspense>

        <OrbitControls enableZoom={true} enablePan={false} maxDistance={10} minDistance={3} />
      </Canvas>

      {/* Manual select tabs at the bottom of the canvas */}
      <div style={{
        position: 'absolute',
        bottom: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '0.5rem',
        zIndex: 10,
        background: 'rgba(255,255,255,0.9)',
        padding: '6px 12px',
        borderRadius: '30px',
        border: '1px solid rgba(233,30,99,0.15)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        maxWidth: '90%',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {['Engine', 'Speedo', 'Pistons', 'Gears'].map((label, idx) => (
          <button
            key={idx}
            onClick={() => triggerSelect(idx)}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              transition: 'all 0.2s',
              background: selectedIdx === idx ? 'var(--primary)' : 'transparent',
              color: selectedIdx === idx ? '#ffffff' : 'var(--text-gray)'
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
        <span className="bg-white/95 backdrop-blur-md border border-pink-200 text-xs px-4 py-2 rounded-full text-gray-700 shadow-sm">
          Click parts or use buttons to inspect. Drag left-click to orbit focused model.
        </span>
      </div>
    </div>
  );
}
