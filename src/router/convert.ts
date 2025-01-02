import pages from '@/pages.json'
import metas from './metas'

const metasMapRecord = (metaList: Array<{ name?: string, path?: string, meta: Record<string, string | string[] | object> }>) => {
  const lastMetaMap = new Map()
  const list = [...metaList]
  while (list.length > 0) {
    const item = list.shift()
    lastMetaMap.set(item?.path, item)
  }
  return lastMetaMap
}

export default (): any => {
  const metaMap = metasMapRecord(metas)

  function changeItem(item, space?: string) {
    let key = item.path.indexOf('/') !== 0 ? `/${item.path}` : item.path
    if (space && space !== 'pages') key = `/${space}${key}`
    const find = metaMap.get(key)
    if (find) {
      const findMeta = find.meta
      if (item.auth) {
        item.auth.push(...findMeta.auth)
      } else {
        item.auth = findMeta.auth
      }
      metaMap.delete(key)
    }
  }

  for (const item of pages.pages) {
    changeItem(item)
  }

  for (const item of pages.subPackages) {
    for (const childItem of item.pages) {
      changeItem(childItem, item.root)
    }
  }

  return pages
}
