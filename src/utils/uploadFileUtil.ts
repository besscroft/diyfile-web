import axios from 'axios'

/** OneDrive 分片上传 */
export const uploadOneDrive = async (file: File, uploadUrl: string, option: any) => {
  const { onProgress, onError, onSuccess } = option
  let counter = 1
  let start = 0
  let end = 0
  const fileSize = file.size
  const chunkFileSize = 104857599
  const uploadBlock = () => {
    // 计算每块的开始和结束位置
    if (start + chunkFileSize >= fileSize) {
      end = fileSize
    } else {
      end = start + chunkFileSize
    }
    // TODO 分片处理
    const fileBlock = file.slice(start, end)
    axios.put(uploadUrl, fileBlock, {
      headers: {
        'Content-Type': 'application/octet-stream',
        // Content-Range 标头指示此请求表示的整个文件中的字节范围。
        'Content-Range': `bytes ${start}-${end - 1}/${file.size}`,
      },
      withCredentials: false,
      onUploadProgress: (progressEvent) => {
        let percent
        if (progressEvent.total > 0) {
          percent = progressEvent.loaded / progressEvent.total
        }
        onProgress(percent, progressEvent)
      },
    }).then((res) => {
      if (res.status === 202) {
        start += chunkFileSize
        counter = counter + 1
        uploadBlock()
      } else if (res.status === 201 || res.status === 200) {
        console.log(res)
        onSuccess(res)
      }
    }).catch((err) => {
      onError(err)
    })
  }
  uploadBlock()
}
