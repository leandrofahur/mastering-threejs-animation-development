import * as THREE from "three";

// 1st: create a scene (you can add the axes helper too):
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// 2nd: create a camera and set its position and add it to the scene:
const sizes = {
  width: 600,
  height: 400,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(0, 0, 3); // <x, y, z>
scene.add(camera);

// 3rd: create a object = geometry + material and add it to the scene:
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "#0000f0",
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 4th: create a renderer:
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement); // add the renderer to the body

// 5th: render the scene:
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// 6th: create an animation loop:
const clock = new THREE.Clock();
const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // update objects
  mesh.position.y = Math.cos(elapsedTime);
  mesh.position.x = Math.sin(elapsedTime);
  // EULER:
  mesh.rotation.y = 3 * elapsedTime;

  // render the scene
  renderer.render(scene, camera);

  // call tick again on the next frame
  window.requestAnimationFrame(animate);
};

animate();
