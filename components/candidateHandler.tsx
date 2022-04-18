import { useRef, useState } from "react";
import Image from "next/image";
import styles from "../styles/candhandler.module.scss";
import cancel from "../assets/images/cancel.png";
export default function CandidateHandler() {
  const inputEl = useRef(null);
  const [cands, setCands]: Array<any> = useState([]);
  function MapCands() {
    console.log(cands);
    return cands.map((el: string) => {
      return (
        <div className={styles.textWrap} key={el}>
          <div className={styles.text} id={el}>
            {el}
          </div>
          <div
            className={styles.cancelButton}
            onClick={() => {
              let curr = document.getElementById(el);
              let txt = (curr as any).innerText;
              console.log(txt);
              const result = cands.filter((el: any) => el !== txt);
              setCands(result);
            }}
          >
            <Image src={cancel} alt="remove" />
          </div>
        </div>
      );
    });
  }
  return (
    <div className={styles.handleContainer}>
      <form
        className={styles.candForm}
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          // console.log(inputEl.current.value);
          if (inputEl.current !== null && (inputEl.current as any).value !== "")
            if (!cands.includes((inputEl.current as any).value))
              setCands((cands: Array<any>) => [
                ...cands,
                (inputEl.current as any).value as string,
              ]);
          // console.log(cands);
        }}
      >
        <label htmlFor="candidates">Candidate Name:</label>
        <input type="text" ref={inputEl} name="candidates" />
        <input type="submit" className="blue" value="Add" />
      </form>
      <div className={styles.addedCands}>{MapCands()}</div>
      <button
        className={styles.Finalize}
        onClick={async () => {
          let admin = await fetch("http://localhost:3000/api/getAdmin")
            .then((d) => d.json())
            .then((d) => d.admin);
          console.log(cands);
          let d = await fetch("http://localhost:3000/api/vote", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ id: { admin }, cands: { cands } }),
          }).then((d) => d.json());
          console.log(d);
          //post rest
        }}
      >
        Finalize
      </button>
    </div>
  );
}
