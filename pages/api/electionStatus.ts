import type { NextApiRequest, NextApiResponse } from "next";

export default function electionStatus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
  } = req;
  // Get status from contract
  let currState: boolean = true;
  //console.log(req);
  switch (method) {
    case "GET":
      break;
    case "POST":
      if (currState) {
        //stop voting
        currState = false;
      } else {
        currState = true;
        //reset voters
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return; //else will cause error since res.status() after this scope is called after?
  }
  res.status(200).json({ status: currState });
}
