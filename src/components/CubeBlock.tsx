"use client";

import { useScroll, useTransform, MotionValue, motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, RootState } from "@react-three/fiber";
import { Box, Points, PointMaterial, Sphere, Line as DreiLine } from "@react-three/drei";
import { Group, Mesh, MeshStandardMaterial, PointLight, Vector3, Color, Points as ThreePoints, Material, LineSegments } from "three";
import * as THREE from "three";
import * as random from "maath/random";

// --- AESTHETIC DATA ---
const layerColors = ["#f9fafb", "#f3f4f6", "#e5e7eb", "#d1d5db"];
const effectColor = "#00ffff"; // Neon cyan for effects (used for Layer 1 & 2 effects, default)
const neuralGraphColor = "#4a4a4a"; // Dark grey for neural graph nodes/lines
const neuralGraphGlow = "#ffffff"; // White for neural graph glow
const chartColor = "#00ff00"; // Green for the financial chart

const layerInfo = [
  {
    title: "Data Ingestion & Engineering",
    description: "Automatically ingests information from all your sources and provides a real-time, comprehensive view of cash flow.",
  },
  {
    title: "Operational Monitoring & AI",
    description: "Tracks every project detail, from progress to personnel, and uses AI to forecast risks and financial outcomes.",
  },
  {
    title: "Predictive Insights",
    description: "Uses AI to forecast risks and financial outcomes.",
  },
  {
    title: "Natural Language Interaction",
    description: "Ask questions and get instant answers in plain English.",
  },
];

// --- PROP TYPES ---
interface CubeLayerProps {
  scrollYProgress: MotionValue<number>;
  index: number;
  color: string;
  onFocusProgress: (index: number, value: number) => void;
}
interface AnimatedCameraProps {
  scrollYProgress: MotionValue<number>;
  focusProgresses: number[];
}
interface ExperienceProps {
  scrollYProgress: MotionValue<number>;
}
interface SceneProps {
  scrollYProgress: MotionValue<number>;
}
interface InfoProps {
  scrollYProgress: MotionValue<number>;
}
interface FocusEffectProps {
  index: number;
  focusProgress: MotionValue<number>;
  layerHeight: number;
  cubeSize: number;
}
interface ParticleProps {
  particle: { t: number; speed: number; x: number; y: number; z: number };
  focusProgress: MotionValue<number>;
  effectColor: string;
}

