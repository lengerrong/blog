import { Post, PostData, SlugsData } from 'apollo-graphql-types'
import log from 'logging'
import { graphqlAPIURL } from '../utils'

export type SlugPostProps = {
  post: Post
}

const SlugPost = ({ post }: SlugPostProps) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: post?.html
      }}
    ></div>
  )
}

export default SlugPost

const fetchSlugs = async () => {
  try {
    const response = await fetch(graphqlAPIURL(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: `{
        slugs
      }`
      })
    })
    const slugsData = (await response.json()) as SlugsData
    return slugsData.data.slugs
  } catch (e: unknown) {
    log.error(e)
    return []
  }
}

export type SlugProps = {
  slug: string
}

export type SlugParamsProps = {
  params: SlugProps
}

export async function getStaticPaths() {
  const slugs = await fetchSlugs()
  return {
    paths: slugs.map((slug) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

const fetchPost = async (slug: string) => {
  try {
    const response = await fetch(graphqlAPIURL(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: `{
        post(slug: "${slug}") {
          html
        }
      }`
      })
    })
    const postData = (await response.json()) as PostData
    return postData.data.post
  } catch (e: unknown) {
    log.error(e)
    return {} as Post
  }
}

export async function getStaticProps({ params }: SlugParamsProps) {
  const { slug } = params
  const post = await fetchPost(slug)
  if (post) {
    return {
      props: {
        post
      }
    }
  }
  return {
    notFound: true
  }
}
