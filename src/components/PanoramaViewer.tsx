import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Box } from "@react-three/drei";
import * as THREE from "three";

const PanoramaViewer = ({ imageUrl, view }) => {
    const texture: any = new THREE.TextureLoader().load(imageUrl);
    // console.log("texture", texture);
    if (view === "sphere") {
        return (
            <Canvas camera={{ position: [0, 0, 2], fov: 20 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} />

                {/* Sphere with Inverted Normals (to show image from inside) */}
                <Sphere args={[5, 60, 40]} scale={[-1, 1, 1]}>
                    <meshBasicMaterial map={texture} side={THREE.BackSide} />
                </Sphere>

                {/* Allows user to rotate the scene */}
                <OrbitControls
                    enableZoom={true}
                    zoomSpeed={0.5}   // Faster zooming
                    minDistance={0} // Ultra close zoom-in
                    maxDistance={15}      // Prevents zooming too far out
                    enablePan={false}
                    maxPolarAngle={Math.PI - 0.1}
                    minPolarAngle={0.1}
                />

                  {/* <OrbitControls  enableZoom={false} /> */}
            </Canvas>
        );
    } else if (view === "cube") {
        return (
            <Canvas camera={{ position: [2, 2, 2] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} />

                {/* Cube with the same image on all six sides */}
                <Box args={[2, 2, 2]}>
                    {[...Array(6)].map((_, index) => (
                        <meshBasicMaterial key={index} attach={`material-${index}`} map={texture} />
                    ))}
                </Box>

                {/* Enables dragging to look around */}
                <OrbitControls />
            </Canvas>
        );
    }
};

export default PanoramaViewer;

