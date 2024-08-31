let scene, camera, renderer;
let basket, ground;
const fallingObjects = [];
const objectCount = 10;
const speed = 0.1;
let score = 0;

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const basketGeometry = new THREE.BoxGeometry(1, 0.5, 1); 
    const basketMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    basket = new THREE.Mesh(basketGeometry, basketMaterial);
    basket.position.y = -3.5;
    scene.add(basket);

    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide });
    ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.position.y = -4;
    scene.add(ground);

    const objectGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const objectMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    for (let i = 0; i < objectCount; i++) {
        const object = new THREE.Mesh(objectGeometry, objectMaterial);
        resetObject(object);
        fallingObjects.push(object);
        scene.add(object);
    }


    document.addEventListener('keydown', onDocumentKeyDown, false);
    animate();
}

function resetObject(object) {
    object.position.x = (Math.random() - 0.5) * 10;
    object.position.y = Math.random() * 5 + 5;
    object.position.z = (Math.random() - 0.5) * 10;
}

function onDocumentKeyDown(event) {
    const keyCode = event.which;
    if (keyCode == 37) { 
        basket.position.x -= speed;
    } else if (keyCode == 39) { 
        basket.position.x += speed;
    }
}

function animate() {
    requestAnimationFrame(animate);

    for (let i = 0; i < fallingObjects.length; i++) {
        fallingObjects[i].position.y -= speed;


        if (fallingObjects[i].position.distanceTo(basket.position) < 0.7) {
            score++;
            console.log("Score: " + score);
            resetObject(fallingObjects[i]);
        }

        if (fallingObjects[i].position.y < -4) {
            resetObject(fallingObjects[i]);
        }
    }

    renderer.render(scene, camera);
}

init();