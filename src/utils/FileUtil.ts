/** 获取文件扩展名(小写) */
export const getRawExtension = (fileName: string): string => {
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase()
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
