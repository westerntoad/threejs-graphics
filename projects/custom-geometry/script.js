import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

var canvas, scene, camera, renderer, isDebug;
function initScene() {
  canvas = document.querySelector('#c');
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000 );
  renderer = new THREE.WebGLRenderer({canvas});
  isDebug = false;

  camera.position.z = 100;
  renderer.setSize( canvas.clientWidth, canvas.clientHeight );
  renderer.setPixelRatio( window.devicePixelRatio );
  document.body.appendChild( renderer.domElement );
}

var geometry, material, mesh;
var points, pMaterial, particleGeometry, particles;
function initGeometry() {
  geometry = new THREE.BoxGeometry(40, 40, 40);
  material = new THREE.MeshLambertMaterial( { color: 0xff0000, } );
  mesh = new THREE.Mesh( geometry, material );
  scene.add(mesh);
}

function initLights() {
  var light = new THREE.PointLight(0xFFFF00, 1, 250);
  light.position.set(50, 50, 50);
  scene.add(light);

  var light = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(light)
}


function render(time) {
  time *= 0.001;

  mesh.rotation.x = time * 0.3;
  
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
  
  window.addEventListener('keydown', event => {
    if(event.keyCode === 68) {    // keycode 'd'
      
    }
  }); 
}


initScene();
initGeometry();
initLights();
initListeners();
render();