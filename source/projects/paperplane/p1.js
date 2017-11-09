/*
 * @Author: Shen Huang
 * @Date:   2017-11-01 01:46:08
 * @Last Modified time: 2017-11-08 15:37:13
 * The paper airplane model is from http://www.blendswap.com/blends/view/76601
 * Change some part of the planet model, which is from https://www.blendswap.com/blends/view/88268
 */


// position
var t = 0;
var lastTime = Date.now();
var FRAME_PERIOD = 100;
// -------------
// Add three js
// Three basic elements to add, scene, camera, renderer
var scene, camera, renderer;
// set width and length as window size
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

// init funciton
function init() {
    scene = new THREE.Scene();
    initCamera();
    initRenderer();

    // Append to the document
    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(
        75, // Field of view
        window.innerWidth / window.innerHeight, // Aspect ratio
        0.1, // Near clipping pane
        1000 // Far clipping pane
    );

    // Reposition the camera
    camera.position.set(5, 7, 5);

    // Point the camera at a given coordinate
    // camera.lookAt(new THREE.Vector3(0, 15, 0));
    camera.lookAt(scene.position);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });

    // Size should be the same as the window
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set a near white clear color (default is black)
    renderer.setClearColor(0xeeeeee);
}

init();
// ------------------------------- End of init functions

// Controls for mouse
var controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.addEventListener('change', function() { renderer.render(scene, camera); });

// Set light
// var spotLight = new THREE.SpotLight(0xffffff);
var spotLight = new THREE.AmbientLight(0x1ab6ff);
spotLight.position.set(25, 50, 25);
spotLight.castShadow = true;

// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;

// spotLight.shadow.camera.near = 500;
// spotLight.shadow.camera.far = 4000;
// spotLight.shadow.camera.fov = 30;

scene.add(spotLight);

var spotLight = new THREE.PointLight(0xffffff);
spotLight.position.set(-40, 60, -10);
//  spotLight.castShadow = true;
scene.add(spotLight);

// ---------
// set shadow
var shadowMaterial = new THREE.ShadowMaterial({ color: 0xeeeeee });
shadowMaterial.opacity = 0.5;


// -----
var mesh = null;
var planeMesh;

function initPlane() {
    // instantiate a loader
    var loader = new THREE.ObjectLoader();
    var material = new THREE.MeshStandardMaterial({
        color: 0x84FFFF,
        flatShading: true, // default is THREE.SmoothShading
        metalness: 0,
        roughness: 1
    });

    // load a resource
    loader.load(
        // resource URL
        'objs/paper_plane.json',

        // Function when resource is loaded
        //Here it is assumed to be an object
        function(obj) {
            //add the loaded object to the scene
            obj.castShadow = true;
            obj.receiveShadow = true;
            obj.material = material;
            obj.scale.x = 4;
            obj.scale.y = 4;
            obj.scale.z = 4;
            planeMesh = obj;
            // scene.add(obj);
        },

        // Function called when download progresses
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },

        // Function called when download errors
        function(xhr) {
            console.error('An error happened');
        }
    );
}

var earth;

function initEarth() {
    // instantiate a loader
    var loader = new THREE.ObjectLoader();

    var material = new THREE.MeshStandardMaterial({
        color: 0x80D8FF,
        flatShading: true, // default is THREE.SmoothShading
        metalness: 0,
        roughness: 1
    });

    // load a resource
    loader.load(
        // resource URL
        'objs/model.json',

        // Function when resource is loaded
        //Here it is assumed to be an object
        function(obj) {
            //add the loaded object to the scene
            obj.castShadow = true;
            obj.receiveShadow = true;
            obj.material = material;
            obj.scale.x = 0.5;
            obj.scale.y = 0.5;
            obj.scale.z = 0.5;
            earth = obj;
            scene.add(obj);
        },

        // Function called when download progresses
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },

        // Function called when download errors
        function(xhr) {
            console.error('An error happened');
        }
    );
}

initPlane();
initEarth();

// ------------------------------- End of load objs

