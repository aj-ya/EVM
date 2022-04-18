import { NextPage } from "next";
import styles from "../styles/Vote.module.css";
import { Key, useEffect, useRef, useState } from "react";
import MenuBar from "../components/menu/MenuBar";
const Vote: NextPage = () => {
  const [alreadyCast, setCastVote] = useState(false);
  const [getCand, setCand] = useState("");
  let id: string = "4";
  const [candidates, setCandiates] = useState([
    "Aam Aadmi Party",
    "Bharatiya Janata Party",
    "Indian National Congress",
    "None Of the Above",
  ]);

  function MapCands(props: any) {
    return props.allCands.map((scand: String) => {
      return (
        <div
          className={styles.gridBox}
          onClick={(e) => {
            setCand((e.target as any).innerHTML);
            console.log(getCand);
          }}
          key={scand as Key}
        >
          <div className={styles.boxTitle}>{scand}</div>
        </div>
      );
    });
  }
  async function castVote() {
    let d = await fetch("http://localhost:3000/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ id: { id }, choice: { getCand } }),
    }).then((d) => d.json());
    setCastVote(true);
    console.log(d);
  }
  async function getCandidates() {
    let res = await fetch("http://localhost:3000/api/candidates")
      .then((d) => d.json())
      .then((d) => d.results)
      .then((array) => {
        return array.map((a: any) => a[0]);
      });
    setCandiates(res);
  }
  async function checkVoted(id: string) {
    let res: boolean = await fetch("http://localhost:3000/api/voted/" + id)
      .then((d) => d.json())
      .then((d) => (d as any).voted);
    if (res) setCastVote(true);
    else setCastVote(false);
  }
  useEffect(() => {
    //fetch candidates and check if account has casted vote
    checkVoted(id);
    getCandidates();
  }, []);
  if (!alreadyCast)
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to the voting booth.</h1>
        <div className={styles.selectedWrap}>
          <div>You have chosen</div>
          <span className={styles.selectedCand}>{getCand}</span>
        </div>
        <div className={styles.grid}>
          <MapCands allCands={candidates} />
        </div>
        <button
          className={styles.submit}
          onClick={(e) => {
            if (candidates.includes(getCand)) {
              castVote();
              //castVote
            } else {
              (e.target as any).style.border = "3px solid red";
            }
          }}
        >
          Cast Vote.
        </button>
        <MenuBar />
      </div>
    );
  else {
    return (
      <div className="container">
        <h1 className="title">You have already cast your vote.</h1>
        <MenuBar />
      </div>
    );
  }
};
export default Vote;
