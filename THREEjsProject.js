var scene = new THREE.Scene();
var ratio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,
  0.1, 50);
camera.position.z = 30;

var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);

var canvas = renderer.domElement;
canvas.style.display = 'block';

document.body.appendChild(canvas);

var lights = [];
lights[0] = new THREE.AmbientLight(0xffffff, 1, 0);
// lights[1] = new THREE.AmbientLight(0xffffff, 1, 0);
// lights[2] = new THREE.PointLight(0xffffff, 1, 0);

// lights[0].position.set(0,100,0);
// lights[1].position.set(-100, 0, 0);
// lights[2].position.set(0, 0, 100);

scene.add(lights[0]);
// scene.add(lights[1]);
// scene.add(lights[2]);

/**
 * Will be called when load completes.
 * The argument will be the loaded texture.
 */

var onLoad = function (texture) {
  var objGeometry = new THREE.SphereGeometry(5, 32, 32 );
  var objMaterial = new THREE.MeshPhongMaterial({
    map: texture,
    // shading: THREE.FlatShading
  });

  var mesh = new THREE.Mesh(objGeometry, objMaterial);

  scene.add(mesh);

  var render = function () {
    requestAnimationFrame(render);

    // mesh.rotation.x += 0.010;
    mesh.rotation.y += 0.010;

    renderer.render(scene, camera);
  };

  render();
}

// Function called when download progresses
var onProgress = function (xhr) {
  console.log((xhr.loaded / xhr.total * 100) + '% loaded');
};

// Function called when download errors
var onError = function (xhr) {
  console.log('An error happened');
};
var loader = new THREE.TextureLoader();
loader.load("earthmap1k.jpg", onLoad, onProgress, onError);

// var loader = new THREE.TextureLoader();

var controls = new THREE.OrbitControls( camera,renderer.domElement );
