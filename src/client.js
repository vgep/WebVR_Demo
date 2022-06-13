import * as THREE from 'three';
import { VRButton } from './jsm/webxr/VRButton.js';

// Add scene
var scene = new THREE.Scene();

// Add camera (fov, aspect, near, far)
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.2, 100);
camera.position.z = 4; 

// Load background texture
var loader = new THREE.TextureLoader();
var imgUrl = 'https://media.istockphoto.com/vectors/retro-style-landscape-with-blue-grid-background-vector-id1263746475?k=20&m=1263746475&s=612x612&w=0&h=SJoTC2---hEbr_YEBSB0geJZ4lgIbyUUkxiSFw7ENsE=';
loader.load(imgUrl, function(texture) {
    scene.background = texture;  
});

// Add WebGL renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// Add renderer to HTML DOM
document.body.appendChild(renderer.domElement);

// Add cube 
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({
    color: 0x1000000,
    wireframe: true,
});
var cube = new THREE.Mesh(geometry, material);
cube.position.y = 0.5;
scene.add(cube);

// Enable VR 
renderer.xr.enabled = true;
// Add button to HTML DOM
document.body.appendChild(VRButton.createButton(renderer));

function animate() {
    // Tell browser to perform an animation
    requestAnimationFrame(animate);

    // Render loop
    render(); 

    rotateCube();
}

function render() {
    renderer.setAnimationLoop( function () {
        renderer.render(scene, camera);
    } );
}

function rotateCube() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}

animate();