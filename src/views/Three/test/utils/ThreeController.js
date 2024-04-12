import * as THREE from 'three'

export const renderer = new THREE.WebGLRenderer()//创建渲染器

export const scene = new THREE.Scene()//实例化场景

export const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)//相机

export class ThreeController {
    Model = null;
    scene = null;
    constructor(Model) {//构造器函数
        Model.appendChild(renderer.domElement)//容器
        renderer.setSize(Model.offsetWidth, Model.offsetHeight, true)
        this.Model = Model
        this.scene = scene
        camera.position.set(100, 100, 100)//设置相机位置
        camera.lookAt(new THREE.Vector3(0, 0, 0))//设置相机看中心点
        camera.up = new THREE.Vector3(0, 1, 0)//设置相机自身位置
        renderer.shadowMap.enabled = true;
        renderer.render(scene, camera);
    }
}

//外部访问添加模型到场景中

addObject(...object){
    object.forEach(elem => {
        this.scene.add(elem)
    })
}
