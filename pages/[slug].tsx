import { Post, PostData, SlugsData } from 'apollo-graphql-types'
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
    fallback: true
  }
}

const fetchPost = async (slug: string) => {
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
}

export async function getStaticProps({ params }: SlugParamsProps) {
  const { slug } = params
  const post = await fetchPost(slug)
  return {
    props: {
      post
    }
  }
}
