export interface Config { 
  region: string
  accessKeyId: string
  accessKeySecret: string
  bucket: string
  endpoint?: string
  secure?: boolean // 支持https，默认false HTTP
  enabled?: boolean
  dirPath?: string
  uploadExclude?: string[]
  removeExclude?: string[]
  removeEnabled?: boolean
  tinyKey?: '',
  overwrite?: boolean
}