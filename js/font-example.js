// standard global variables
var container, scene, camera, renderer, controls;

function init() {
    // SCENE
    scene = new THREE.Scene();

    // CAMERA
    var SCREEN_WIDTH = 800, SCREEN_HEIGHT = 600;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0,0,1000);
    camera.lookAt(scene.position);
    renderer = new THREE.WebGLRenderer( {antialias:true} );
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container = document.getElementById( 'canvas' );
    container.appendChild( renderer.domElement );

    // CONTROLS
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    // LIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0,0,1000);
    scene.add(light);

    // add 3D text default
    var material = new THREE.MeshPhongMaterial({
        color: 0xdddddd
    });
    var textGeom = new THREE.TextGeometry( 'Friendsmas 2020', {
        font: 'janda manatee solid',
        size: 60
    });

    var textMesh = new THREE.Mesh( textGeom, material );

    textGeom.computeBoundingBox();
    var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

    textMesh.position.set( -0.5 * textWidth, 100, 0 );
    scene.add( textMesh );
}

function render() {
    renderer.render( scene, camera );
}

function animate() {
    window.requestAnimationFrame( animate );
    render();
}

init();
animate();