# vite-plugin-ali-oss-image-uploader

一个上传图片到阿里云oss的vite插件。

# 特性

上传项目中所有的图片，只在开发环境中使用，不会出现在构建产物中。

# 安装

```
pnpm install -D vite-plugin-ali-oss-upload-image
```

或者
```
npm install -D vite-plugin-ali-oss-upload-image
```
或者
```
yarn add -D vite-plugin-ali-oss-upload-image
```

# 基本用法

## 在 vite.config.js 注册插件

```
import aliOssUploader from 'vite-plugin-ali-oss-upload-image';

const options = {
  region: '<Your Region>',
  accessKeyId: '<Your Access Key ID>',
  accessKeySecret: '<Your Access Key Secret>',
  bucket: '<Your Bucket>',
}

export default defineConfig({
  plugins: [
    ...
    aliOssUploader(options)
    ...
  ]
})
```

## 执行
```
npm run dev
```

# options

| 属性            | 描述                      | 类型     | 默认值   |
| -----------     | --------------          | -------- | -------- |
| enabled         | 是否开启该插件            | Boolean    | true |
| region          | 阿里云oss区域             | String    | -        |
| accessKeyId     | 阿里云oss accessKeyId     | String    | -        |
| accessKeySecret | 阿里云oss accessKeySecret | String   | -  |
| bucket          | 阿里云oss桶               | String   | -        |
| dirPath         | 需要传到oss的目录           | String    | -        |
| secure          | 支持https                 | Boolean    | false    |
| removeEnabled   | 是否删除本地图片            | Boolean    | false      |
| uploadExclude   | 除了哪些图片不用上传        | Array    | -        |
| removeExclude   | 除了哪些图片不用删除        | Array    | -        |
| tinyKey         | tinypng 的 API KEY         | String    | -        |

# 说明

tinyKey 是tinypng申请的api key 不传则不压缩图片。