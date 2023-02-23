import OSS from "ali-oss";

import { Config } from '../type'
/**
 * 初始化oss
 * @returns oss实例
 */
export const initOss = (config: Config) => {
  const { dirPath, ...params } = config
  const ossClient = new OSS(params)
  return ossClient
}
/**
 * oss上传图片
 * @param {*} 
 *  ossClient: oss实例
 *  ossPath: 需要上传到oss上面的绝对路径
 *  localPath: 本地文件路径
 * @returns Promise
 */
export const ossPut = ({ ossClient, ossPath = '', localPath = '', bucket = '' }: any) =>{
  return new Promise((resolve,reject)=>{
    ossClient.useBucket(bucket);
    ossClient.put(ossPath, localPath).then((result: any) => {
      resolve(result)
    }).catch((error: any) => {
      reject(error)
    });
  })
}
