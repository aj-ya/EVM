import { NextPage } from "next";
import MenuBar from "../components/menu/MenuBar";
import React from "react";
import ResultChart from "../components/ResultChart";
type Data = {
  results: {
    name: string;
    value: number;
  }[];
};
type ResultArray = {
  name: string;
  value: number;
}[];
const Results: NextPage = () => {
  const [electionState, setElectionState] = React.useState<boolean>(false);
  const getElection = async () => {
    let stat: boolean = await fetch("http://localhost:3000/api/electionStatus")
      .then((d) => d.json())
      .then((d: any) => d.status);
    setElectionState(stat);
    // console.log(stat);
  };
  const [pollResults, _setResults] = React.useState<ResultArray>([
    { name: "notaa", value: 404 },
  ]);
  const getResults = async function () {
    let result: ResultArray = await fetch(
      "http://localhost:3000/api/pollResults"
    )
      .then((d) => d.json())
      .then((d) => d.results);
    console.log(result);
    _setResults(result);
  };
  let [winner, setWinner] = React.useState("");
  // const [comp,setComp]=React.useState(0);

  // React.useEffect(()=>{
  //   getResults();
  // },[comp]);

  // React.useEffect(()=>{
  //   setInterval(()=>{
  //     setComp(comp+1)
  //   }, 10000)
  // }, [])
  React.useEffect(() => {
    getResults();
    getElection();
  }, []);
  React.useEffect(() => {
    let maxVotes: number = 0,
      maxVotesParty: string = "";
    for (let i of pollResults) {
      if (i.value > maxVotes) {
        maxVotesParty = i.name;
        maxVotes = i.value;
      }
    }
    setWinner(maxVotesParty);
  }, [pollResults]);
  return (
    <div className="container">
      {!electionState ? (
        <h1 className="title">
          No Results yet,
          <br />
          please try again after some time.
        </h1>
      ) : (
        <>
          <h1 className="title">
            The leading party is <span className="selectedCand">{winner}</span>
          </h1>
          <ResultChart data={pollResults} />
        </>
      )}
      <MenuBar />
    </div>
  );
};
export default Results;
