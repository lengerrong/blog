import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import { Post } from 'apollo-graphql-types'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Divider } from '@mui/material'

export type PostsProps = {
  data: Post[]
}

const getPostPreview = (post: Post) => {
  /* eslint-disable */
  return post?.plaintext?.split('\n').slice(0, 14).join('\n')
  /* eslint-enable */
}

const PostGrid = ({ data }: PostsProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {data.map((post) => (
          <Card
            key={post.slug}
            sx={{
              width: '40vw',
              margin: 'auto',
              marginTop: '10vh',
              marginBottom: '10vh'
            }}
          >
            <Link href={`/${post.slug}`}>
              <CardContent sx={{ justifyContent: 'center' }}>
                <Typography variant='h4'>{post.title}</Typography>
                <Divider sx={{ marginTop: '2vh', marginBottom: '2vh' }} />
                <Typography variant='body1' style={{ whiteSpace: 'pre-line' }}>
                  {getPostPreview(post)}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        ))}
      </Grid>
    </Box>
  )
}

export default PostGrid
