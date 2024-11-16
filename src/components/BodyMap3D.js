import React, { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { setSymptoms } from '../store/healthSlice'

const bodyParts = [
  { id: 'head', name: 'Head', position: [0, 2.7, 0], scale: [0.5, 0.5, 0.5] },
  { id: 'torso', name: 'Torso', position: [0, 1.5, 0], scale: [1, 1.5, 0.5] },
  { id: 'leftArm', name: 'Left Arm', position: [-0.7, 1.5, 0], scale: [0.25, 0.8, 0.25] },
  { id: 'rightArm', name: 'Right Arm', position: [0.7, 1.5, 0], scale: [0.25, 0.8, 0.25] },
  { id: 'leftLeg', name: 'Left Leg', position: [-0.3, -0.3, 0], scale: [0.35, 1.2, 0.35] },
  { id: 'rightLeg', name: 'Right Leg', position: [0.3, -0.3, 0], scale: [0.35, 1.2, 0.35] },
]

function BodyPart({ part, isSelected, onClick }) {
  const mesh = useRef()

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    }
  })

  return (
    <mesh
      position={part.position}
      scale={part.scale}
      ref={mesh}
      onClick={(e) => onClick(e, part.id)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={isSelected ? 'red' : 'lightblue'} />
    </mesh>
  )
}

function BodyModel({ selectedParts, setSelectedParts }) {
  const handleClick = (event, partId) => {
    event.stopPropagation()
    setSelectedParts((prev) =>
      prev.includes(partId) ? prev.filter((id) => id !== partId) : [...prev, partId]
    )
  }

  return (
    <group>
      {bodyParts.map((part) => (
        <BodyPart
          key={part.id}
          part={part}
          isSelected={selectedParts.includes(part.id)}
          onClick={handleClick}
        />
      ))}
    </group>
  )
}

function BodyMap3D() {
  const [selectedParts, setSelectedParts] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const symptoms = selectedParts
      .map((id) => bodyParts.find((part) => part.id === id)?.name)
      .filter(Boolean)
      .join(', ')
    dispatch(setSymptoms(symptoms))
  }, [selectedParts, dispatch])

  return (
    <div className="w-full h-[600px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <BodyModel selectedParts={selectedParts} setSelectedParts={setSelectedParts} />
        <OrbitControls enablePan={false} />
      </Canvas>
      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Selected Areas:</h3>
        <p>
          {selectedParts
            .map((id) => bodyParts.find((part) => part.id === id)?.name)
            .filter(Boolean)
            .join(', ') || 'None'}
        </p>
      </div>
    </div>
  )
}

export default BodyMap3D