import { NextPage } from "next";
import MenuBar from "../components/menu/MenuBar";
import React from "react";
import ResultChart from "../components/ResultChart";
const Results: NextPage = () => {
  const [Results, _setResults] = React.useState([
    { name: "BJP", value: 400 },
    { name: "AAP", value: 300 },
    { name: "INC", value: 300 },
    { name: "NOTA", value: 200 },
  ]);
  const getResults = async function () {
    let result = await fetch("s");
    _setResults(result as any);
  };
  let [winner, setWinner] = React.useState("BJP");
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
    //getResults();
    setWinner("AAP");
  }, []);
  return (
    <div className="container">
      {!Results ? (
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
          <ResultChart data={Results} />
        </>
      )}
      <MenuBar />
    </div>
  );
};
export default Results;
