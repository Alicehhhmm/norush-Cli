import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import styles from "./app.module.css";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>webpack5 + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
      </div>

      <div className="text-3xl font-bold underline text-sky-500 ">
        TailWindCSS
      </div>

      <div className={styles.modtitle}>CSS Module</div>
    </>
  );
};

export default App;
