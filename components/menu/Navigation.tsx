import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { useState } from "react";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
const itemIds = [
  {
    color: 0,
    text: "Vote",
  },
  {
    color: 1,
    text: "Results",
  },
  {
    color: 2,
    text: "Admin",
  },
  {
    color: 3,
    text: "Architecture",
  },
  {
    color: 4,
    text: "Contact",
  },
];
const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
export const Navigation = (props: any) => {
  const [isOn, setIsOn] = useState(false);
  const [currentAccount, setAccount] = useState("");
  const switchRef = React.createRef();
  async function getAccount() {
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
    if (accounts.length === 0) {
      (window as any).localStorage.removeItem("metamask_account");
      setAccount("");
    } else {
      setAccount(currentAccount);
      (window as any).localStorage.setItem("metamask_account", accounts[0]);
    }
  }
  function checkConnection() {
    (window as any).ethereum
      .request({ method: "eth_accounts" })
      .then(handleAccountsChanged)
      .catch(console.error);
  }
  function handleAccountsChanged(accounts: Array<string>) {
    console.log(accounts);
    if (accounts.length === 0) {
      window.localStorage.removeItem("metamask_account");
      setIsOn(false);
    } else if (accounts[0] !== currentAccount) {
      setAccount(accounts[0]);
      window.localStorage.setItem("metamask_account", currentAccount);
      setIsOn(true);
    } else {
      setIsOn(true);
    }
  }
  React.useEffect(() => {
    if (typeof (window as any).ethereum !== "undefined") {
      //getAccount();
      checkConnection();
      //   if (currentAccount !== "") setIsOn(true);
      // } else {
      //   setIsOn(false);
      // }
    }
  }, [currentAccount]);
  React.useEffect(() => {
    if (!isOn) {
      checkConnection();
    } else {
    }
  }, [isOn]);
  const toggleSwitch = () => {
    if (!isOn) {
      getAccount();
    }
    setIsOn(!isOn);
  };
  return (
    props.isOpen && (
      <div>
        <motion.ul variants={variants}>
          {itemIds.map((i) => (
            <MenuItem i={i.color} key={i.color} text={i.text} />
          ))}
          <div
            className="switch enableEthereum"
            data-isOn={isOn}
            onClick={toggleSwitch}
          >
            <motion.div
              className="handle"
              layout
              transition={spring}
            ></motion.div>
          </div>
        </motion.ul>
      </div>
    )
  );
};
