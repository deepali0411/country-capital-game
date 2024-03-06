import React, { useState, useEffect } from "react";
import cx from "classnames";
import _isEmpty from 'lodash/isEmpty';
import DATA from "./data";
import styles from "./app.module.scss";

function App() {
  const [gameData, setGameData] = useState([]);
  const [selectedOptions, setselectedOptions] = useState([]);
  const [clicked, setClicked] = useState(0);
  const [isCorrect, setIsCorrect] = useState();

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    let allData = [];
    Object.keys(DATA).forEach((key) => {
      allData.push(key);
      allData.push(DATA[key]);
    });
    setGameData(shuffle(allData));
  }, []);

  useEffect(() => {
    if (selectedOptions.length === 2) {
      setTimeout(() => {
        if (isCorrect) {
          setGameData((prev) =>
            prev.filter((data) => !selectedOptions.includes(data))
          );
        }
        setselectedOptions([]);
        setClicked(0);
      }, 1000);
    }
  }, [selectedOptions, isCorrect]);

  const handleClick = (data) => {
    setClicked((prev) => prev + 1);
    if (clicked === 0) {
      setselectedOptions([data]);
    }
    if (clicked === 1) {
      setselectedOptions((prev) => [...prev, data]);
      if (
        DATA[selectedOptions[0]] === data ||
        DATA[data] === selectedOptions[0]
      ) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    }
  };

  return (
    <div className={styles.App} >
      {!_isEmpty(gameData) ? (
        <>
          {gameData.map((data) => {
            return (
              <div
                className={cx(styles.cardContainer, {
                  [styles.blueBorder]:
                    selectedOptions.length === 1 && selectedOptions[0] === data,
                  [styles.greenBorder]:
                    selectedOptions.length === 2 &&
                    isCorrect &&
                    selectedOptions.includes(data),
                  [styles.redBorder]:
                    selectedOptions.length === 2 &&
                    !isCorrect &&
                    selectedOptions.includes(data),
                })}
                onClick={() => handleClick(data)}
              >
                {data}
              </div>
            );
          })}
        </>
      ) : (
        <div className={styles.congratulation}>Congratulations !</div>
      )}
    </div>
  );
}

export default App;
