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
const meshAxesHelper = new THREE.AxesHelper();
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "#0000f0",
  wireframe: true,
});
const mesh = new THREE.Mesh(boxGeometry, material);
mesh.add(meshAxesHelper);
scene.add(mesh);

// 4th: create a renderer:
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement); // add the renderer to the body

// add an eevent listener to the window change the camera position:
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// 5th: render the scene:
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// 6th: create an animation loop:
const clock = new THREE.Clock();
const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // update objects
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  camera.position.y = cursor.y * 5;
  camera.lookAt(mesh.position);

  // render the scene
  renderer.render(scene, camera);

  // call tick again on the next frame
  window.requestAnimationFrame(animate);
};

animate();
