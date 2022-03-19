import { InfiniteData, useInfiniteQuery } from 'react-query'
import { Post, Posts, PostsData } from 'apollo-graphql-types'
import { useEffect } from 'react'
import log from 'logging'
import { GetStaticPropsContext } from 'next'
import PostGrid from 'ui/PostGrid'
import { graphqlAPIURL } from '../utils'

const POST_DEFAULT_OFFSET = 0
const SCROLL_TO_NEXT_PAGE_THRESHOLD_RATE = 1.5

type FetchPostsOptions = {
  offset: number
}

const fetchPosts = async ({ offset }: FetchPostsOptions): Promise<Posts> => {
  const response = await fetch(graphqlAPIURL(), {
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
          slug
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

export async function getStaticProps(_context: GetStaticPropsContext) {
  const getFirstPage = async () => {
    try {
      return await fetchPosts({ offset: POST_DEFAULT_OFFSET })
    } catch (e) {
      log.error(e)
      return null
    }
  }
  const firstPage = await getFirstPage()
  return {
    props: {
      initialData: firstPage
        ? {
            pages: [firstPage],
            pageParams: { offset: POST_DEFAULT_OFFSET }
          }
        : null
    }
  }
}

export type AppProps = {
  initialData: InfiniteData<Posts>
}

const App = ({ initialData }: AppProps) => {
  const { data, hasNextPage, fetchNextPage, error, isFetchingNextPage } =
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
        },
        initialData,
        staleTime: Infinity
      }
    )

  useEffect(() => {
    let isFetching = false
    const onScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.scrollingElement as HTMLDivElement
      if (
        !isFetchingNextPage &&
        !isFetching &&
        hasNextPage &&
        scrollHeight - scrollTop <=
          clientHeight * SCROLL_TO_NEXT_PAGE_THRESHOLD_RATE
      ) {
        (async () => {
          isFetching = true
          await fetchNextPage()
          isFetching = false
        })().catch((e) => log.error(e))
      }
    }
    document.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  })

  const posts = data?.pages?.reduce((aposts, page) => {
    return [...aposts, ...page.items]
  }, [] as Post[])

  return <div>{!error && posts && <PostGrid data={posts} />}</div>
}

export default App
