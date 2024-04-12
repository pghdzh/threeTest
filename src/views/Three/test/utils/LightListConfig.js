import * as THREE from 'three';
export const LightList = []
//添加环境光
const hemiLight = new THREE.HemisphereLight('#A09E9E', 0.5)
hemiLight.position.set(0, 40, 15);
LightList.push(hemiLight)
const hemiLighthelper = new THREE.HemisphereLightHelper(hemiLight, 5)
LightList.push(hemiLighthelper)
export const pointLight = new THREE.PointLight(
    'rgb(255,255,255)',
    0.7,
    600,
    0.2
)
pointLight.position.set(0, 1, 50)
LightList.push(pointLight)