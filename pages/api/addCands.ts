import type { NextApiRequest, NextApiResponse } from 'next'
type Data={
  updated:boolean
}
let admin:string;
export default function voter(req:NextApiRequest, res:NextApiResponse<Data>) {
  const {
    body: {id,cands},
    method,
   }= req;
  console.log(id,method);
  //console.log(req);
  switch (method) {
    case "POST":
      // Update or create data in your database
      if(id==admin){
        //add cands
        //cast vote
        res.status(200).json({updated:true});
      }
      else{
        res.status(200).json({updated:false});
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
