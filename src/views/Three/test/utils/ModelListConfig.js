import * as THREE from 'three';

export const ModelListConfig = []//模型数组
//创建材质贴图
const sky = new THREE.TextureLoader().load('../img/test.jpg')

export const MeshModel = new THREE.Mesh(
    new THREE.BoxGeometry(20, 20, 20),

    new THREE.MeshStandardMaterial({


        color: 0xff0000,
        map: texture

    })

)

ModelListConfig.push(MeshModel)//将模型添加到数组中

//多人协作储存数据
MeshModel.userData = {
    name: 'MeshModel',
    user: '正方形模型'
}