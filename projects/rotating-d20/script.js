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
  renderer.setPixelRatio( window.devicePixelRatio / 6);
  document.body.appendChild( renderer.domElement );
}

var geometry, material, cube;
var points, lineGeom, lineMaterial, line;
function initGeometry() {
  geometry = new THREE.IcosahedronGeometry(20);
  material = new THREE.MeshNormalMaterial( {wireframe: true} );
  cube = new THREE.Mesh( geometry, material );
  scene.add( cube );


  points = [];
  points.push( new THREE.Vector3(10, 0, 0) );
  points.push( new THREE.Vector3(0, 0, 0) );

  lineGeom = new THREE.BufferGeometry().setFromPoints(points);

  lineMaterial = new THREE.LineBasicMaterial({
    color: 0x0000ff
  });

  line = new THREE.Line(lineGeom, lineMaterial);
  if(isDebug)
    scene.add(line);
}

function initLights() {
  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 0, 1, 0 );
  scene.add( light );

  var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
  light.position.set( 0, -1, 0 );
  scene.add( light );

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 1, 0, 0 );
  scene.add( light );

  var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
  light.position.set( 0, 0, 1 );
  scene.add( light );

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 0, 0, -1 );
  scene.add( light );

  var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
  light.position.set( -1, 0, 0 );
  scene.add( light );
}


var velocity = new THREE.Vector2(2.5 - Math.random() * 5.0, 2.5 - Math.random() * 5.0);
var maxX, minX, maxY, minY;
function render(time) {
  time *= 0.001;

  cube.rotation.x = time;
  cube.rotation.y = time;

  maxX = window.innerWidth / 100;
  minX = window.innerWidth / -100;
  maxY = window.innerHeight / 100;
  minY = window.innerHeight / -100;

  cube.position.x += velocity.x;
  cube.position.y += velocity.y;
  

  if(cube.position.x >= maxX) {
    velocity.x -= 0.002 * (cube.position.x - maxX);
  }
  if(cube.position.x <= minX) {
    velocity.x -= 0.002 * (cube.position.x - minX);
  }
  if(cube.position.y >= maxY) {
    velocity.y -= 0.002 * (cube.position.y - maxY);
  }
  if(cube.position.y <= minY) {
    velocity.y -= 0.002 * (cube.position.y - maxY);
  }

  if(isDebug) {
    document.querySelector('#x').textContent = Math.round(cube.position.x);
    document.querySelector('#y').textContent = Math.round(cube.position.y);

    line.geometry.attributes.position.setX(0, cube.position.x);
    line.geometry.attributes.position.setY(0, cube.position.y);
    line.geometry.attributes.position.setX(1, cube.position.x + (velocity.x * 25));
    line.geometry.attributes.position.setY(1, cube.position.y + (velocity.y * 25));
    line.geometry.attributes.position.needsUpdate = true;
  }

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
      if(!isDebug) {
        isDebug = true;
        document.querySelector(".coords").style.display = "block";
        scene.add(line);
      } else {
        isDebug = false;
        document.querySelector(".coords").style.display = "none";
        scene.remove(line);
      }
    }
  }); 
}


initScene();
initGeometry();
initLights();
initListeners();
render();