import * as React from "react";
import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const colors = [
  "#545AA7",
  "#FF008C",
  "#D309E1",
  "#9C1AFF",
  "#7700FF",
  "#4400FF",
];

export const MenuItem = ({ i, text }: any) => {
  const style = { color: `${colors[0]}` };
  //, border: `2px solid ${colors[i]}`
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* <div className="icon-placeholder" style={style} /> */}
      <a href={text}>
        <div className="text-placeholder" style={style}>
          {text} &rarr;
        </div>
      </a>
    </motion.li>
  );
};
