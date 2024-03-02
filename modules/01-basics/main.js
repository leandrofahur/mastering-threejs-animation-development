import * as THREE from "three";

// Define a Scene, Camera and Renderer
const scene = new THREE.Scene();

const sizes = {
  width: 800,
  height: 600,
};
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

// Define a geometry and a material
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);

// Add the mesh to the scene
scene.add(mesh);
