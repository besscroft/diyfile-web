/** 文件下载 */
export const download = (url: string) => {
  const elink = document.createElement('a')
  elink.style.display = 'none'
  elink.href = url
  document.body.appendChild(elink)
  elink.click()
  URL.revokeObjectURL(elink.href)
  document.body.removeChild(elink)
}
