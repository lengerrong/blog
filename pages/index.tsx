import { useInfiniteQuery } from 'react-query'
import { Post, Posts, PostsData } from 'graphql-types'
import { useEffect } from 'react'
import log from '../utils/logging'

const POST_DEFAULT_OFFSET = 0
const SCROLL_TO_NEXT_PAGE_THRESHOLD_RATE = 1.5

const App = () => {
  type FetchPostsOptions = {
    offset: number
  }
  const fetchPosts = async ({ offset }: FetchPostsOptions): Promise<Posts> => {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: `{
        posts(offset: ${offset}) {
          items {
            title
            plaintext
          }
          hasMore
          count
        }
      }`
      })
    })
    return response.json().then(({ data }: PostsData) => {
      return data.posts
    })
  }

  const { data, hasNextPage, fetchNextPage, isFetching, error } =
    useInfiniteQuery(
      'posts',
      ({ pageParam = { offset: POST_DEFAULT_OFFSET } }) =>
        fetchPosts(pageParam as FetchPostsOptions),
      {
        getNextPageParam: (lastPage, pages) => {
          if (!lastPage?.hasMore) return undefined
          const nextOffset = pages.reduce(
            (offset, page) => (offset += page.count),
            POST_DEFAULT_OFFSET
          )
          return {
            offset: nextOffset
          }
        }
      }
    )

  useEffect(() => {
    const onScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.scrollingElement as HTMLDivElement
      if (
        !isFetching &&
        hasNextPage &&
        scrollHeight - scrollTop <=
          clientHeight * SCROLL_TO_NEXT_PAGE_THRESHOLD_RATE
      ) {
        ;(async () => await fetchNextPage())().catch((e) => log.info(e))
      }
    }
    document.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  })

  const postPreview = (post: Post) => {
    /* eslint-disable */
    return post?.plaintext?.split('\n').slice(0, 14).join('\n')
    /* eslint-enable */
  }
  return (
    <div>
      {!error &&
        data?.pages?.map((page) => (
          <div key={Math.random()}>
            {page?.items?.map((post) => (
              <div key={post.canonical_url}>
                <h1>{post?.title}</h1>
                <pre>{postPreview(post)}</pre>
              </div>
            ))}
          </div>
        ))}
    </div>
  )
}

export default App
