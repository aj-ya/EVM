import { NextApiRequest,NextApiResponse } from "next";
import Server from "next/dist/server/next-server";
type Data={
    results:
    {
        name:string,
        value:number
    }[]
}
export default function pollResults(req:NextApiRequest,res:NextApiResponse<Data>){
    console.log("hello");
    res.status(200).json({results:[
        { name: "BJP", value: 400 },
        { name: "AAP", value: 300 },
        { name: "INC", value: 300 },
        { name: "NOTA", value: 200 },
      ]});   
}