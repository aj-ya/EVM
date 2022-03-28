import type { NextApiRequest, NextApiResponse } from 'next'

let voters:Array<string> = ["1", "2", "3"];
type Data={
  updated:boolean
}
export default function voter(req:NextApiRequest, res:NextApiResponse<Data>) {
  const {
    body: {id,choice},
    method,
   }= req;
  console.log(id,method);
  //console.log(req);
  switch (method) {
    // case "GET":
    //   // Get data from your database
    //   res.status(200).json({  name: `${id}` });
    //   break;
    case "POST":
      // Update or create data in your database
      if(!voters.includes(id as string)){
        voters.push(id as string);
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
