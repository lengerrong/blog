import { useInfiniteQuery } from 'react-query'
import { Query, Post } from 'graphql-types'
import { SyntheticEvent } from 'react'

const POST_DEFAULT_OFFSET = 0
const SCROLL_TO_NEXT_PAGE_THRESHOLD_RATE = 1.5

const App = () => {
  type FetchPostsOptions = {
    offset: number
  }
  const fetchPosts = async ({
    offset
  }: FetchPostsOptions): Promise<Query<Post>> => {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ query: `{posts(${offset})}` })
    })
    return response.json() as Promise<Query<Post>>
  }

  const { data, hasNextPage, fetchNextPage, isFetching, error } =
    useInfiniteQuery(
      'posts',
      ({ pageParam = { offset: 0 } }) =>
        fetchPosts(pageParam as FetchPostsOptions),
      {
        getNextPageParam: (lastPage, pages) => {
          if (!lastPage.hasMore) return undefined
          return {
            offset: pages.reduce(
              (offset, page) => (offset += page.count),
              POST_DEFAULT_OFFSET
            )
          }
        }
      }
    )

  const onScroll = (e: SyntheticEvent) => {
    ;(async () => {
      const element = e.target as HTMLDivElement
      const { scrollHeight, scrollTop, clientHeight } = element
      if (
        !isFetching &&
        hasNextPage &&
        scrollHeight - scrollTop <=
          clientHeight * SCROLL_TO_NEXT_PAGE_THRESHOLD_RATE
      ) {
        await fetchNextPage()
      }
    })().catch(() => undefined)
  }

  return (
    <div onScroll={onScroll}>
      {!error &&
        data?.pages.map((page) =>
          page.items
            .map((item) => item.value)
            .map((post) => (
              <>
                {post.title}
                {post.plaintext}
              </>
            ))
        )}
    </div>
  )
}

export default App
