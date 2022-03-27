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
  const [account, setAccount] = useState("");
  React.useEffect(() => {
    if (typeof (window as any).ethereum !== "undefined") {
      if (
        (window as any).ethereum.isConnected() &&
        localStorage.getItem("metamask_account")
      )
        setIsOn(true);
    } else {
      setIsOn(false);
    }
  }, []);
  async function getAccount() {
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    localStorage.setItem("metamask_account", account);
  }
  const toggleSwitch = () => {
    if (!isOn) getAccount();
    if (isOn) window.localStorage.removeItem("metamask_account");
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
            <motion.div className="handle" layout transition={spring} />
          </div>
        </motion.ul>
      </div>
    )
  );
};
