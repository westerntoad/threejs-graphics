import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

var canvas, scene, camera, renderer, controls, loader;
function initScene() {
  canvas = document.querySelector('#c');
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000 );
  renderer = new THREE.WebGLRenderer({canvas});
  controls = new OrbitControls(camera, renderer.domElement);
  loader = new THREE.TextureLoader();

  camera.position.z = 100;
  renderer.setSize( canvas.clientWidth, canvas.clientHeight );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setClearColor(new THREE.Color('#414444'), 1);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 50;
  controls.maxDistance = 120;
  controls.maxPolarAngle = Math.PI / 1.5;
  document.body.appendChild( renderer.domElement );
}

var particleCount, particles, snowman;
function initGeometry() {
  var material = new THREE.MeshBasicMaterial({
    color: 0xdddddd
  });
  var geometry = new THREE.SphereGeometry(15, 32, 16)
  snowman = new THREE.Mesh(geometry, material);
  
  var material = new THREE.MeshBasicMaterial({
    color: 0x000000
  });
  var geometry = new THREE.SphereGeometry(2.25, 32, 16);
  var eye = new THREE.Mesh(geometry, material);
  eye.position.x = 12;
  eye.position.y = 6.5;
  eye.position.z = -5.2;
  snowman.add(eye);
  var eye = new THREE.Mesh(geometry, material);
  eye.position.x = 12;
  eye.position.y = 6.5;
  eye.position.z = 5.2;
  snowman.add(eye);
  var material = new THREE.MeshBasicMaterial({
    color: 0xffae00
  });
  var geometry = new THREE.ConeGeometry(3.5, 18, 32);
  var nose = new THREE.Mesh(geometry, material);
  nose.position.x = 20;
  nose.rotation.z = 270 * (Math.PI / 180);
  snowman.add(nose);
  snowman.scale.x = snowman.scale.y = snowman.scale.z = 1.05;
  scene.add(snowman);




  var texture = loader.load('./particle.png');
  var material = new THREE.PointsMaterial({
    size: 0.5,
    map: texture,
    transparent: true
  });
  particleCount = 5000 * 3;
  var posArray = new Float32Array(particleCount * 3);

  for(let i = 0; i < particleCount * 3; i += 3) {
    posArray[i    ] = 100 - (Math.random() * 200);
    posArray[i + 1] = 100 - (Math.random() * 200);
    posArray[i + 2] = 100 - (Math.random() * 200);
  }
  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
}


function render(time) {
  const positionAttribute = particles.geometry.getAttribute('position');
  const vertex = new THREE.Vector3();
  for ( let i = 0; i < particleCount; i++) {
    vertex.fromBufferAttribute(positionAttribute, i);

    if(vertex.y < -100) {
      vertex.y = 100;
    } else {
      vertex.y -= 0.3
    }
    
    if(vertex.x < -100) {
      vertex.x = 100;
    } else {
      vertex.x -= 0.05;
    }

    positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }
  particles.geometry.attributes.position.needsUpdate = true;

  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

function initListeners() {
  window.addEventListener( 'resize', onWindowResize, false );
  function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }
}


initScene();
initGeometry();
initListeners();
render();