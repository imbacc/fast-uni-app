export const formatFileList = (fileList: Array<string>) => {
  const newList: any[] = []
  for (const url of fileList) {
    if (!url.includes('http')) continue
    const idx1 = url.lastIndexOf('/')
    const idx2 = url.lastIndexOf('.')
    const suffix = url.substring(idx2).replace('.', '')
    const name = url.substring(idx1 + 1)
    newList.push({
      extname: suffix,
      fileType: 'image',
      name,
      path: url,
      progress: 100,
      status: 'ready',
      url,
    })
  }
  return newList
}