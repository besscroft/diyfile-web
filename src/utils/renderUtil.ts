import { NIcon } from 'naive-ui'
import { isAudio, isImage, isPDF, isVideo } from '~/utils/FileUtil'

export function renderIcon(svg: string) {
  return h(NIcon, { innerHTML: svg })
}

export function renderFileIcon(row: any, emit: any) {
  if (row.type !== 'file') {
    return h('div',
      {
        class: 'flex items-center cursor-pointer',
        onClick: () => { emit('handleFolder', row.name) },
      },
      [renderIcon('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M11.17 6l3.42 3.41l.58.59H28v16H4V6h7.17m0-2H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H16l-3.41-3.41A2 2 0 0 0 11.17 4z" fill="currentColor"></path></svg>'), h('p', row.name)],
    )
  } else if (isImage(row.name)) {
    return h('div',
      {
        class: 'flex items-center cursor-pointer',
        onClick: () => { emit('clickFile', row.name) },
      },
      [renderIcon('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M4 22H2V4a2.002 2.002 0 0 1 2-2h18v2H4z" fill="currentColor"></path><path d="M21 17a3 3 0 1 0-3-3a3.003 3.003 0 0 0 3 3zm0-4a1 1 0 1 1-1 1a1 1 0 0 1 1-1z" fill="currentColor"></path><path d="M28 7H9a2.002 2.002 0 0 0-2 2v19a2.002 2.002 0 0 0 2 2h19a2.002 2.002 0 0 0 2-2V9a2.002 2.002 0 0 0-2-2zm0 21H9v-6l4-3.997l5.586 5.586a2 2 0 0 0 2.828 0L23 22.003L28 27zm0-3.828l-3.586-3.586a2 2 0 0 0-2.828 0L20 22.172l-5.586-5.586a2 2 0 0 0-2.828 0L9 19.172V9h19z" fill="currentColor"></path></svg>'), h('p', row.name)],
    )
  } else if (isVideo(row.name)) {
    return h('div',
      {
        class: 'flex items-center cursor-pointer',
        onClick: () => { emit('clickFile', row.name) },
      },
      [renderIcon('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M21 26H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h17a2 2 0 0 1 2 2v4.06l5.42-3.87A1 1 0 0 1 30 9v14a1 1 0 0 1-1.58.81L23 19.94V24a2 2 0 0 1-2 2zM4 8v16h17v-6a1 1 0 0 1 1.58-.81L28 21.06V10.94l-5.42 3.87A1 1 0 0 1 21 14V8z" fill="currentColor"></path></svg>'), h('p', row.name)],
    )
  } else if (isAudio(row.name)) {
    return h('div',
      {
        class: 'flex items-center cursor-pointer',
        onClick: () => { emit('clickFile', row.name) },
      },
      [renderIcon('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M25 4H10a2.002 2.002 0 0 0-2 2v14.556A3.955 3.955 0 0 0 6 20a4 4 0 1 0 4 4V12h15v8.556A3.954 3.954 0 0 0 23 20a4 4 0 1 0 4 4V6a2.002 2.002 0 0 0-2-2zM6 26a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2zm17 0a2 2 0 1 1 2-2a2.003 2.003 0 0 1-2 2zM10 6h15v4H10z" fill="currentColor"></path></svg>'), h('p', row.name)],
    )
  } else if (isPDF(row.name)) {
    return h('div',
      {
        class: 'flex items-center cursor-pointer',
        onClick: () => { emit('clickFile', row.name) },
      },
      [renderIcon('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M30 18v-2h-6v10h2v-4h3v-2h-3v-2h4z" fill="currentColor"></path><path d="M19 26h-4V16h4a3.003 3.003 0 0 1 3 3v4a3.003 3.003 0 0 1-3 3zm-2-2h2a1.001 1.001 0 0 0 1-1v-4a1.001 1.001 0 0 0-1-1h-2z" fill="currentColor"></path><path d="M11 16H6v10h2v-3h3a2.003 2.003 0 0 0 2-2v-3a2.002 2.002 0 0 0-2-2zm-3 5v-3h3l.001 3z" fill="currentColor"></path><path d="M22 14v-4a.91.91 0 0 0-.3-.7l-7-7A.909.909 0 0 0 14 2H4a2.006 2.006 0 0 0-2 2v24a2 2 0 0 0 2 2h16v-2H4V4h8v6a2.006 2.006 0 0 0 2 2h6v2zm-8-4V4.4l5.6 5.6z" fill="currentColor"></path></svg>'), h('p', row.name)],
    )
  } else {
    return h('div',
      {
        class: 'flex items-center cursor-pointer',
        onClick: () => { emit('clickFile', row.name) },
      },
      [renderIcon('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><circle cx="9" cy="28.5" r="1.5" fill="currentColor"></circle><path d="M10 25H8v-4h2a2 2 0 0 0 0-4H8a2.002 2.002 0 0 0-2 2v.5H4V19a4.005 4.005 0 0 1 4-4h2a4 4 0 0 1 0 8z" fill="currentColor"></path><path d="M27.7 9.3l-7-7A.908.908 0 0 0 20 2H10a2.006 2.006 0 0 0-2 2v8h2V4h8v6a2.006 2.006 0 0 0 2 2h6v16H14v2h12a2.006 2.006 0 0 0 2-2V10a.91.91 0 0 0-.3-.7zM20 10V4.4l5.6 5.6z" fill="currentColor"></path></svg>'), h('p', row.name)],
    )
  }
}
