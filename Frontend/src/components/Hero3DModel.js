import React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, PresentationControls, Environment, ContactShadows, Stage } from "@react-three/drei";

function BoxModel(props) {
  const { scene } = useGLTF("/box.glb");
  
  // Traverse the model to fix materials and add a cardboard tint if it's rendering white
  scene.traverse((child) => {
    if (child.isMesh && child.material) {
      child.castShadow = true;
      child.receiveShadow = true;
      // Set roughness for cardboard look
      child.material.roughness = 0.9;
      child.material.metalness = 0.1;
      
      // If the material color is very bright/white, tint it to a cardboard color
      if (child.material.color.r > 0.9 && child.material.color.g > 0.9 && child.material.color.b > 0.9) {
        child.material.color.set("#d4ad7e"); // Classic cardboard brown
      }
    }
  });

  return <primitive object={scene} {...props} />;
}

export default function Hero3DModel() {
  return (
    <div style={{ height: "100%", width: "100%", minHeight: "400px" }}>
      <Canvas dpr={[1, 2]} camera={{ fov: 45 }} shadows>
        <PresentationControls
          speed={1.5}
          global
          zoom={0.8}
          polar={[-0.1, Math.PI / 4]}
          rotation={[0, -Math.PI / 6, 0]}
        >
          <Stage environment="city" intensity={0.4} shadows="contact">
            <BoxModel />
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  );
}
