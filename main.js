$(function(){

    var hexasphere = new Hexasphere(10, 5, .9);
    var width = $(window).width();
    var height = $(window).height();

    var renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( width, height);

    var cameraDistance = 45;
    var camera = new THREE.PerspectiveCamera( cameraDistance, width / height, 1, 200);
    camera.position.z = -cameraDistance;

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x000000, cameraDistance*.4, cameraDistance * 1.4);

    var meshMaterials = [];
    meshMaterials.push(new THREE.MeshBasicMaterial({side: THREE.DoubleSide, color: 0xffcc00}));
    meshMaterials.push(new THREE.MeshBasicMaterial({side: THREE.DoubleSide, color: 0x00eeee}));
    meshMaterials.push(new THREE.MeshBasicMaterial({side: THREE.DoubleSide, color: 0x00ee00}));

    for(var i = 0; i< hexasphere.tiles.length; i++){
        if(Math.random() < .3){
        var t = hexasphere.tiles[i];

        var geometry = new THREE.Geometry();

        for(var j = 0; j< t.boundary.length; j++){
            var bp = t.boundary[j];
            geometry.vertices.push(new THREE.Vector3(bp.x, bp.y, bp.z));
        }
        geometry.vertices.push(new THREE.Vector3(t.boundary[0].x, t.boundary[0].y, t.boundary[0].z));

        geometry.faces.push(new THREE.Face3(0,1,2));
        geometry.faces.push(new THREE.Face3(0,2,3));
        geometry.faces.push(new THREE.Face3(0,3,4));
        geometry.faces.push(new THREE.Face3(0,4,5));

        var mesh = new THREE.Mesh(geometry, meshMaterials[Math.floor(Math.random() * meshMaterials.length)]);
        mesh.doubleSided = true;
        scene.add(mesh);
        }

    }

    var startTime = Date.now();
    var lastTime = Date.now();
    var cameraAngle = 0;

    var tick = function(){


        var dt = Date.now() - lastTime;

        var rotateCameraBy = (2 * Math.PI)/(100000/dt);
        cameraAngle += rotateCameraBy;

        lastTime = Date.now();

        camera.position.x = cameraDistance * Math.cos(cameraAngle);
        camera.position.y = Math.sin(cameraAngle)* 10;
        camera.position.z = cameraDistance * Math.sin(cameraAngle);
        camera.lookAt( scene.position );

        renderer.render( scene, camera );

        requestAnimationFrame(tick);

    }

    $("#container").append(renderer.domElement);
    requestAnimationFrame(tick);
    window.hexasphere = hexasphere;

});
