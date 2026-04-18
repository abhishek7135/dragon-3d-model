import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Html, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { MathUtils } from "three";

const modelPath = `${import.meta.env.BASE_URL}models/dragon.glb`;

function getSceneConfig(width, height) {
  const isShortScreen = height < 760;

  if (width <= 480) {
    return {
      camera: { position: [0, 1.2, 8.8], fov: 44 },
      modelScale: 1.18,
      modelPosition: [0, -1.15, 0]
    };
  }

  if (width <= 768) {
    return {
      camera: { position: [0, 1.35, 8.2], fov: 40 },
      modelScale: isShortScreen ? 1.35 : 1.48,
      modelPosition: [0, -1, 0]
    };
  }

  if (width <= 1024) {
    return {
      camera: { position: [0, 1.55, 7.6], fov: 37 },
      modelScale: isShortScreen ? 1.65 : 1.82,
      modelPosition: [0, -0.85, 0]
    };
  }

  return {
    camera: { position: [0, 1.8, 7.2], fov: 34 },
    modelScale: 2.1,
    modelPosition: [0, -0.7, 0]
  };
}

function getInitialSceneConfig() {
  if (typeof window === "undefined") {
    return getSceneConfig(1440, 900);
  }

  return getSceneConfig(window.innerWidth, window.innerHeight);
}

function DragonModel({ targetRotation, modelScale, modelPosition }) {
  const groupRef = useRef(null);
  const { scene } = useGLTF(modelPath);

  useFrame(() => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y = MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation,
      0.045
    );
    groupRef.current.rotation.x = MathUtils.lerp(
      groupRef.current.rotation.x,
      -0.08,
      0.045
    );
  });

  return (
    <group ref={groupRef} position={modelPosition}>
      <Center>
        <primitive object={scene} scale={modelScale} />
      </Center>
    </group>
  );
}

function SceneLoader() {
  return (
    <Html center>
      <div className="loader">Summoning dragon...</div>
    </Html>
  );
}

function DragonCanvas({ rotation, sceneConfig }) {
  return (
    <Canvas
      camera={sceneConfig.camera}
      className="scene-canvas"
      shadows
      dpr={[1, 1.5]}
    >
      <color attach="background" args={["#090411"]} />
      <fog attach="fog" args={["#090411", 8, 17]} />
      <ambientLight intensity={1.2} />
      <directionalLight
        castShadow
        color="#ffd18f"
        intensity={2.8}
        position={[4, 8, 5]}
      />
      <directionalLight color="#7db8ff" intensity={1.8} position={[-6, 3, -3]} />
      <pointLight color="#ff7a45" intensity={16} position={[0, -0.5, 2]} />
      <Suspense fallback={<SceneLoader />}>
        <DragonModel
          targetRotation={rotation}
          modelScale={sceneConfig.modelScale}
          modelPosition={sceneConfig.modelPosition}
        />
      </Suspense>
    </Canvas>
  );
}

function clampProgress(value) {
  return Math.min(Math.max(value, 0), 1);
}

const sections = [
  {
    eyebrow: "Section 01",
    title: "Awaken the Dragon",
    copy:
      "Start scrolling and the dragon eases in from the left, staying locked into the scene while the page glides past."
  },
  {
    eyebrow: "Section 02",
    title: "Hold the Gaze",
    copy:
      "Midway through the page, the model faces forward with a gentle cinematic drift to keep the motion feeling alive."
  },
  {
    eyebrow: "Section 03",
    title: "Finish on the Right",
    copy:
      "By the final panel, the dragon completes its slow turn to the right, creating a clean scroll-driven story arc."
  }
];

export default function App() {
  const [rotation, setRotation] = useState(-0.8);
  const [sceneConfig, setSceneConfig] = useState(getInitialSceneConfig);

  useEffect(() => {
    let animationFrame = 0;

    const syncScene = () => {
      animationFrame = 0;
      setSceneConfig(getSceneConfig(window.innerWidth, window.innerHeight));

      const scrollRange =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;
      const clamped = clampProgress(progress);
      const nextRotation = MathUtils.lerp(-0.8, 0.8, clamped);

      setRotation(nextRotation);
    };

    const requestSync = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(syncScene);
    };

    requestSync();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, []);

  return (
    <main className="app-shell">
      <div className="scene-shell">
        <DragonCanvas rotation={rotation} sceneConfig={sceneConfig} />
        <div className="scene-glow scene-glow-left" />
        <div className="scene-glow scene-glow-right" />
        <div className="scene-overlay" />
      </div>

      <div className="content-shell">
        {sections.map((section) => (
          <section className="panel" key={section.title}>
            <div className="panel-card">
              <p className="eyebrow">{section.eyebrow}</p>
              <h1>{section.title}</h1>
              <p className="copy">{section.copy}</p>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

useGLTF.preload(modelPath);
