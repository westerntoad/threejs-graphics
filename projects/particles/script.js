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

var geometry, red, blue, redCube, blueCube;
var points, pMaterial, particleGeometry, particles;
function initGeometry() {
  geometry = new THREE.BoxGeometry(40, 40, 40);
  red = new THREE.MeshLambertMaterial( { color: 0xff0000, } );
  blue = new THREE.MeshLambertMaterial( { color: 0x00ff00, } );
  redCube = new THREE.Mesh( geometry, red );
  blueCube = new THREE.Mesh(geometry, blue);
  scene.add(redCube);
  scene.add(blueCube);
  redCube.position.x = 50;
  blueCube.position.x = -50;

  points = [];

  points.push( new THREE.Vector3(10, 0, 0) );
  points.push( new THREE.Vector3(0, 0, 0) );
  points.push( new THREE.Vector3(10, 10, 0) );
  points.push( new THREE.Vector3(0, 10, 0) );

  particleGeometry = new THREE.BufferGeometry().setFromPoints(points);

  pMaterial = new THREE.PointsMaterial({
    color: 0xFF00FF,
    size: 5
  });

  particles = new THREE.Points(particleGeometry, pMaterial);
  scene.add(particles);
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

  redCube.rotation.x = time * 0.3;
  redCube.rotation.y = time * 0.7;

  blueCube.rotation.x = time * 0.6;
  blueCube.rotation.y = time * 0.9;

  var particleVel = new THREE.Vector2(1, 1);

  particles.geometry.attributes.position.setX(0, particles.geometry.attributes.position.getX(0) + particleVel);

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
    if(event.keyCode === 68) {
      
    }
  }); 
}


initScene();
initGeometry();
initLights();
initListeners();
render();