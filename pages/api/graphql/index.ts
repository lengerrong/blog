// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createApolloGraphqlServer } from 'apollo-graphql-server'

const gqlServer = createApolloGraphqlServer()
const startServer = gqlServer.start()

type GraphqlHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>
let gqlHandler: GraphqlHandler | null = null

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer
  gqlHandler ||= gqlServer.createHandler({
    path: '/api/graphql'
  })
  await gqlHandler(req, res)
}

import cron from 'node-cron';

cron.schedule('*/60 * * * *', () => {
  // fetch posts every hour to avoid 
  // oracle shared database stoped(7 days no connections) and 
  // reclaimed(no activities in 3 months after stoped)
  // curl --request POST \
  // --url 'https://blog.errong.win/api/graphql' \
  // --header 'Content-Type: application/json' \
  // --data '{"operationName":null,"variables":{},"query":"{\n  posts(offset: 0) {\n    items {\n      title\n      plaintext\n      slug\n    }\n    hasMore\n    count\n  }\n}\n"}'
  const url = `${process.env.BLOG_URL!}/api/graphql`;
  const body = {
    "query": "{\n  posts(offset: 0) {\n    items {\n      title\n      plaintext\n      slug\n    }\n    hasMore\n    count\n  }\n}\n"
  }
  console.log('POST ', url, new Date());
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(async (res) => console.log(await res.json())).catch((error) => {
    console.error(error);
  });
});