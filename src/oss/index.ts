import OSS from "ali-oss";

import { Config } from '../types/config'
/**
 * 初始化oss
 * @returns oss实例
 */
export const initOss = (config: Config) => {
  const { region, accessKeyId, accessKeySecret, bucket } = config
  const ossClient = new OSS({ region, accessKeyId, accessKeySecret, bucket })
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
export const ossPut = ({ ossClient, ossPath = '', localPath = '', bucket = '', config }: any) =>{
  return new Promise((resolve,reject)=>{
    ossClient.useBucket(bucket);
    ossClient.put(ossPath, localPath, config).then((result: any) => {
      resolve(result)
    }).catch((error: any) => {
      reject(error)
    });
  })
}
