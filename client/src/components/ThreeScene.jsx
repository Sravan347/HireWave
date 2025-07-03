// src/components/ThreeScene.jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import logoURL from '../assets/logo.png'; // ✅ import the texture



const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x8e44ad);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0x404040, 0.6));

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(2048, 2048);
    scene.add(dirLight);

    const pointLight1 = new THREE.PointLight(0x00ff88, 0.8, 100);
    pointLight1.position.set(-10, 0, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff0088, 0.8, 100);
    pointLight2.position.set(10, 0, 10);
    scene.add(pointLight2);

    // Load texture using JS Image
    const loader = new THREE.TextureLoader();
    const texture = loader.load(logoURL);

    // Cube
    const geometry = new RoundedBoxGeometry(2, 2, 2, 10, 0.3);
    const material = new THREE.MeshPhysicalMaterial({
      map: texture,
      color: 0xffffff,
      metalness: 0.4,
      roughness: 0.2,
      transparent: true,
      opacity: 0.98,
      envMapIntensity: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.8,
    });

    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 3;
    controls.maxDistance = 20;

    // Mouse & Scroll Effects
    let mouseX = 0, mouseY = 0;
    let targetRotationX = 0, targetRotationY = 0;
    let scrollY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) / window.innerWidth;
      mouseY = (event.clientY - window.innerHeight / 2) / window.innerHeight;
      targetRotationX = mouseY * 0.3;
      targetRotationY = mouseX * 0.3;
    };

    const handleScroll = (event) => {
      scrollY += event.deltaY * 0.001;
      scrollY = Math.max(-2, Math.min(4, scrollY));
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('wheel', handleScroll);

    // Animate - beautiful floating, bouncing, and smooth rotation
    let lastTime = performance.now();
    const animate = () => {
      requestAnimationFrame(animate);
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Smoothly rotate with a gentle bounce and float
      const t = now * 0.001;
      // Floating up and down
      cube.position.y = Math.sin(t * 1.2) * 0.4;
      // Gentle scale pulse
      const scale = 1 + Math.sin(t * 2.1) * 0.04;
      cube.scale.set(scale, scale, scale);
      // Smooth rotation with some wobble
      cube.rotation.x += (targetRotationX - cube.rotation.x) * 0.08 + Math.sin(t * 1.5) * 0.003;
      cube.rotation.y += (targetRotationY - cube.rotation.y) * 0.08 + Math.cos(t * 1.2) * 0.003;
      cube.rotation.z += 0.01 * Math.sin(t * 0.7);

      // Animate lights in a circle
      pointLight1.position.x = Math.sin(t * 0.7) * 10;
      pointLight1.position.z = Math.cos(t * 0.7) * 10;
      pointLight2.position.x = Math.sin(t * 0.7 + Math.PI) * 10;
      pointLight2.position.z = Math.cos(t * 0.7 + Math.PI) * 10;

      // Camera gentle dolly in/out with scroll
      camera.position.y = scrollY * 2 + Math.sin(t * 0.5) * 0.1;
      camera.position.z = 5 - scrollY * 2 + Math.cos(t * 0.3) * 0.1;
      camera.lookAt(scene.position);

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('wheel', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default ThreeScene;
