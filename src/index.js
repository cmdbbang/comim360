import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Suspense, useRef } from 'react'
import { Canvas, extend, useFrame, useThree, useLoader } from 'react-three-fiber'
import { Html, OrbitControls, Loader } from '@react-three/drei'
import './styles.css'

function Controls(props) {
  const { camera, gl } = useThree()
  const ref = useRef()
  useFrame(() => ref.current.update())
  return <orbitControls ref={ref} target={[0, 0, 0]} {...props} args={[camera, gl.domElement]} />
}

function Dome() {
  const texture = useLoader(THREE.TextureLoader, '/final.jpg')
  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[3, 60, 40]} />
      <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} transparent opacity={1} />
    </mesh>
  )
}

ReactDOM.render(
  <>
    <p style={{ position: 'absolute', color: 'white', height: '20px', textAlign: 'center', width: '100%', zIndex: 1 }}>
      COMim 360 SPHERE PANORAMA_PHOTO + TEXT
    </p>
    <p style={{ position: 'absolute', color: 'white', height: '20px', textAlign: 'center', width: '100%', zIndex: 1, bottom: 0, fontWeight: 100 }}>
      A healthy diet is one that helps maintain or improve overall health. A healthy diet provides the body with essential nutrition: fluid, macronutrients,
      micronutrients, and adequate calories.
    </p>
    <Canvas camera={{ position: [0, 0, 0.1] }}>
      <OrbitControls enableZoom={true} enablePan={false} enableDamping dampingFactor={0.2} autoRotate={false} rotateSpeed={-0.5} />

      <mesh position={[-3, 0.5, -2]}>
        <sphereBufferGeometry args={[0.1, 0.1, 0.1]} attach="geometry" />
        <meshBasicMaterial color="red" attach="material" />
      </mesh>
      <Suspense fallback={null}>
        <Dome />
        <group position={[3.5, 0.5, 1]}>
          <mesh>
            <sphereBufferGeometry args={[0.1, 0.1, 0.1]} attach="geometry" />
            <meshBasicMaterial color="cyan" attach="material" />
          </mesh>
          <Html>
            <p style={{ color: 'white', height: '20px', textAlign: 'center' }}>This is something</p>
          </Html>
        </group>

        <group position={[2, -0.5, -2]}>
          <mesh>
            <sphereBufferGeometry args={[0.1, 0.1, 0.1]} attach="geometry" />
            <meshBasicMaterial color="blue" attach="material" />
          </mesh>
          <Html>
            <p style={{ color: 'white', height: '20px', textAlign: 'center' }}>This is something</p>
          </Html>
        </group>
      </Suspense>
    </Canvas>
  </>,
  document.getElementById('root')
)
