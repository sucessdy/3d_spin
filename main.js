import * as THREE from 'three';
import "./style.css"
import { gsap } from 'gsap';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
const scene = new THREE.Scene();


const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: "#00ff83" , roughness: .5})

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// size
const sizes = {
  width: window.innerWidth, 
  height: window.innerHeight,
}

// light
const light = new THREE.PointLight(0xffffff, 190, 200); // Increased intensity to 2
light.position.set(0, 10, 10);
light.intensity = 333
scene.add(light);

// camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 1, 20); // Adjust the camera position
camera.lookAt(0, 0, 0); // Look at the center of the scene
scene.add(camera);


// controls

// renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width , sizes.height);
renderer.setPixelRatio(2)
renderer.render(scene, camera);


const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.enablePan = false;
controls.enableRotate = true;
controls.enableZoom = false;
controls.autoRotate = true; 
controls.autoRotateSpeed = 5;

window.addEventListener("resize", () => {
  console.log(window.innerWidth)
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight


  // update camera

  camera.aspect =  sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)

})


const loop = () => { 
  // mesh.position.x += 0.1
  controls.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
} 
loop()

// time line magic
const tl = gsap.timeline({defaults : {duration:  1}})
tl.fromTo(mesh.scale, {z:0, x: 0, y: 0}, {z:1, y: 1, x:1})
tl.fromTo("nav", {y: "-100%"}, {y: "0%"})
tl.fromTo("title",{opacity: 0} , {opacity:1})


// mouse 
 let mouseDown = false;
 let rgb  = []
window.addEventListener("mousedown" , () => (mouseDown = true) )
window.addEventListener("mouseup" , () => (mouseDown = false) )

window.addEventListener("mousemove" ,  (e) => { 
  
if (mouseDown) {
  rgb = [Math.round((e.pageX / sizes.width) * 255) , Math.round((e.pageY / sizes.height) * 255), 150]

  // let animate 
let newColor = new THREE.Color(`rgb(${rgb.join(",")})`) 
gsap.to(mesh.material.color,  {
  r: newColor.r,
  g: newColor.g,
  b : newColor.b })


}

})