// --- TEXT OVERLAY COMPONENT ---
function LayerInfo({ scrollYProgress }: InfoProps) {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(latest => {
      const zoomRanges = [[0.25, 0.40], [0.45, 0.60], [0.65, 0.80], [0.85, 1.0]];
      let newIndex = -1;
      for (let i = 0; i < zoomRanges.length; i++) {
        if (latest >= zoomRanges[i][0] && latest <= zoomRanges[i][1]) {
          newIndex = i;
          break;
        }
      }
      setActiveIndex(newIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const activeInfo = activeIndex > -1 ? layerInfo[activeIndex] : null;

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-start p-8 md:p-24">
      <AnimatePresence mode="wait">
        {activeInfo && (
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-white [text-shadow:0_0_12px_rgba(255,255,255,0.5)]"
          >
            <h2 className="text-4xl font-bold mb-4">{activeInfo.title}</h2>
            <p className="text-lg max-w-lg">{activeInfo.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- 3D COMPONENTS ---
function Particles(props: any) {
  const ref = useRef<any>(null);
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000 * 3), { radius: 15 }), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#ffffff" size={0.02} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

function Particle({ particle, focusProgress, effectColor }: ParticleProps) {
  const ref = useRef<Mesh>(null!);
  useFrame((state) => {
    if (ref.current) {
      const clampedFocus = THREE.MathUtils.clamp(focusProgress.get(), 0, 1);
      (ref.current.material as MeshStandardMaterial).opacity = clampedFocus;
      particle.t = (particle.t + particle.speed) % 100;
      const newPos = new THREE.Vector3(particle.x, particle.y, particle.z).multiplyScalar(1 - (particle.t % 1));
      ref.current.position.copy(newPos);
    }
  });
  return (
    <Sphere ref={ref} args={[0.05]}>
      <meshStandardMaterial color={effectColor} emissive={effectColor} emissiveIntensity={0.5} transparent />
    </Sphere>
  );
}

// FocusEffects component for layer-specific animations
function FocusEffects({ index, focusProgress, layerHeight, cubeSize }: FocusEffectProps) {
  const ref = useRef<Group>(null!);
  const time = useRef(0);

  // Layer 0: Data Ingestion
  const particlesL0 = useMemo(() => {
    const particles = [];
    for (let i = 0; i < 30; i++) {
      const t = Math.random() * 100;
      const speed = 0.005 + Math.random() / 500;
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 5;
      const z = (Math.random() - 0.5) * 10;
      particles.push({ t, speed, x, y, z });
    }
    return particles;
  }, []);

  // Layer 1: Operational Monitoring - Neural Graph
  const numNodes = 15;
  const nodeRefs = useRef<Mesh[]>([]);
  const lineRefs = useRef<any[]>([]);
  const nodePositions = useMemo(() => {
    const positions = [];
    const halfSize = cubeSize / 2 * 0.8;
    for (let i = 0; i < numNodes; i++) {
      const x = (Math.random() - 0.5) * (halfSize * 2);
      const y = (Math.random() - 0.5) * (halfSize * 2);
      const z = (Math.random() - 0.5) * 0.1;
      positions.push(new THREE.Vector3(x, y, z));
    }
    return positions;
  }, [cubeSize]);
  const allConnections = useMemo(() => {
    const connections: [number, number][] = [];
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < cubeSize * 0.7) {
          connections.push([i, j]);
        }
      }
    }
    return connections;
  }, [nodePositions, cubeSize]);
  const centerSphereRefL1 = useRef<Mesh>(null!);

  // Layer 2: Predictive Insights - Swirling Vortex
  const vortexParticlesRef = useRef<ThreePoints>(null!);
  const numVortexParticles = 200;
  const vortexPositions = useMemo(() => {
    const positions = new Float32Array(numVortexParticles * 3);
    for (let i = 0; i < numVortexParticles; i++) {
      const r = Math.sqrt(Math.random()) * cubeSize * 0.4;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3] = r * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(theta);
      positions[i * 3 + 2] = (Math.random() - 0.5) * cubeSize * 0.2;
    }
    return positions;
  }, [cubeSize]);
  const centerSphereRefL2 = useRef<Mesh>(null!);

  // Layer 3: Financial Engineering - Line Chart
  const chartRef = useRef<any>(null!);
  const chartPoints = useMemo(() => {
    const points = [];
    const numPoints = 10;
    const halfSize = cubeSize / 2 * 0.9;
    for (let i = 0; i < numPoints; i++) {
      const x = i * (halfSize * 2 / (numPoints - 1)) - halfSize;
      const y = (Math.random() - 0.5) * halfSize * 0.5;
      points.push(new THREE.Vector3(x, y, 0));
    }
    return points;
  }, [cubeSize]);

  useFrame((state) => {
    time.current = state.clock.getElapsedTime();
    if (ref.current) {
      const clampedFocus = THREE.MathUtils.clamp(focusProgress.get(), 0, 1);
      ref.current.visible = clampedFocus > 0;

      ref.current.children.forEach((child) => {
        if ('material' in child) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat: Material) => {
              mat.transparent = true;
              mat.opacity = clampedFocus;
            });
          } else {
            (child.material as Material).transparent = true;
            (child.material as Material).opacity = clampedFocus;
          }
        }
      });

      // Layer 0: Data Ingestion (Dynamic Data Stream)
      if (index === 0) {
        // Particles animation is handled by the `Particle` component itself
      }

      // Layer 1: Operational Monitoring - Neural Graph
      if (index === 1) {
        const connectionProgress = clampedFocus;
        nodeRefs.current.forEach(node => {
          if (node) {
            (node.material as MeshStandardMaterial).emissiveIntensity = THREE.MathUtils.lerp(0, 10 + 3 * Math.sin(time.current * 3), connectionProgress);
            (node.material as MeshStandardMaterial).opacity = connectionProgress;
            node.scale.setScalar(THREE.MathUtils.lerp(0.05, 0.15, connectionProgress));
          }
        });
        const numActiveConnections = Math.floor(allConnections.length * connectionProgress);
        lineRefs.current.forEach((line, i) => {
          if (line) {
            const material = (line as any).material;
            if (i < numActiveConnections) {
              material.visible = true;
              material.opacity = THREE.MathUtils.lerp(0, 0.8, connectionProgress);
              material.color.set(neuralGraphGlow);
            } else {
              material.visible = false;
            }
          }
        });
        if (centerSphereRefL1.current) {
          const pulseScale = 0.15 + 0.03 * Math.sin(time.current * 3);
          centerSphereRefL1.current.scale.setScalar(THREE.MathUtils.lerp(0.05, pulseScale, connectionProgress));
          (centerSphereRefL1.current.material as MeshStandardMaterial).emissiveIntensity = THREE.MathUtils.lerp(0, 15 + 5 * Math.sin(time.current * 3), connectionProgress);
          (centerSphereRefL1.current.material as MeshStandardMaterial).opacity = connectionProgress;
        }
      }

      // Layer 2: Predictive Insights - Swirling Vortex
      if (index === 2 && vortexParticlesRef.current) {
        const vortexProgress = clampedFocus;
        const positions = vortexParticlesRef.current.geometry.attributes.position.array as Float32Array;
        const tempVector = new THREE.Vector3();
        for (let i = 0; i < numVortexParticles; i++) {
          const r = Math.sqrt(Math.random()) * cubeSize * 0.4;
          const theta = (time.current * 0.5 + i * 0.1) % (Math.PI * 2);
          const swirlFactor = THREE.MathUtils.lerp(0, 1, vortexProgress);
          tempVector.set(
            r * Math.cos(theta + swirlFactor * Math.sin(time.current * 0.3)),
            r * Math.sin(theta + swirlFactor * Math.cos(time.current * 0.3)),
            (Math.sin(time.current + i) * 0.1 * cubeSize) * swirlFactor
          );
          positions[i * 3] = tempVector.x;
          positions[i * 3 + 1] = tempVector.y;
          positions[i * 3 + 2] = tempVector.z;
        }
        vortexParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        (vortexParticlesRef.current.material as any).opacity = vortexProgress;
        (vortexParticlesRef.current.material as any).size = THREE.MathUtils.lerp(0.01, 0.05, vortexProgress);        if (centerSphereRefL2.current) {
          const pulseScale = 0.2 + 0.05 * Math.sin(time.current * 4);
          centerSphereRefL2.current.scale.setScalar(THREE.MathUtils.lerp(0.01, pulseScale, vortexProgress));
          (centerSphereRefL2.current.material as MeshStandardMaterial).emissiveIntensity = THREE.MathUtils.lerp(0, 20 + 10 * Math.sin(time.current * 4), vortexProgress);
        }
      }

      // Layer 3: Financial Engineering - Line Chart
      if (index === 3 && chartRef.current) {
        const chartProgress = clampedFocus;
        const lineMaterial = (chartRef.current as any).material;
        lineMaterial.opacity = chartProgress;
        lineMaterial.color.set(chartColor);
        (chartRef.current as any).visible = chartProgress > 0;
      }
    }
  });

  return (
    <group ref={ref} position={[0, 0, cubeSize / 2 + 0.01]}>
      {/* Layer 0: Data Ingestion (Dynamic Data Stream) */}
      {index === 0 && (
        <>
          {particlesL0.map((particle, i) => (
            <Particle key={i} particle={particle} focusProgress={focusProgress} effectColor={effectColor} />
          ))}
        </>
      )}

      {/* Layer 1: Operational Monitoring (Neural Graph) */}
      {index === 1 && (
        <>
          {nodePositions.map((pos, i) => (
            <Sphere key={`node-${i}`} ref={el => { if (el) nodeRefs.current[i] = el; }} args={[0.1]} position={pos} scale={0.05}>
              <meshStandardMaterial color={neuralGraphGlow} emissive={neuralGraphGlow} emissiveIntensity={0} transparent opacity={0} />
            </Sphere>
          ))}
          {allConnections.map(([i, j], k) => (
            <DreiLine
              key={`line-${k}`}
              ref={el => { if (el) lineRefs.current[k] = el; }}
              points={[nodePositions[i], nodePositions[j]]}
              color={neuralGraphGlow}
              lineWidth={1}
              transparent
              opacity={0}
              visible={false}
            />
          ))}
          <Sphere ref={centerSphereRefL1} args={[0.2]} position={[0, 0, 0]} scale={0.05}>
            <meshStandardMaterial color={neuralGraphGlow} emissive={neuralGraphGlow} emissiveIntensity={0} transparent opacity={0} />
          </Sphere>
          <pointLight color={neuralGraphGlow} intensity={5} distance={2} position={[0, 0, 0]} />
        </>
      )}

      {/* Layer 2: Predictive Insights (Swirling Vortex) */}
      {index === 2 && (
        <>
          <Points ref={vortexParticlesRef} positions={vortexPositions}>
            <PointMaterial transparent color={effectColor} size={0.01} sizeAttenuation={true} depthWrite={false} opacity={0} />
          </Points>
          <Sphere ref={centerSphereRefL2} args={[0.3]} position={[0, 0, 0]} scale={0.01}>
            <meshStandardMaterial color={effectColor} emissive={effectColor} emissiveIntensity={0} transparent opacity={0} />
          </Sphere>
          <pointLight color={effectColor} intensity={10} distance={2} position={[0, 0, 0]} />
        </>
      )}

      {/* Layer 3: Financial Engineering (Line Chart) */}
      {index === 3 && (
        <DreiLine ref={chartRef} points={chartPoints} color={chartColor} lineWidth={3} transparent opacity={0} visible={false} />
      )}
    </group>
  );
}

