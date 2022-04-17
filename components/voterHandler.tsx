import { useRef, useState } from "react";
import Image from "next/image";
import styles from "../styles/candhandler.module.scss";
import cancel from "../assets/images/cancel.png";
export default function VoterHandler() {
  const inputEl = useRef(null);
  const [voters, setVoters]: Array<any> = useState([]);
  function MapVoters() {
    console.log(voters);
    return voters.map((el: string) => {
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
              const result = voters.filter((el: any) => el !== txt);
              setVoters(result);
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
            if (!voters.includes((inputEl.current as any).value))
              setVoters((voters: Array<any>) => [
                ...voters,
                (inputEl.current as any).value as string,
              ]);
          // console.log(voters);
        }}
      >
        <label htmlFor="voters">Voter ID:</label>
        <input type="text" ref={inputEl} name="voters" />
        <input type="submit" className="blue" value="Add" />
      </form>
      <div className={styles.addedCands}>{MapVoters()}</div>
      <button
        className={styles.Finalize}
        onClick={() => {
          console.log(voters);
          //post rest
        }}
      >
        Finalize
      </button>
    </div>
  );
}
