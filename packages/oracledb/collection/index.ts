export type Link = {
  rel: string
  href: string
}

export type ItemValue<T> = {
  id?: string
  etag?: string
  lastModified?: Date
  created?: Date
  links?: Link[]
  value: T
}

export type Collection<T> = {
  items: ItemValue<T>[]
  hasMore: boolean
  count: number
}
