import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js';
export default (threeRef) => {
    const renderer = new THREE.WebGLRenderer()
    const canvas = renderer.domElement
    threeRef.value.appendChild(canvas)
    renderer.setSize(1200, 600)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x160016)

    const camera = new THREE.PerspectiveCamera(27, 2, 5, 3700)
    camera.position.z = 2300;
    const particles = 1000;

    const geometry = new THREE.BufferGeometry();

    const positions = [];
    const colors = [];
    const sizes = [];
    const velocities = [];  // 存储每个粒子的速度向量

    const color = new THREE.Color();


    // 边界值根据画布的大小调整
    const boundaryX = 600;
    const boundaryY = 300;
    const boundaryZ = 1000;  // 可以根据需要设置

    for (let i = 0; i < particles; i++) {
        // 随机生成粒子的位置
        const x = (Math.random() - 0.5) * 2 * boundaryX;
        const y = (Math.random() - 0.5) * 2 * boundaryY;
        const z = (Math.random() - 0.5) * 2 * boundaryZ;

        positions.push(x, y, z);

        // 随机生成粒子颜色
        color.setRGB(Math.random(), Math.random(), Math.random())
        colors.push(color.r, color.g, color.b);

        // 随机生成粒子大小
        sizes.push(Math.random() * 40 + 5);  // 粒子大小范围在5到15之间

        // 随机生成粒子速度向量
        velocities.push((Math.random() - 0.5) * 2);  // x轴速度
        velocities.push((Math.random() - 0.5) * 2);  // y轴速度
        velocities.push((Math.random() - 0.5) * 2);  // z轴速度
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));  // 添加大小属性

    geometry.computeBoundingSphere();

    // 创建自定义着色器材质

    const material = new THREE.ShaderMaterial({
        vertexShader: `
            attribute float size;
            varying vec3 vColor;
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            void main() {
                vec2 uv = gl_PointCoord - vec2(0.5);
                float len = length(uv);
                if (len > 0.5) discard;
                gl_FragColor = vec4(vColor, 1.0);
            }
        `,
        alphaTest: 0.5,
        transparent: true,
        vertexColors: true
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    renderer.setPixelRatio(window.devicePixelRatio);

    // 更新粒子位置


    const updateParticles = () => {
        const positions = geometry.attributes.position.array;
        for (let i = 0; i < particles; i++) {
            positions[i * 3] += velocities[i * 3] * 0.1;     // 更新x坐标
            positions[i * 3 + 1] += velocities[i * 3 + 1] * 0.1; // 更新y坐标
            positions[i * 3 + 2] += velocities[i * 3 + 2] * 0.1; // 更新z坐标

            // 如果粒子超出边界，则反向运动
            if (positions[i * 3] > boundaryX || positions[i * 3] < -boundaryX) velocities[i * 3] *= -1;
            if (positions[i * 3 + 1] > boundaryY || positions[i * 3 + 1] < -boundaryY) velocities[i * 3 + 1] *= -1;
            if (positions[i * 3 + 2] > boundaryZ || positions[i * 3 + 2] < -boundaryZ) velocities[i * 3 + 2] *= -1;
        }
        geometry.attributes.position.needsUpdate = true;
    };
    let stats = new Stats();

    stats.dom.style.position = 'absolute';
    stats.dom.style.top = '60px';
    stats.dom.style.left = '200px';
    threeRef.value.appendChild(stats.dom);
    const render = () => {
        stats.update();
        updateParticles();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
}