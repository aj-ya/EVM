import { NextPage } from "next";
import { useState } from "react";
import * as React from "react";
import MenuBar from "../components/menu/MenuBar";
import ResultChart from "../components/ResultChart";
import CandidateHandler from "../components/candidateHandler";
import VoterHandler from "../components/voterHandler";
type ResultArray = {
  name: string;
  value: number;
}[];

function RetDashComp(props: any) {
  function RetButtonText() {
    return ElectionStatus ? "Conclude" : "Commence";
  }
  const [ElectionStatus, setElectionStatus] = React.useState(false);
  let status: boolean = props.status;
  if (status) {
    return (
      <div className="handlers">
        <div className="Candidates">
          <h1 className="title">Add Candidates</h1>
          <CandidateHandler />
        </div>
        <div className="Voters">
          {/* <h1 className="title">Change Election Status</h1> */}
          {/* <VoterHandler /> */}
          <div className="grid">
            <div
              className="grid-box"
              onClick={() => {
                if (confirm("Are you sure you want to save this.")) {
                  setElectionStatus(!ElectionStatus);
                  console.log(ElectionStatus);
                }
              }}
            >
              <div className="box-title">{RetButtonText()} Election</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="electionDetails">
        <div className="candList">
          <h1 className="title">All Candidates</h1>
          <div className="singleCand"></div>
        </div>
      </div>
    );
  }
}
const Admin: NextPage = () => {
  const [isAuth, setAuth] = useState<boolean>(false);
  const [ElectStatus, setElectStatus] = useState<boolean>(false);
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
  const getElection = async (data?: any) => {
    let stat: boolean;
    if (!data) {
      stat = await fetch("http://localhost:3000/api/electionStatus")
        .then((d) => d.json())
        .then((d: any) => d.status);
    } else {
      stat = await fetch("http://localhost:3000/api/electionStatus", data)
        .then((d) => d.json())
        .then((d: any) => d.status);
    }
    setElectStatus(stat);
    console.log(stat);
  };
  let account = "";

  React.useEffect(() => {
    //getAuthDetails
    setAuth(true);
    getResults();
    getElection();
    account = localStorage.getItem("metamask_account") || "";
  }, []);

  if (isAuth)
    return (
      <div className="container">
        <h1 className="title">Hello, Admin</h1>
        <div className="dashboard">
          <div className="noElect">
            <RetDashComp status={ElectStatus} />
          </div>
          <div className="results">
            <h1 className="title result_title">Current Results</h1>

            <ResultChart data={pollResults} />
          </div>
        </div>
        <div className="grid">
          {/* <div
            className="grid-box marg"
            onClick={() => {
              getElection({
                method: "POST",
                headers: { "Content-Type": "application/json" },
              });
            }}
          >
            <div className="box-title">
              {" "}
              {ElectStatus ? "Conclude " : "Start "}Election
            </div>
          </div> */}
          {/* <a href="/Results">
            <div className="grid-box marg">
              <div className="box-title">See Current Results &rarr;</div>
            </div>
          </a> */}
        </div>
        <MenuBar />
      </div>
    );
  else {
    return (
      <div className="container">
        <h1 className="title">
          <div>You are not the authenticated admin.</div>
          <a href="/">Click here to go back home.</a>
        </h1>
        <MenuBar />
      </div>
    );
  }
};
export default Admin;
