import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import './reset.css';

const w = window.innerWidth;
const h = window.innerHeight;

const setupCamera = () => {
  const cameraAngleQuotient = 2.3;
  const cameraAngle = -Math.PI / cameraAngleQuotient;
  const cameraOffsetX = 0;
  const cameraOffsetY = -480;
  const cameraPosX = 0;
  const cameraPosY = 7;
  const cameraPosZ = 5;
  const fov = 60;
  const near = 0.1;
  const far = 1000;

  const camera = new THREE.PerspectiveCamera(fov, w / h, near, far);

  camera.rotateX(cameraAngle);
  camera.position.set(cameraPosX, cameraPosY, cameraPosZ);
  camera.setViewOffset(w, h, cameraOffsetX, cameraOffsetY, w, h);

  return camera;
};

const setupLight = () => {
  const lightColor = 0xffffff;
  const spotLightIntensity = 200;
  const spotLightPosX = 0;
  const spotLightPosY = 7;
  const spotLightPosZ = -3;
  const ambientLightIntensity = 1;

  const spotLight = new THREE.SpotLight(lightColor, spotLightIntensity);
  const ambientLight = new THREE.AmbientLight(lightColor, ambientLightIntensity);

  spotLight.position.set(spotLightPosX, spotLightPosY, spotLightPosZ);

  return {
    spotLight,
    ambientLight
  };
};

const initializeScene = () => {
  const renderer = new THREE.WebGLRenderer();
  const scene = new THREE.Scene();

  const backgroundColor = 0xaaaaaa;

  renderer.setSize(w, h);
  renderer.setClearColor(backgroundColor);
  document.body.appendChild(renderer.domElement);

  return {
    renderer,
    scene
  };
};

const camera = setupCamera();
const { renderer, scene } = initializeScene();
const modelLoader = new GLTFLoader();

const { spotLight, ambientLight } = setupLight();

scene.add(spotLight);
scene.add(ambientLight);

modelLoader.load(
  'public/models/field.glb',
  gltf => scene.add(gltf.scene),
  // eslint-disable-next-line no-console
  error => console.error(error)
);

function animate() {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
