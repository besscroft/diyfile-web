/**
 * 常见文件扩展名
 * 这里只列出了常见的文件扩展名，不是所有的文件扩展名，因为用了文件路由，所以必须要判断处理下。
 * 只能最大程度上客户端和服务端同时处理，可能极少数场景无法处理，但是这种情况极少。
 * 也许在不调整文件路由的情况下，有更合适的方法，但是目前没有想到（我太菜了呜呜呜
 * */
export const fileExtensions = [
  '3g2', '3gp', '3mf', '7z', 'Z', 'aac', 'ac3', 'ai', 'aif', 'alias',
  'amr', 'ape', 'apng', 'ar', 'arrow', 'arw', 'asar', 'asf', 'avi', 'avif',
  'blend', 'bmp', 'bpg', 'bz2', 'cab', 'cfb', 'chm', 'cr2', 'cr3', 'crx',
  'cur', 'dcm', 'deb', 'dmg', 'dng', 'docx', 'dsf', 'dwg', 'elf', 'eot',
  'eps', 'epub', 'exe', 'f4a', 'f4b', 'f4p', 'f4v', 'flac', 'flif', 'flv',
  'gif', 'glb', 'gz', 'heic', 'icns', 'ico', 'ics', 'indd', 'it', 'jls',
  'jp2', 'jpg', 'jpm', 'jpx', 'jxl', 'jxr', 'ktx', 'lnk', 'lz', 'lzh',
  'm4a', 'm4b', 'm4p', 'm4v', 'mid', 'mie', 'mj2', 'mkv', 'mobi', 'mov',
  'mp1', 'mp2', 'mp3', 'mp4', 'mpc', 'mpg', 'mts', 'mxf', 'nef', 'nes',
  'odp', 'ods', 'odt', 'oga', 'ogg', 'ogm', 'ogv', 'ogx', 'opus', 'orf',
  'otf', 'parquet', 'pcap', 'pdf', 'pgp', 'png', 'pptx', 'ps', 'psd', 'pst',
  'qcp', 'raf', 'rar', 'rpm', 'rtf', 'rw2', 's3m', 'shp', 'skp', 'spx',
  'sqlite', 'stl', 'swf', 'tar', 'tif', 'ttf', 'vcf', 'voc', 'wasm', 'wav',
  'webm', 'webp', 'woff', 'woff2', 'wv', 'xcf', 'xlsx', 'xm', 'xml', 'xpi',
  'xz', 'zip', 'zst', 'doc', 'ppt', 'xls', 'md', 'markdown', 'txt', 'log',
  'ini', 'conf', 'config', 'json', 'msi', 'apk', 'ipa', 'dll', 'so', 'lib',
  'py', 'pyc', 'pyd', 'pyo', 'pyw', 'pyz', 'pyzw', 'pyzr', 'csv', 'svg',
  'java', 'class', 'jar', 'war', 'ear', 'js', 'jsx', 'ts', 'tsx', 'css',
  'less', 'scss', 'sass', 'html', 'htm', 'xhtml', 'vue', 'php', 'php3', 'php4',
  'php5', 'php6', 'php7', 'php8', 'phtml', 'asp', 'aspx', 'jsp', 'jspx', 'jspf',
  'jtml', 'go', 'rb', 'rbw', 'rake', 'gemspec', 'podspec', 'thor', 'irb', 'rs',
  'swift', 'kt', 'kts', 'clj', 'cljs', 'cljc', 'edn', 'scala', 'sc', 'scm',
  'sbt', 'c', 'h', 'cpp', 'hpp', 'cxx', 'hxx', 'cc', 'hh', 'm',
  'mm',
]

/** 获取文件扩展名(小写) */
export const getRawExtension = (fileName: string): string => {
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase()
}

/** 获取文件名 */
export const getFileName = (filePath: string): string => {
  return filePath.substring(filePath.lastIndexOf('/') + 1)
}

/** 判断是否为 md 文件 */
export const isMarkdown = (fileName: string): boolean => {
  const ext = getRawExtension(fileName)
  return ['md', 'markdown'].includes(ext)
}

/** 判断是否为文本文件 */
export const isText = (fileName: string): boolean => {
  const ext = getRawExtension(fileName)
  return ['txt', 'log', 'ini', 'conf', 'config', 'json', 'xml'].includes(ext)
}

/** 判断是否为音频文件 */
export const isAudio = (fileName: string): boolean => {
  const ext = getRawExtension(fileName)
  return ['mp3', 'ogg', 'flac', 'oga', 'opus', 'm4a'].includes(ext)
}

/** 判断是否为视频文件 */
export const isVideo = (fileName: string): boolean => {
  const ext = getRawExtension(fileName)
  return ['mp4', 'webm', 'ogg', 'ogv', 'm4v', 'flv', 'mkv', 'm3u8'].includes(ext)
}

/** 判断是否为图片 */
export const isImage = (fileName: string): boolean => {
  const ext = getRawExtension(fileName)
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(ext)
}

/** 判断是否为 PDF 文件 */
export const isPDF = (fileName: string): boolean => {
  const ext = getRawExtension(fileName)
  return ['pdf'].includes(ext)
}

/** 判断是否为文件，根据常见的文件扩展名判断 */
export const isFile = (fileName: string): boolean => {
  const ext = getRawExtension(fileName)
  return fileExtensions.includes(ext)
}

/** 判断是否为文件 */
export const isFileByRawExtension = (type: string): boolean => {
  return fileExtensions.includes(type)
}

/** 获取路径中的文件名，同时兼容 Windows 和 Linux */
export const getFileNameFromPath = (path: string): string => {
  // 如果包含 \ 则使用 \ 分割，否则使用 / 分割，并获取最后一个 \ 或者 / 后面的文件名
  if (path.includes('\\')) {
    const lastIndex = path.lastIndexOf('\\')
    return path.substring(lastIndex + 1)
  } else if (path.includes('/')) {
    const lastIndex = path.lastIndexOf('/')
    return path.substring(lastIndex + 1)
  } else {
    // 如果都不包含，认为就是文件名
    return path
  }
}
