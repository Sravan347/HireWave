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

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += (targetRotationX - cube.rotation.x) * 0.05;
      cube.rotation.y += (targetRotationY - cube.rotation.y) * 0.05;
      cube.rotation.z += 0.002;

      const t = Date.now() * 0.001;
      pointLight1.position.x = Math.sin(t * 0.7) * 10;
      pointLight1.position.z = Math.cos(t * 0.7) * 10;
      pointLight2.position.x = Math.sin(t * 0.7 + Math.PI) * 10;
      pointLight2.position.z = Math.cos(t * 0.7 + Math.PI) * 10;

      camera.position.y = scrollY * 2;
      camera.position.z = 5 - scrollY * 2;
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
