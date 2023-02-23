import fs from 'fs'

/**
 * 判断文件是否存在
 * @param url 
 * @returns 
 */
export const isExist = (url: string) => { 
  try {
    fs.accessSync(url, fs.constants.F_OK);
    return true
  } catch (error) {
    return false
  }
}

/**
 * 是否为文件夹
 * @param url 
 * @returns 
 */
export const isDir = (url: string) => {
  if (isExist(url)) { 
    const stat = fs.statSync(url)
    const isDir = stat.isDirectory()
    return isDir
  } else {
    return false
  }
}

/**
 * 是否为图片类型的文件
 * @param type 
 * @returns 
 */
export const isImage = (type: string) => {
  return type && type.indexOf('image') >= 0
}

export const removeImage = (path: string) => {
  // 上传成功地图片直接删掉不要了
  fs.unlink(path, (err) => {
    if (err) console.log('图片删除失败', err);
  });
}