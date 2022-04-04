import { NextPage } from "next";
import { useState } from "react";
import * as React from "react";
import MenuBar from "../components/menu/MenuBar";
const Admin: NextPage = () => {
  const [isAuth, setAuth] = useState<boolean>(false);
  const [ElectStatus, setElectStatus] = useState<boolean>(false);
  const getElection = async (data?: any) => {
    let stat: boolean;
    if (!data)
      stat = await fetch("http://localhost:3000/api/electionStatus")
        .then((d) => d.json())
        .then((d: any) => d.status);
    else
      stat = await fetch("http://localhost:3000/api/electionStatus", data)
        .then((d) => d.json())
        .then((d: any) => d.status);
    setElectStatus(stat);
    console.log(stat);
  };
  let account = "";

  React.useEffect(() => {
    //getAuthDetails
    setAuth(true);
    getElection();
    account = localStorage.getItem("metamask_account") || "";
  }, []);

  if (isAuth)
    return (
      <div className="container">
        <h1 className="title">Hello, Admin</h1>
        <div className="grid">
          <div
            className="grid-box marg"
            onClick={() => {
              getElection({
                method: "POST",
                headers: { "Content-Type": "application/json" },
              });
            }}
            // onTouchStart={() => {
            //   getElection({
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //   });
            // }}
          >
            <div className="box-title">
              {" "}
              {ElectStatus ? "Conclude " : "Start "}Election
            </div>
          </div>
          <a href="/Results">
            <div className="grid-box marg">
              <div className="box-title">See Current Results &rarr;</div>
            </div>
          </a>
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