// Rotate the earth
function rotateEarth(speed = 0.005) {
    // Update camera position based on the controls
    controls.enabled = false;

    controls.update();
    if (earth != null) {
        earth.rotateX(speed);
        earth.rotateY(speed);
        earth.rotateZ(speed);

    }
}

// Create the path for use.
var spline = [],
    line, spline_num = 2;

function createPath() {
    spline1 = new THREE.Curves.CinquefoilKnot(700);
    spline2 = new THREE.Curves.TorusKnot(700);

    var material = new THREE.LineBasicMaterial({ color: 0x2c2c2c });
    var geometryt1 = new THREE.Geometry();
    var geometryt2 = new THREE.Geometry();
    for (var i = 0; i < spline1.getPoints(100).length; i++) {
        geometryt1.vertices.push(spline1.getPoints(100)[i]);
        geometryt2.vertices.push(spline2.getPoints(100)[i]);
    }

    line1 = new THREE.Line(geometryt1, material);
    line1.scale.x = 0.005;
    line1.scale.y = 0.005;
    line1.scale.z = 0.005;

    line2 = new THREE.Line(geometryt2, material);
    line2.scale.x = 0.005;
    line2.scale.y = 0.005;
    line2.scale.z = 0.005;

    // scene.add(line1);
    // scene.add(line2);
    spline.push(spline1);
    spline.push(spline2);
}


var scale_spine = 0.005;
// plane info 
var arr_length = [0, 0];
var plane_arr = [
    [],
    []
];
var pos_arr = [
    [],
    []
];
var pos_shift = [
    [],
    []
];
var spline_speed = [0.0009, 0.0007];
var axis = new THREE.Vector3();
var up = new THREE.Vector3(0, 1, 0);
var tangent, radians;

// Initial plane objects for using
function flyPath() {
    if (plane_arr != null && plane_arr[0].length != 0 && plane_arr[1].length != 0) {
        for (var _spline = 0; _spline < spline_num; _spline ++) {
            for (var _i = 0; _i < arr_length[_spline]; _i++) {
                pt = spline[_spline].getPoint(pos_arr[_spline][_i]);
                plane_arr[_spline][_i].position.set((pt.x + pos_shift[_spline][_i]) * scale_spine, (pt.y + +pos_shift[_spline][_i]) * scale_spine, (pt.z + +pos_shift[_spline][_i]) * scale_spine);

                tangent = spline[_spline].getTangent(pos_arr[_spline][_i]).normalize();
                axis.crossVectors(up, tangent).normalize();
                radians = Math.acos(up.dot(tangent));
                plane_arr[_spline][_i].quaternion.setFromAxisAngle(axis, radians);

                // change t to a new position
                pos_arr[_spline][_i] = (pos_arr[_spline][_i] >= 1) ? 0 : pos_arr[_spline][_i] += spline_speed[_spline];
            }
        }
    }

}



function createPlane() {
    if (planeMesh == null || (plane_arr[0].length == arr_length[0] && plane_arr[1].length == arr_length[1])) {
        return;
    }
    for (var _spline = 0; _spline < spline_num; _spline ++) {
        for (var _i = plane_arr[_spline].length; _i < arr_length[_spline]; _i++) {
            plane_arr[_spline].push(planeMesh.clone());
            if (_spline == 0) {
                pos_arr[_spline].push(0.1 * Math.random() + 0.5);   
            } else {
                pos_arr[_spline].push(0.1 * Math.random());    
            }
            if (Math.random() >= 0.5) {
                pos_shift[_spline].push(_i * 90 * Math.random());
            } else {
                pos_shift[_spline].push(_i * -10 * Math.random());
            }
            scene.add(plane_arr[_spline][_i]);
        }
    }


}

// Render the scene/camera combination
function render() {
    rotateEarth();
    createPlane();
    flyPath();
    renderer.render(scene, camera);

}

function animate() {
    time = Date.now();
    requestAnimationFrame(animate);
    if (time - lastTime > FRAME_PERIOD) {
        render();
        return;
    }

}

setCatchMessageBoxDisplay();
setSendMessageBoxDisplay();
createPath();
animate();
window.onload = function() {
    createPlane();
}






