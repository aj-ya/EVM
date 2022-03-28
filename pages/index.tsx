import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import * as React from "react";
import { useState } from "react";
import MenuBar from "../components/menu/MenuBar";

const Home: NextPage = () => {
  const [eth, setEth] = useState(false);
  React.useEffect(() => {
    if (typeof (window as any).ethereum !== "undefined") {
      setEth(true);
    } else {
      setEth(false);
    }
  }, []);
  if (eth)
    return (
      <div className="container">
        <div className="title">Welcome to the Election Portal.</div>
        <div className="grid">
          <a className="grid-link" href="Vote">
            <div className="grid-box">
              <div className="box-title">Vote &rarr;</div>
              <p className="box-description">Proceed to voting booth.</p>
            </div>
          </a>
          <a className="grid-link" href="Results">
            <div className="grid-box">
              <div className="box-title">Results &rarr;</div>
              <p className="box-description">View election results.</p>
            </div>
          </a>
          <a className="grid-link" href="Admin">
            <div className="grid-box">
              <div className="box-title">Admin &rarr;</div>
              <p className="box-description">Proceed to Admin panel.</p>
            </div>
          </a>
        </div>
        <MenuBar />
      </div>
    );
  else {
    return (
      <div className="container">
        <h1 className="title">Please use a wallet like metamask.</h1>
      </div>
    );
  }
};

export default Home;
