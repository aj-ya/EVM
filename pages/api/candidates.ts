import { NextApiRequest,NextApiResponse } from "next";
type Data={
    results:string[]
}
export default function pollResults(req:NextApiRequest,res:NextApiResponse<Data>){
    res.status(200).json({results:["BJP","AAP","INC","NOTA"]});   
}