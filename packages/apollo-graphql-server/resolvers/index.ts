import post from './post'
import posts from './posts'
import slugs from './slugs'

export const resolvers = {
  Query: {
    posts,
    post,
    slugs
  }
}
