import { ResolvedConfig  } from 'vite'
import fs from 'fs'
import mime from 'mime'
import { exec } from "child_process";
import { isExist, isDir, isImage, removeImage } from "./utils/check-file";
import { initOss, ossPut } from "./oss/index";

const exclude = ['.git', '.github', '.gitignore', '.history', 'node_modules', '.vscode']

interface Config { 
  region: string
  accessKeyId: string
  accessKeySecret: string
  bucket: string
  endpoint: string
  secure?: boolean // 支持https，默认false HTTP
  enabled?: boolean
  dirPath?: string
  uploadExclude?: string[]
  removeExclude?: string[]
  removeEnabled?: boolean
  tinyKey?: ''
}

let userConfig: Config;

let fileList: {
  url: string,
  fileName: string
}[] = []

const readFiles = (path = '') => {
  if (!path) return
  if (isExist(path)) {
    const data = fs.readdirSync(path)
    getFileList(data, path)
  }
}

const getFileList = (data: string[], path: string) => {
  for (const fileName of data) {
    if (exclude.includes(fileName)) continue
    const url = path + fileName
    if (isDir(url)) {
      readFiles(url + '/')
    } else {
      const type = mime.getType(url)
      if (isImage(type) && !(userConfig.uploadExclude && userConfig.uploadExclude.includes(fileName))) {
        fileList.push({ url, fileName })
      }
    }
  }
}

const aliOssUploader = (config: Config) => {
  userConfig = config
  return {
    name: 'vite-plugin-ali-oss-upload', // 插件名字
    apply: 'serve', // 指明插件仅在 'build' 或 'serve' 模式时调用
    enforce: 'pre',
    configResolved(config: ResolvedConfig) {
      if (userConfig.enabled === false) return
      readFiles(config.root + '/')
      if (userConfig.tinyKey) {
        const serializeFile = fileList.map(item => item.url).join(' ')
        exec(`tinypng ${serializeFile} -k ${userConfig.tinyKey}`, (error, stdout, stderr) => {
          upload()
        })
      } else {
        upload()
      }
    }
  }
}

const upload = () => {
  const ossClient = initOss(userConfig)
  for (let i = 0; i < fileList.length; i++) {
    const localPath = fileList[i].url
    const fileName = fileList[i].fileName
    ossPut({
      ossClient, 
      ossPath: (userConfig.dirPath || 'storage/image') + `/${fileName}`,
      localPath,
      bucket: userConfig.bucket
    }).then((result: any) => {
      console.log('图片路径：' + result.url);
      clear(fileName, localPath)
    }).catch(error => {
      console.log('上传图片失败', error);
    })
  }
}

const clear = (fileName: string, localPath: string) => {
  // 移除本地图片
  if (userConfig.removeEnabled && (!(userConfig.removeExclude && userConfig.removeExclude.includes(fileName)))) {
    removeImage(localPath)
  }
  // 文件集合清空
  fileList = []
}


export default aliOssUploader
