import styles from "./App.module.css";
import { useState, useEffect } from "react";
import Redirect from ".//Screen/Redirect";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

function App() {
  const [width, setWindowWidth] = useState(0);
  const [userLog, setUserLog] = useState();
  const [userBasicData, setUserBasicData] = useState();
  const updateUserLog = (newValue) => {
    setUserLog(newValue);
  };
  const updateUserBasicData = (newValue) => {
    setUserBasicData(newValue);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };
  return (
    <div className={styles.div} class="mh-100">
      <Redirect
        ScreenSize={width}
        userLog={userLog}
        userBasicData={userBasicData}
        updateUserLog={updateUserLog}
        updateUserBasicData={updateUserBasicData}
      />
    </div>
  );
}

export default App;
