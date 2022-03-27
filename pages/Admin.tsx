import { NextPage } from "next";
import { useState } from "react";
import * as React from "react";
import MenuBar from "../components/menu/MenuBar";
const Admin: NextPage = () => {
  const [isAuth, setAuth] = useState(false);
  const [ElectStatus, setElectStatus] = useState(false);
  let account = "";
  React.useEffect(() => {
    //getAuthDetails
    setAuth(true);
    setElectStatus(true);
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
              setElectStatus(!ElectStatus);
            }}
          >
            <div className="box-title">
              {" "}
              {ElectStatus ? "Conclude " : "Start "}Election
            </div>
          </div>
          <div className="grid-box marg">
            <div className="box-title">See Current Results &rarr;</div>
          </div>
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
