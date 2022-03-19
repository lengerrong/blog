export const graphqlAPIURL = () => {
  const path = '/api/graphql'
  if (
    process?.env?.VERCEL_ENV === 'preview' ||
    process?.env?.VERCEL_ENV === 'development'
  ) {
    return `https:// + ${process.env.VERCEL_URL!} + ${path}`
  }
  if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
    return path
  }
  return `${process.env.BLOG_URL!}${path}`
}
