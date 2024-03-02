import * as THREE from "three";

// 1st: create a scene (you can add the axes helper too):
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// 2nd: create a camera and set its position and add it to the scene:
const sizes = {
  width: 600,
  height: 600,
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
const group = new THREE.Group();

const planet01 = new THREE.Mesh(
  new THREE.SphereGeometry(0.4, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
);
const planet01AxesHelper = new THREE.AxesHelper();
planet01.add(planet01AxesHelper);

planet01.position.x = -1.2;

const planet02 = new THREE.Mesh(
  new THREE.SphereGeometry(0.2, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
);
const planet02AxesHelper = new THREE.AxesHelper();
planet02.add(planet02AxesHelper);

planet02.position.x = 1.2;

group.add(planet01, planet02);
scene.add(group);

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
  // group.rotation.y = elapsedTime;
  planet01.rotation.set(elapsedTime, elapsedTime, 0);
  planet02.rotation.set(0, elapsedTime, elapsedTime);
  camera.position.x = Math.sin(elapsedTime) * 3;
  camera.position.z = Math.cos(elapsedTime) * 3;
  camera.lookAt(group.position);

  // render the scene
  renderer.render(scene, camera);

  // call tick again on the next frame
  window.requestAnimationFrame(animate);
};

animate();
