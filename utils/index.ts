export const graphqlAPIURL = () => {
  const path = '/api/graphql'
  if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
    return path
  }
  return `${process.env.BLOG_URL!}${path}`
}
