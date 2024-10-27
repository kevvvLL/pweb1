"use client";

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EdgesGeometry } from 'three';
    import { AsciiEffect } from 'three/examples/jsm/Addons.js';


const ThreeJSLightPolyhedron: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // 定义新的渲染尺寸（视口大小）
        const width = window.innerWidth * 0.5;  // 使用窗口宽度的40%
        const height = window.innerHeight * 0.5;  // 使用窗口高度的40%

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        camera.position.z = 5;  // 将相机拉近

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);

        const characters = [' ', '$', '.', 'X', '+', '#'];
        const effect = new AsciiEffect(renderer, characters.join(''), { invert: false, resolution: 0.15 });
        effect.setSize(width, height);
        effect.domElement.style.color = 'black';
        effect.domElement.style.backgroundColor = 'white';
        mountRef.current.appendChild(effect.domElement);

        const cubeGeometry = new THREE.BoxGeometry(2, 2.5, 2);
        const triangleGeometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            -1, -1, 0,  // 左下角
            1, -1, 0,   // 右下角
            1, 1, 0,    // 右上角
            -1, -1, 0,  // 左下角（重复）
            1, 1, 0,    // 右上角（重复）
            -1, 1, 0    // 左上角
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

        const animate = () => {
            requestAnimationFrame(animate);

            edges.rotation.x += 0.003;
            edges.rotation.y += 0.003;

            edges.position.y += bounceSpeed * bounceDirection;
            if (edges.position.y > maxBounceHeight || edges.position.y < -maxBounceHeight) {
                bounceDirection *= -1;
            }

            effect.render(scene, camera);
        };
        animate();

        // 处理窗口大小变化
        const handleResize = () => {
            const newWidth = window.innerWidth * 0.1;
            const newHeight = window.innerHeight * 0.4;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
            effect.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

       
    }, []);

    return (
        <div 
            ref={mountRef} 
            style={{ 
                width: '0%', 
                height: '50vh', 
                backgroundColor: 'white', 
                margin: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }} 
        />
    );
};

export default ThreeJSLightPolyhedron;
