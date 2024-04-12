import { AxesHelper, GridHelper } from "three" 'three'

export const allHelper = []

export const axesHelper = new AxesHelper(200)//创建坐标辅助
export const gridHelper = new GridHelper(500, 20, 'green', 'rgba(255,255,255')
allHelper.push(gridHelper, axesHelper)