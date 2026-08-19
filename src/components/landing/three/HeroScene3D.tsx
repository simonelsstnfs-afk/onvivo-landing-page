import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroScene3DProps {
  className?: string;
}

export const HeroScene3D: React.FC<HeroScene3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let isRunning = true;
    let animationFrameId: number | null = null;
    let time = 0;

    // Configuración
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Escena y Niebla
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0f19, 0.0018);

    // 2. Cámara
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1200);
    camera.position.set(0, 0, 320);

    // 3. Renderer con DPR limitado a 1.5 para eficiencia
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    const clampedDpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(clampedDpr);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    // Generar textura procedural de partícula
    const genTexture = () => {
      const texCanvas = document.createElement('canvas');
      texCanvas.width = 64;
      texCanvas.height = 64;
      const ctx = texCanvas.getContext('2d');
      if (!ctx) return null;
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
      gradient.addColorStop(0.2, 'rgba(226, 232, 255, 0.85)');
      gradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.45)');
      gradient.addColorStop(0.85, 'rgba(168, 85, 247, 0.15)');
      gradient.addColorStop(1.0, 'rgba(11, 15, 25, 0.0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      const texture = new THREE.CanvasTexture(texCanvas);
      texture.needsUpdate = true;
      return texture;
    };

    // 4. Partículas
    const count = 450;
    const bounds = { x: 850, y: 520, z: 420 };
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const palette = [
      { r: 0.0, g: 0.94, b: 1.0, weight: 0.45 },   // Cyan #00F0FF
      { r: 0.66, g: 0.33, b: 0.97, weight: 0.30 }, // Purple #A855F7
      { r: 0.92, g: 0.28, b: 0.60, weight: 0.15 }, // Pink #EC4899
      { r: 0.06, g: 0.72, b: 0.50, weight: 0.10 }, // Emerald #10B981
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * bounds.x;
      const y = (Math.random() - 0.5) * bounds.y;
      const z = (Math.random() - 0.5) * bounds.z;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      const rand = Math.random();
      let chosenColor = palette[0];
      let acc = 0;
      for (const item of palette) {
        acc += item.weight;
        if (rand <= acc) {
          chosenColor = item;
          break;
        }
      }

      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;

      sizes[i] = 3.8 + (Math.random() * 2.2 - 1.1);
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleTexture = genTexture();
    const particleMaterial = new THREE.PointsMaterial({
      size: 3.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: particleTexture || null,
    });

    const particlesMesh = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particlesMesh);

    // 5. Malla de conexiones de proximidad
    const maxConnectionsPerParticle = 3;
    const maxLines = count * maxConnectionsPerParticle * 2;
    const maxVertices = maxLines * 2;
    const linePositions = new Float32Array(maxVertices * 3);
    const lineColors = new Float32Array(maxVertices * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // Estado del cursor
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, isInside: false };

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouse.targetX = (x / rect.width) * 2 - 1;
      mouse.targetY = -(y / rect.height) * 2 + 1;
      mouse.isInside = true;
    };

    const onMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
      mouse.isInside = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        mouse.targetX = (x / rect.width) * 2 - 1;
        mouse.targetY = -(y / rect.height) * 2 + 1;
        mouse.isInside = true;
      }
    };

    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    };

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // IntersectionObserver para pausar cuando no esté visible en pantalla
    let isElementInViewport = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isElementInViewport = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Animación
    const animate = () => {
      if (!isRunning) return;
      animationFrameId = requestAnimationFrame(animate);

      if (!isElementInViewport || document.visibilityState !== 'visible') return;

      time += 0.0022;

      // Suavizado del cursor
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Parallax sutil de la cámara
      camera.position.x += (mouse.x * 25.0 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 20.0 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      // Simulación de ondas en partículas
      const mouseWorldX = mouse.x * 350;
      const mouseWorldY = mouse.y * 220;
      const repelDistSq = 150 * 150;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const waveY =
          Math.sin(originalPositions[i3] * 0.0012 + time) * 22.0 +
          Math.cos(originalPositions[i3 + 2] * 0.0028 + time * 1.3) * 12.0 +
          Math.sin((originalPositions[i3] + originalPositions[i3 + 1]) * 0.005 + time * 0.8) * 6.5;

        let targetY = originalPositions[i3 + 1] + waveY;
        let targetX = originalPositions[i3] + Math.sin(time * 0.5 + i) * 8.0;
        let targetZ = originalPositions[i3 + 2] + Math.cos(time * 0.6 + i) * 6.0;

        if (mouse.isInside) {
          const dx = positions[i3] - mouseWorldX;
          const dy = positions[i3 + 1] - mouseWorldY;
          const distSq = dx * dx + dy * dy;
          if (distSq < repelDistSq && distSq > 0.001) {
            const force = (1 - distSq / repelDistSq) * 35.0;
            const dist = Math.sqrt(distSq);
            targetX += (dx / dist) * force;
            targetY += (dy / dist) * force;
            targetZ += force * 0.5;
          }
        }

        positions[i3] += (targetX - positions[i3]) * 0.08;
        positions[i3 + 1] += (targetY - positions[i3 + 1]) * 0.08;
        positions[i3 + 2] += (targetZ - positions[i3 + 2]) * 0.08;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Actualizar líneas de proximidad
      const maxDistance = 78;
      const maxDistSq = maxDistance * maxDistance;
      let vertexIndex = 0;
      const maxV = linePositions.length / 3;

      for (let i = 0; i < count; i++) {
        let connections = 0;
        const i3 = i * 3;
        const xi = positions[i3];
        const yi = positions[i3 + 1];
        const zi = positions[i3 + 2];

        for (let j = i + 1; j < count; j++) {
          if (connections >= maxConnectionsPerParticle) break;
          if (vertexIndex + 6 > maxV) break;

          const j3 = j * 3;
          const dx = xi - positions[j3];
          const dy = yi - positions[j3 + 1];
          const dz = zi - positions[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistSq) {
            const alpha = 1.0 - Math.sqrt(distSq) / maxDistance;
            const vIdx3 = vertexIndex * 3;

            linePositions[vIdx3] = xi;
            linePositions[vIdx3 + 1] = yi;
            linePositions[vIdx3 + 2] = zi;

            lineColors[vIdx3] = colors[i3] * alpha;
            lineColors[vIdx3 + 1] = colors[i3 + 1] * alpha;
            lineColors[vIdx3 + 2] = colors[i3 + 2] * alpha;

            linePositions[vIdx3 + 3] = positions[j3];
            linePositions[vIdx3 + 4] = positions[j3 + 1];
            linePositions[vIdx3 + 5] = positions[j3 + 2];

            lineColors[vIdx3 + 3] = colors[j3] * alpha;
            lineColors[vIdx3 + 4] = colors[j3 + 1] * alpha;
            lineColors[vIdx3 + 5] = colors[j3 + 2] * alpha;

            vertexIndex += 2;
            connections++;
          }
        }
      }

      lineGeometry.setDrawRange(0, vertexIndex);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
      observer.disconnect();

      particleGeometry.dispose();
      particleMaterial.dispose();
      if (particleTexture) particleTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-auto overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Background Gradients Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/30 via-transparent to-[#0B0F19] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] bg-gradient-to-r from-[#00F0FF]/15 via-[#A855F7]/15 to-[#EC4899]/10 blur-[130px] rounded-full pointer-events-none" />
    </div>
  );
};
