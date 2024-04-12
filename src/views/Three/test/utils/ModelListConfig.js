import * as THREE from 'three';

export const ModelListConfig = []//模型数组
//创建材质贴图
const sky = new THREE.TextureLoader().load(Require('sky.jpg'))

export const MeshModel = new THREE.Mesh(
    color: 'rgb(36,172,242)',
    //roughness:0,光滑度，0最光滑
    // metalness: 0, 金属度 1最像金属
    map: sky
)

ModelListConfig.push(MeshModel)//将模型添加到数组中

//多人协作储存数据
MeshModel.userData={
    name:'MeshModel',
    user:'正方形模型'
}