// standard global variables
var container, scene, camera, renderer, controls, textMesh, pivot, positionX, positionY;

var mouseDown = true;


$(document).ready(function() {
    $('#canvas').on('touch', function(e) {
        let touch = e.originalEvent.touches[0]
        mouseDown = true;
    });

    $('#canvas').mousedown(function() {
        mouseDown = true;
    });
    $('#canvas').mouseup(function() {
        mouseDown = false;
    });
    $('#canvas').on('touchstart', function(e) {
        let touch = e.originalEvent.touches[0]
        positionX = touch.pageX;
        positionY = touch.pageY;

        //start the drag function
        canvas.trackDragAndMove(positionX, positionY);

        console.log(positionX + '|' + positionY);

        mouseDown = true;
    });
    $('#canvas').on('touchend', function(e) {
        mouseDown = false;
    });
})

var canvas = {
    trackDragAndMove: function(originalX, originalY) {
        $('#canvas').on('touchmove', function(e) {
            let touch = e.originalEvent.touches[0]
            positionX = touch.pageX;
            positionY = touch.pageY;

            //calculate the difference
            let newX = Number(originalX) - Number(positionX);
            let newY = Number(originalY) - Number(positionY);

            console.log(newX + '|' + newY);

            pivot.rotation.x = newX;
            pivot.rotation.y = newY;
        });
    }
}


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


    renderer = new THREE.WebGLRenderer( {
        antialias:true,
        alpha: true
    } );

    renderer.setClearColor( 0x000000, 0 ); // the default
    renderer.setSize(window.innerWidth, window.innerHeight);
    container = document.getElementById( 'canvas' );
    container.appendChild( renderer.domElement );

    // CONTROLS
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    // LIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0,0,500);
    scene.add(light);

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();
    })

    // add 3D text default
    var material = new THREE.MeshPhongMaterial({
        color: 0xB3000C
    });
    var textGeom = new THREE.TextGeometry( 'Friendsmas 2020', {
        font: 'janda manatee solid',
        size: 80
    });

    textMesh = new THREE.Mesh( textGeom, material );

    textGeom.computeBoundingBox();
    var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
    textMesh.position.set( -0.5 * textWidth, 100, 0 );
    scene.add( textMesh );


    pivot = new THREE.Object3D();
    pivot.add( textMesh );
    pivot.rotation.y = .2;
    scene.add( pivot );

}

function render() {
    renderer.render( scene, camera );
}

function animate() {
    window.requestAnimationFrame( animate );

    render();

    if (!mouseDown) {
        pivot.rotation.y += 0.005;
    }

}

init();
animate();