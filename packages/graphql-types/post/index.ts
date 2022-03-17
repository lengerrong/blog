export type Post = {
  slug: string
  canonical_url: string
  codeinjection_head: string
  codeinjection_foot: string
  featured: number
  feature_image: string
  title: string
  author_id: string
  plaintext: string
  html: string
  mobiledoc: string
  comment_id: string
  published_at: Date
  created_at: Date
  updated_at: Date
}

export type Posts = {
  hasMore: boolean
  items: [Post]
  count: number
}

export type PostsParams = {
  offset: number
}
