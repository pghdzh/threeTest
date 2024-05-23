import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

export default (threeRef) => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(1200, 600)
    const canvas = renderer.domElement
    threeRef.value.appendChild(canvas)

    const camera = new THREE.PerspectiveCamera(50, 2, 1, 10)
    camera.position.z = 2;

    const scene = new THREE.Scene();

    const vector = new THREE.Vector4();
    const instances = 10000
    const positions = [];
    const offsets = [];
    const colors = [];
    const orientationsStart = [];
    const orientationsEnd = [];

    positions.push(0.025, - 0.025, 0);
    positions.push(- 0.025, 0.025, 0);
    positions.push(0, 0, 0.025);

    for (let i = 0; i < instances; i++) {

        offsets.push(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);

        colors.push(Math.random(), Math.random(), Math.random(), Math.random());

        vector.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1)
        vector.normalize();

        orientationsStart.push(vector.x, vector.y, vector.z, vector.w)

        vector.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1)
        vector.normalize();

        orientationsEnd.push(vector.x, vector.y, vector.z, vector.w)
    }

    const geometry = new THREE.InstancedBufferGeometry();
    geometry.instanceCount = instances

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('offset', new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3))
    geometry.setAttribute('color', new THREE.InstancedBufferAttribute(new Float32Array(colors), 4))
    geometry.setAttribute('orientationStart', new THREE.InstancedBufferAttribute(new Float32Array(orientationsStart), 4));
    geometry.setAttribute('orientationEnd', new THREE.InstancedBufferAttribute(new Float32Array(orientationsEnd), 4))

    const material = new THREE.RawShaderMaterial({
        uniforms: {
            'time': { value: 1.0 },
            'sineTime': { value: 1.0 }
        },
        vertexShader: `		
        precision highp float;

		uniform float sineTime;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec3 offset;
		attribute vec4 color;
		attribute vec4 orientationStart;
		attribute vec4 orientationEnd;

		varying vec3 vPosition;
		varying vec4 vColor;

		void main(){

			vPosition = offset * max( abs( sineTime * 2.0 + 1.0 ), 0.5 ) + position;
			vec4 orientation = normalize( mix( orientationStart, orientationEnd, sineTime ) );
			vec3 vcV = cross( orientation.xyz, vPosition );
			vPosition = vcV * ( 2.0 * orientation.w ) + ( cross( orientation.xyz, vcV ) * 2.0 + vPosition );

			vColor = color;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );

		}`,
        fragmentShader: `
        precision highp float;

		uniform float time;

		varying vec3 vPosition;
		varying vec4 vColor;

		void main() {

			vec4 color = vec4( vColor );
			color.r += sin( vPosition.x * 10.0 + time ) * 0.5;

			gl_FragColor = color;

		}`,
        side: THREE.DoubleSide,
        forceSinglePass: true,
        transparent: true,
    })

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const gui = new GUI({ width: 350 });
    gui.add(geometry, 'instanceCount', 0, instances);
    gui.domElement.style.position = 'absolute';
    gui.domElement.style.top = '60px';
    gui.domElement.style.right = '10px';

    const stats = new Stats()
    stats.dom.style.position = 'absolute';
    stats.dom.style.top = '60px';
    stats.dom.style.left = '200px';
    threeRef.value.appendChild(stats.dom);


    const render = () => {
        stats.update();
        const time = performance.now();

        const object = scene.children[0];

        object.rotation.y = time * 0.0005;
        object.material.uniforms['time'].value = time * 0.005;
        object.material.uniforms['sineTime'].value = Math.sin(object.material.uniforms['time'].value * 0.05);

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}