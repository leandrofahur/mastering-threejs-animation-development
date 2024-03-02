import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import { GUI } from "lil-gui";
import "./style.css";

// 1st: create a scene (you can add the axes helper too):
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// 2nd: create a camera and set its position and add it to the scene:
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
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

window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// window.addEventListener("dblclick", () => {
//   if (!document.fullscreenElement) {
//     renderer.domElement.requestFullscreen();
//   } else {
//     document.exitFullscreen();
//   }
// });

// 5th: render the scene:
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// controls:
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// setup a debug UI:
const gui = new GUI();
const parameters = {
  color: "#0000f0",
  wireframe: true,
};

gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});

gui.add(parameters, "wireframe").onChange(() => {
  material.wireframe = parameters.wireframe;
});

gui.add(mesh, "visible");

gui.add(mesh.position, "x").min(-3).max(3).step(0.01).name("x");
gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("y");
gui.add(mesh.position, "z").min(-3).max(3).step(0.01).name("z");

// gui.add(camera.position, "x").min(-3).max(3).step(0.01).name("camera x");
// gui.add(camera.position, "y").min(-3).max(3).step(0.01).name("camera y");
// gui.add(camera.position, "z").min(-3).max(3).step(0.01).name("camera z");

// gui
//   .add(mesh.rotation, "x")
//   .min(-Math.PI)
//   .max(Math.PI)
//   .step(0.01)
//   .name("rotation x");
// gui
//   .add(mesh.rotation, "y")
//   .min(-Math.PI)
//   .max(Math.PI)
//   .step(0.01)
//   .name("rotation y");
// gui
//   .add(mesh.rotation, "z")
//   .min(-Math.PI)
//   .max(Math.PI)
//   .step(0.01)
//   .name("rotation z");

const debugObject = {};
debugObject.spin = () => {
  gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
};
gui.add(debugObject, "spin");

debugObject.subdivision = 2;
gui
  .add(debugObject, "subdivision")
  .min(2)
  .max(10)
  .step(1)
  .onFinishChange(() => {
    const newGeometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivision,
      debugObject.subdivision,
      debugObject.subdivision
    );
    mesh.geometry = newGeometry;
  });

// 6th: create an animation loop:
const animate = () => {
  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();
