"use client";

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EdgesGeometry } from 'three';
import { AsciiEffect } from 'three/examples/jsm/Addons.js';


const ThreeJSLightPolyhedron: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const width = window.innerWidth * 0.6;
        const height = window.innerHeight * 0.5;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        camera.position.z = 4;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);

        const characters = [' ', '$', '.', '@', '+', '#'];
        const effect = new AsciiEffect(renderer, characters.join(''), { invert: false, resolution: 0.15 });
        effect.setSize(width, height);
        effect.domElement.style.color = 'black';
        effect.domElement.style.backgroundColor = 'transparent';
        mountRef.current.appendChild(effect.domElement);

        const cubeGeometry = new THREE.BoxGeometry(2, 2.5, 2);
        const triangleGeometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            -1, -1, 0,
            1, -1, 0,
            1, 1, 0,
            -1, -1, 0,
            1, 1, 0,
            -1, 1, 0
        ]);

        triangleGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        const edgesGeometry = new EdgesGeometry(cubeGeometry);
        const edges = new THREE.LineSegments(edgesGeometry, new THREE.LineBasicMaterial({ color: new THREE.Color(0, 0, 0) }));

        scene.add(edges);

        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const mesh = new THREE.Mesh(triangleGeometry, material);

        scene.add(mesh);

        let bounceDirection = 0.1;
        const bounceSpeed = 0.03;
        const maxBounceHeight = 0.4;
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            edges.rotation.x += 0.003;
            edges.rotation.y += 0.003;

            edges.position.y += bounceSpeed * bounceDirection;
            if (edges.position.y > maxBounceHeight || edges.position.y < -maxBounceHeight) {
                bounceDirection *= -1;
            }

            effect.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            const newWidth = window.innerWidth * 0.6;
            const newHeight = window.innerHeight * 0.5;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
            effect.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            scene.clear();
            cubeGeometry.dispose();
            triangleGeometry.dispose();
            edgesGeometry.dispose();
            material.dispose();
            renderer.dispose();
            if (effect.domElement && effect.domElement.parentNode) {
                effect.domElement.parentNode.removeChild(effect.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="w-full flex justify-center items-center overflow-hidden"
        />
    );
};

export default ThreeJSLightPolyhedron;
