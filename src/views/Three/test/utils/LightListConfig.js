import * as THREE from 'three';
export const LightList = []
// // 添加环境光（自然光），设置自然光的颜色，设置自然光的强度（0 最暗， 1 最强）
const hemiLight = new THREE.HemisphereLight("#A09E9E", 0.5);
hemiLight.position.set(0, 40, 15);
LightList.push(hemiLight)
const hemiLighthelper = new THREE.HemisphereLightHelper(hemiLight, 5);
LightList.push(hemiLighthelper)
export const pointLight = new THREE.PointLight(
    'rgb(255,255,255)',
    0.7,
    600,
    0.2
)
pointLight.position.set(0, 1, 50)  // 设置点光源位置 (x,y,z)
LightList.push(pointLight)