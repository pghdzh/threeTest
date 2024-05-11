import * as THREE from 'three'

export default (threeRef) => {
    const renderer = new THREE.WebGLRenderer()
    const canvas = renderer.domElement
    threeRef.value.appendChild(canvas)
    renderer.setSize(600, 300)

}