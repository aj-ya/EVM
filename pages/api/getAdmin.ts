import { NextApiRequest,NextApiResponse } from "next";
type Data={
    admin:string
}
export default function pollResults(req:NextApiRequest,res:NextApiResponse<Data>){
    //geth
    res.status(200).json({admin:"0xasf"});   
}