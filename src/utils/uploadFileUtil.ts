import axios from 'axios'
import { ResultEnum } from '~/enums/httpEnum'

/** OneDrive 分片上传 */
export const uploadOneDrive = async (file: File, uploadUrl: string, option: any) => {
  const { onProgress, onError, onFinish } = option
  let start = 0
  let end = 0
  const fileSize = file.size
  const chunkFileSize = 10 * 1024 * 1024 // 分块大小
  let uploadedChunks = 0 // 已上传块数
  const chunks = Math.ceil(fileSize / chunkFileSize) // 总块数
  const uploadBlock = () => {
    // 计算每块的开始和结束位置
    if (start + chunkFileSize >= fileSize) {
      end = fileSize
    } else {
      end = start + chunkFileSize
    }
    // 分片处理
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
          percent = (uploadedChunks + progressEvent.loaded / progressEvent.total) / chunks
        }
        // const progress = event.percent;
        onProgress({ percent: percent * 100 })
      },
    }).then((res) => {
      if (res.status === 202) {
        start += chunkFileSize
        uploadedChunks = uploadedChunks + 1
        uploadBlock()
      } else if (res.status === 201 || res.status === ResultEnum.SUCCESS) {
        console.log(res)
        onFinish(res)
      }
    }).catch((err) => {
      onError(err)
    })
  }
  uploadBlock()
}
