import type { NextApiRequest, NextApiResponse } from 'next'

import { getSession } from 'next-auth/react'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const space = 2
  res.send(JSON.stringify(session, null, space))
}
