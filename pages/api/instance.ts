import type { NextApiRequest, NextApiResponse } from 'next'

type Data={
    voted : boolean
}
export default function instance(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({voted:true})
}