function CubeLayer({ scrollYProgress, index, color, onFocusProgress }: CubeLayerProps) {
  const meshRef = useRef<Group>(null!);
  const materialRef = useRef<MeshStandardMaterial>(null!);
  const cubeSize = 3.0;
  const numLayers = layerColors.length;
  const layerHeight = cubeSize / numLayers;
  const yFactor = ((numLayers - 1 - index) - (numLayers - 1) / 2);
  const initialY = yFactor * layerHeight;
  const finalY = yFactor * (layerHeight + 1.5);
  const y = useTransform(scrollYProgress, [0, 0.2], [initialY, finalY]);

  const zoomRanges = [
    [0.25, 0.40],
    [0.45, 0.60],
    [0.65, 0.80],
    [0.85, 1.00]
  ];
  const [start, end] = zoomRanges[index];
  const focusProgress = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);

  useFrame(() => {
    if (meshRef.current) meshRef.current.position.y = y.get();
    onFocusProgress(index, focusProgress.get());
  });

  return (
    <group ref={meshRef}>
      <Box args={[cubeSize, layerHeight, cubeSize]}>
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          metalness={0.9}
          roughness={0.1}
          transparent={true}
          opacity={0.95}
          emissive={color}
        />
      </Box>
      <FocusEffects index={index} focusProgress={focusProgress} layerHeight={layerHeight} cubeSize={cubeSize} />
    </group>
  );
}

