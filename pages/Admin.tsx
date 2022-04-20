import { NextPage } from "next";
import { useState } from "react";
import * as React from "react";
import MenuBar from "../components/menu/MenuBar";
import ResultChart from "../components/ResultChart";
import CandidateHandler from "../components/candidateHandler";
import { rpcLink } from "../utility/addresses";

export async function getServerSideProps() {
  const candidates = await fetch(rpcLink + "/api/candidates")
    .then((d) => d.json())
    .then((d) => d.results)
    .then((array) => {
      return array.map((a: any) => {
        return { name: a[0], value: parseInt(a[1]) };
      });
    });
  const status = await fetch(rpcLink + "/api/electionStatus")
    .then((d) => d.json())
    .then((d: any) => d.status);
  console.log(status);
  const admin = await fetch(rpcLink + "/api/getAdmin")
    .then((d) => d.json())
    .then((d) => d.admin);
  console.log(admin);
  return {
    props: {
      candidates,
      status,
      admin,
    },
  };
}

function Auth(props: any) {
  let { isauth, ElectStatus, pollResults } = props;
  if (isauth) {
    return (
      <div className="container">
        <h1 className="title">Hello, Admin</h1>
        <div className="dashboard">
          <div className="noElect">
            <RetDashComp status={ElectStatus} candidates={pollResults} />
          </div>
          <div className="results">
            <h1 className="title result_title">Current Results</h1>

            <ResultChart data={pollResults} />
          </div>
        </div>
        <MenuBar />
      </div>
    );
  } else {
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
}
function RetDashComp(props: any) {
  const [ElectionStatus, setElectionStatus] = React.useState(props.status);
  let status: boolean = props.status;
  const pollResults = props.candidates;
  if (!status) {
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
              onClick={async () => {
                if (confirm("Are you sure you want to continue.")) {
                  setElectionStatus(!ElectionStatus);
                  let d = await fetch(rpcLink + "/api/electionStatus", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                  }).then((d) => d.json());
                  console.log(d);
                  console.log(ElectionStatus);
                }
              }}
            >
              <div className="box-title">Commence Election</div>
            </div>
            <div
              className="grid-box"
              onClick={async () => {
                if (confirm("Are you sure you want to clear all data.")) {
                  const cleared = await fetch(rpcLink + "/api/clearElection")
                    .then((d) => d.json())
                    .then((d: any) => d.cleared);
                  if (cleared) alert("cleared");
                }
              }}
            >
              <div className="box-title">Clear Election</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    function MapCands() {
      return pollResults.map((k: any) => {
        return (
          <div className="singleCand" key={k.name}>
            &#62; {k.name}
          </div>
        );
      });
    }
    return (
      <div className="electionDetails">
        <div className="candList">
          <h1 className="title">All Candidates</h1>
          <div className="candWrap">
            <MapCands />
          </div>
          <div className="grid">
            <div
              className="grid-box"
              onClick={async () => {
                if (confirm("Are you sure you want to continue.")) {
                  setElectionStatus(!ElectionStatus);
                  let d = await fetch(rpcLink + "/api/electionStatus", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                  }).then((d) => d.json());
                  console.log(d);
                  console.log(ElectionStatus);
                }
              }}
            >
              <div className="box-title">Conclude Election</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Admin: NextPage = (props: any) => {
  const admin = props.admin;
  console.log(admin);
  const ElectStatus = props.status;
  const pollResults = props.candidates;
  const [isAuth, setAuth] = useState<boolean>();
  let [id, setId] = useState("");
  React.useEffect(() => {
    (window as any).ethereum
      .request({ method: "eth_accounts" })
      .then((x: any) => {
        if (x.length !== 0) setId(x[0]);
      })
      .catch(console.error);
    console.log("a");
    id === admin ? setAuth(true) : setAuth(false);
    console.log(isAuth);
    console.log(ElectStatus);
  });
  return (
    <Auth isauth={isAuth} ElectStatus={ElectStatus} pollResults={pollResults} />
  );
};
export default Admin;
