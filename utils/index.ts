import log from 'logging'

export const graphqlAPIURL = () => {
  const path = '/api/graphql'
  if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
    return path
  }
  if (
    process?.env?.VERCEL_ENV === 'preview' ||
    process?.env?.VERCEL_ENV === 'development'
  ) {
    log.info('graphql api', `https:// + ${process.env.VERCEL_URL!} + ${path}`)
    return `https://${process.env.VERCEL_URL!}${path}`
  }
  return `${process.env.BLOG_URL!}${path}`
}