function AnimatedCamera({ scrollYProgress, focusProgresses }: AnimatedCameraProps) {
  const numLayers = layerColors.length;
  const cubeSize = 3.0;
  const layerHeight = cubeSize / numLayers;
  const spacing = 1.5;
  const layerPositions = Array.from({ length: numLayers }, (_, i) => {
    const yFactor = ((numLayers - 1 - i) - (numLayers - 1) / 2);
    return yFactor * (layerHeight + spacing);
  });

  const animationKeyframes = [0.2, 0.25, 0.4, 0.45, 0.6, 0.65, 0.8, 0.85, 1.0];
  const cameraY = useTransform(scrollYProgress, animationKeyframes, [
    0,
    layerPositions[0], layerPositions[0],
    layerPositions[1], layerPositions[1],
    layerPositions[2], layerPositions[2],
    layerPositions[3], layerPositions[3]
  ]);
  const cameraZ = useTransform(scrollYProgress, animationKeyframes, [
    10,
    5, 10,
    5, 10,
    5, 10,
    5, 10
  ]);

  const cameraX = useRef(0);
  useFrame((state: RootState) => {
    const totalShift = focusProgresses.reduce((acc, curr) => acc + curr, 0);
    cameraX.current = totalShift * 0.5;

    state.camera.position.y = cameraY.get();
    state.camera.position.z = cameraZ.get();
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, cameraX.current, 0.1);
    state.camera.lookAt(0, cameraY.get(), 0);
  });
  return null;
}

function Experience({ scrollYProgress }: ExperienceProps) {
  const groupRef = useRef<Group>(null!);
  const lightRef = useRef<PointLight>(null!);
  const rotateY = useTransform(scrollYProgress, [0, 0.2], [-Math.PI / 6, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.2], [Math.PI / 8, 0]);
  const [focusProgresses, setFocusProgresses] = useState(new Array(4).fill(0));

  const handleFocusProgress = (index: number, value: number) => {
    setFocusProgresses(prev => {
      const newProgresses = [...prev];
      newProgresses[index] = value;
      return newProgresses;
    });
  };

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotateY.get();
      groupRef.current.rotation.x = rotateX.get();
    }
    if (lightRef.current) {
      lightRef.current.position.x = state.mouse.x * 10;
      lightRef.current.position.y = state.mouse.y * 10;
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <pointLight ref={lightRef} color="white" position={[10, 10, 10]} intensity={15} />
      <AnimatedCamera scrollYProgress={scrollYProgress} focusProgresses={focusProgresses} />
      <group ref={groupRef}>
        {layerColors.map((color, i) => (
          <CubeLayer key={i} index={i} color={color} scrollYProgress={scrollYProgress} onFocusProgress={handleFocusProgress} />
        ))}
      </group>
    </>
  );
}

function Scene({ scrollYProgress }: SceneProps) {
  return (
    <Canvas
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh" }}
      camera={{ position: [0, 0, 10], fov: 50 }}
    >
      <Experience scrollYProgress={scrollYProgress} />
    </Canvas>
  );
}

export default function CubeBlock() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

 return (
    <div ref={scrollRef} id="ai-engine" className="relative w-full h-[500vh] bg-black">
      <div className="sticky top-0 h-screen w-full">
        <motion.div
          className="absolute top-[15vh] left-0 w-full text-center text-white text-5xl font-bold"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
        >
          AI Engine w11.01
        </motion.div>
        <Scene scrollYProgress={scrollYProgress} />
        <div className="absolute top-0 left-0 w-full h-screen flex items-center pointer-events-none p-8 md:p-24 z-10">
          <LayerInfo scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </div>
  );
}