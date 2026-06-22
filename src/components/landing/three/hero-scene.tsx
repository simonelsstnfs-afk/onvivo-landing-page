
import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Icosahedron, Torus, Sparkles, Stars } from '@react-three/drei'
import * as THREE from 'three'

/* ============ Animated wireframe icosahedron core ============ */
function CoreShape() {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15
      meshRef.current.rotation.y = t * 0.2
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.1
      wireRef.current.rotation.y = -t * 0.15
      const s = 1 + Math.sin(t * 0.8) * 0.04
      wireRef.current.scale.setScalar(s)
    }
  })

  return (
    <group>
      {/* Inner solid distorted icosahedron */}
      <Icosahedron ref={meshRef} args={[1.1, 1]}>
        <MeshDistortMaterial
          color="#a855f7"
          emissive="#7c3aed"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.85}
          distort={0.35}
          speed={2.5}
        />
      </Icosahedron>

      {/* Outer wireframe shell */}
      <Icosahedron ref={wireRef} args={[1.65, 1]}>
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.55}
        />
      </Icosahedron>

      {/* Outer glow shell */}
      <Icosahedron args={[2.0, 0]}>
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.15}
        />
      </Icosahedron>
    </group>
  )
}

/* ============ Orbiting torus rings ============ */
function OrbitRings() {
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)
  const ring3 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.4
      ring1.current.rotation.y = t * 0.2
    }
    if (ring2.current) {
      ring2.current.rotation.x = -t * 0.3
      ring2.current.rotation.z = t * 0.25
    }
    if (ring3.current) {
      ring3.current.rotation.y = t * 0.35
      ring3.current.rotation.z = -t * 0.2
    }
  })

  return (
    <group>
      <Torus ref={ring1} args={[2.6, 0.015, 16, 100]}>
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.7} />
      </Torus>
      <Torus ref={ring2} args={[3.1, 0.012, 16, 100]}>
        <meshBasicMaterial color="#a855f7" transparent opacity={0.5} />
      </Torus>
      <Torus ref={ring3} args={[3.6, 0.01, 16, 100]}>
        <meshBasicMaterial color="#ec4899" transparent opacity={0.4} />
      </Torus>
    </group>
  )
}

/* ============ Floating particle cubes ============ */
function FloatingParticles() {
  const group = useRef<THREE.Group>(null)

  const cubes = useMemo(() => {
    const items: Array<{ pos: [number, number, number]; size: number; color: string }> = []
    const colors = ['#00f0ff', '#a855f7', '#ec4899', '#22d3ee']
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2
      const radius = 4 + Math.random() * 2
      items.push({
        pos: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 4,
          Math.sin(angle) * radius,
        ],
        size: 0.08 + Math.random() * 0.12,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
    return items
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = t * 0.05
    }
  })

  return (
    <group ref={group}>
      {cubes.map((c, i) => (
        <Float key={i} speed={2 + i * 0.1} rotationIntensity={2} floatIntensity={2}>
          <mesh position={c.pos}>
            <boxGeometry args={[c.size, c.size, c.size]} />
            <meshStandardMaterial
              color={c.color}
              emissive={c.color}
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

/* ============ Mouse parallax controller ============ */
function MouseParallax({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        pointer.x * 0.3,
        0.05
      )
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -pointer.y * 0.2,
        0.05
      )
    }
  })

  return <group ref={group}>{children}</group>
}

/* ============ Main scene ============ */
export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
      <pointLight position={[-10, -10, -5]} intensity={1.2} color="#a855f7" />
      <pointLight position={[0, 5, -10]} intensity={0.8} color="#ec4899" />

      <Stars radius={50} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />

      <MouseParallax>
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
          <CoreShape />
        </Float>
        <OrbitRings />
        <FloatingParticles />
      </MouseParallax>

      <Sparkles
        count={60}
        scale={10}
        size={3}
        speed={0.3}
        opacity={0.6}
        color="#00f0ff"
      />
    </Canvas>
  )
}

/* ============ Smaller scene for B2B panel section ============ */
function PanelOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15
    }
  })
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.35, 200, 32]} />
        <MeshDistortMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.9}
          distort={0.2}
          speed={3}
        />
      </mesh>
    </Float>
  )
}

export function PanelScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f0ff" />
      <pointLight position={[-5, -5, 2]} intensity={1} color="#a855f7" />
      <PanelOrb />
      <Sparkles count={40} scale={6} size={2} speed={0.4} color="#a855f7" />
    </Canvas>
  )
}
