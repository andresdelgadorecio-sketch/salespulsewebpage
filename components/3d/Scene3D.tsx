"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Float, Stars } from "@react-three/drei"
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm"

function ParticleSphere(props: any) {
    const ref = useRef<any>(null)
    const sphere = useMemo(() => random.inSphere(new Float32Array(3000), { radius: 1.5 }), [])

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10
            ref.current.rotation.y -= delta / 15
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#A855F7"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}

function DataGlow() {
    return (
        <mesh position={[0, 0, -2]}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} />
        </mesh>
    )
}

export function Scene3D() {
    return (
        <div className="absolute inset-0 z-0 opacity-60">
            <Canvas camera={{ position: [0, 0, 3] }}>
                <fog attach="fog" args={['#0f172a', 1, 10]} />
                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <ParticleSphere />
                    <DataGlow />
                </Float>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    )
}
