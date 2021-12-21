import axios, { AxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({})
  }
  const { api } = req.query
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${
    api as string
  }?key=${process.env.FIREBASE_API_KEY!}`
  return axios
    .post(url, req.body)
    .then((response) => {
      res.status(StatusCodes.OK).json(response.data)
    })
    .catch((err: Error | AxiosError) => {
      if (axios.isAxiosError(err) && err.response) {
        const errRes = err.response
        res.status(errRes.status).json(errRes.data)
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
      }
    })
}
