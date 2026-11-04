/**
 * @file PsychosocialCanvas3D.tsx
 * Visualizador 3D Interativo da Espiral Epigenética do Ciclo Vital de Erikson
 * Utiliza Three.js com proteção para software WebGL (isSoftwareGl) e fallback 2D acessível
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STAGES_DATA } from '../../data/stagesData';
import { PsychosocialStage, StageId } from '../../types/stage';
import { Maximize2, Minimize2, RotateCcw, Info, CheckCircle2 } from 'lucide-react';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  position: relative;
  width: 100%;
  height: 480px;
  background: radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 100%);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #312e81;

  @media (max-width: 640px) {
    height: 380px;
  }
`;

const BottomDock = styled.div<{ $collapsed?: boolean }>`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: min(880px, 94%);
  background: rgba(15, 23, 42, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 0.65rem 1rem;
  color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  z-index: 10;
  transition: transform 0.25s ease;

  ${(props) =>
    props.$collapsed &&
    `
    transform: translate(-50%, calc(100% + 20px));
  `}
`;

interface PsychosocialCanvas3DProps {
  selectedStageId: StageId;
  onSelectStage: (id: StageId) => void;
}

export const PsychosocialCanvas3D: React.FC<PsychosocialCanvas3DProps> = ({
  selectedStageId,
  onSelectStage,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [is3DActive, setIs3DActive] = useState(true);
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const controlsRef = useRef<OrbitControls | null>(null);
  const selectedStageRef = useRef<StageId>(selectedStageId);
  selectedStageRef.current = selectedStageId;

  const currentStage = STAGES_DATA.find((s) => s.id === selectedStageId) || STAGES_DATA[0];

  useEffect(() => {
    if (!is3DActive || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Detecção de Software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Setup Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0f172a, 0.025);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4, 18);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 30;
    controls.minDistance = 5;
    controlsRef.current = controls;

    // 3. Iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 12, 8);
    scene.add(dirLight);

    const bluePointLight = new THREE.PointLight(0x4338ca, 2.5, 25);
    bluePointLight.position.set(0, 0, 0);
    scene.add(bluePointLight);

    // 4. Construção da Espiral Epigenética Procedural (8 Estágios)
    const stageMeshes: { id: StageId; group: THREE.Group }[] = [];
    const spiralRadius = 5.5;
    const spiralHeight = 12;
    const curvePoints: THREE.Vector3[] = [];

    // Gerar curva da espiral
    for (let i = 0; i < 8; i++) {
      const t = i / 7;
      const angle = t * Math.PI * 2.2 - Math.PI;
      const y = (t - 0.5) * spiralHeight;
      const x = Math.cos(angle) * spiralRadius;
      const z = Math.sin(angle) * spiralRadius;
      curvePoints.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.12, 8, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      roughness: 0.3,
      metalness: 0.8,
      emissive: 0x312e81,
      emissiveIntensity: 0.3,
    });
    const spineMesh = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(spineMesh);

    // Adicionar os 8 nós procedurais
    STAGES_DATA.forEach((stage, idx) => {
      const pos = curvePoints[idx];
      const stageGroup = new THREE.Group();
      stageGroup.position.copy(pos);

      // Núcleo central
      const coreGeo = new THREE.SphereGeometry(0.7, 24, 24);
      const isSelected = stage.id === selectedStageRef.current;
      const coreMat = new THREE.MeshStandardMaterial({
        color: isSelected ? 0xf59e0b : new THREE.Color(stage.color),
        roughness: 0.2,
        metalness: 0.5,
        emissive: new THREE.Color(stage.color),
        emissiveIntensity: isSelected ? 0.6 : 0.2,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.userData = { stageId: stage.id };
      stageGroup.add(coreMesh);

      // Anel orbital de tensão
      const ringGeo = new THREE.TorusGeometry(1.2, 0.04, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      stageGroup.add(ringMesh);

      scene.add(stageGroup);
      stageMeshes.push({ id: stage.id, group: stageGroup });
    });

    // 5. Raycasting para clique interativo no nó 3D
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      for (const hit of intersects) {
        if (hit.object.userData?.stageId) {
          const clickedId = hit.object.userData.stageId as StageId;
          onSelectStage(clickedId);
          break;
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // 6. Loop de Renderização com proteção isSoftwareGl
    let frameId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Suave rotação contínua da espiral para dinamismo
      spineMesh.rotation.y = elapsed * 0.08;
      stageMeshes.forEach(({ group }, idx) => {
        const t = idx / 7;
        const angle = t * Math.PI * 2.2 - Math.PI + elapsed * 0.08;
        const y = (t - 0.5) * spiralHeight;
        group.position.x = Math.cos(angle) * spiralRadius;
        group.position.z = Math.sin(angle) * spiralRadius;
        group.position.y = y;
      });

      controls.update();
      renderer.render(scene, camera);

      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
      tubeGeo.dispose();
      tubeMat.dispose();
    };
  }, [is3DActive]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Visualizador Epigenético Interativo
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500">
            {is3DActive ? 'Three.js 3D (Arraste para girar/zoom)' : 'Diagrama 2D Acessível'}
          </span>
        </div>

        <button
          onClick={() => setIs3DActive(!is3DActive)}
          className="text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded border border-indigo-200 transition-colors"
        >
          {is3DActive ? 'Alternar para Modo 2D' : 'Alternar para Espiral 3D'}
        </button>
      </div>

      {is3DActive ? (
        <CanvasContainer ref={mountRef} role="img" aria-label="Espiral 3D dos oito estágios do desenvolvimento">
          {/* Collapsible Bottom Control Dock */}
          <BottomDock $collapsed={dockCollapsed}>
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-mono px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded border border-indigo-800 shrink-0">
                Estágio {currentStage.id}
              </span>
              <div className="truncate">
                <span className="text-xs font-semibold text-white truncate block">
                  {currentStage.name}
                </span>
                <span className="text-[11px] text-slate-400 block truncate">
                  Virtude: <strong className="text-amber-300">{currentStage.virtue}</strong> · {currentStage.agePeriod}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <select
                value={selectedStageId}
                onChange={(e) => onSelectStage(Number(e.target.value) as StageId)}
                className="bg-slate-800 text-xs text-white border border-slate-700 rounded px-2 py-1 focus:outline-none focus:border-indigo-400"
                aria-label="Selecionar estágio"
              >
                {STAGES_DATA.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.id}. {s.name.split(' versus ')[0]}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setDockCollapsed(!dockCollapsed)}
                className="p-1 text-slate-400 hover:text-white"
                title={dockCollapsed ? 'Expandir painel' : 'Recolher painel'}
                aria-label={dockCollapsed ? 'Expandir painel' : 'Recolher painel'}
              >
                {dockCollapsed ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </BottomDock>
        </CanvasContainer>
      ) : (
        /* Accessible 2D Fallback Timeline */
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-900 rounded-xl text-white">
          {STAGES_DATA.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectStage(s.id)}
              className={`p-3 text-left rounded-lg border transition-all ${
                s.id === selectedStageId
                  ? 'bg-indigo-900/60 border-amber-400'
                  : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="text-[11px] text-indigo-300 font-mono mb-1">
                {s.id}º Estágio
              </div>
              <div className="text-xs font-semibold leading-tight line-clamp-1 mb-1">
                {s.name}
              </div>
              <div className="text-[11px] text-amber-300">
                {s.virtue}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
