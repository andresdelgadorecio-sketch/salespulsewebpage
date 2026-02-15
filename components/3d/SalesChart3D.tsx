"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Box, Text, Float, Environment } from "@react-three/drei"
import * as THREE from "three"

// Data for the chart
const data = [0.4, 0.6, 0.45, 0.7, 0.85, 0.6, 0.75, 0.9]

function Bar({ height, position, index }: { height: number; position: [number, number, number]; index: number }) {
    const mesh = useRef<THREE.Mesh>(null!)
    const targetHeight = height * 2.5 // Scale factor

    useFrame((state, delta) => {
        // Animate height scaling on load
        if (mesh.current.scale.y < targetHeight) {
            mesh.current.scale.y = THREE.MathUtils.lerp(mesh.current.scale.y, targetHeight, delta * 3)
        }
        // Subtle float/hover effect
        mesh.current.position.y = (mesh.current.scale.y / 2) - 1.5 // Anchor to bottom
    })

    return (
        <group position={position}>
            <Box ref={mesh} args={[0.25, 1, 0.25]} scale={[1, 0.1, 1]}> {/* Start flat */}
                <meshPhysicalMaterial
                    color="#3b82f6"
                    emissive="#3b82f6"
                    emissiveIntensity={0.5}
                    roughness={0.2}
                    metalness={0.8}
                    transparent
                    opacity={0.8}
                    transmission={0.2}
                    thickness={1}
                />
            </Box>
            {/* Label (Optional, maybe too small for this view) */}
        </group>
    )
}

export function SalesChart3D() {
    return (
        <div className="w-full h-full min-h-[160px]">
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
                <pointLight position={[-10, -5, -10]} intensity={1} color="#3b82f6" />

                <group position={[-1.5, 0, 0]}>
                    {data.map((h, i) => (
                        <Bar
                            key={i}
                            height={h}
                            index={i}
                            position={[i * 0.45, -1, 0]}
                        />
                    ))}
                </group>

                {/* Floating Particles for atmosphere */}
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.2}>
                    <Environment preset="city" />
                </Float>
            </Canvas>
        </div>
    )
}
