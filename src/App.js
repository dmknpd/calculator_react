import { useState } from "react";

import "./App.css";

const App = () => {
  const [firstNum, setFirstNum] = useState("0");
  const [arythm, setArythm] = useState(null);
  const [secondNum, setSecondNum] = useState(null);
  const [result, setResult] = useState(null);

  const firstEnter = (num) => {
    setFirstNum((prevNum) =>
      prevNum && prevNum !== "0" ? numCheck(prevNum + num) : num
    );
  };

  const secondEnter = (num) => {
    setSecondNum((prevNum) => (prevNum ? numCheck(prevNum + num) : num));
  };

  const numberEnter = (e) => {
    const number = e.target.value;

    if (firstNum === "Digit Limit Met" || secondNum === "Digit Limit Met") {
      return;
    }

    if (result || result === 0) {
      clearAll(number);
      return;
    }

    if (arythm) {
      secondEnter(number);
    } else {
      firstEnter(number);
    }
  };

  const clearAll = (num = "0", action = null) => {
    setFirstNum(num);
    setArythm(action);
    setSecondNum(null);
    setResult(null);
  };

  const arythEnter = (e) => {
    const symb = e.target.value;

    if (firstNum === "Digit Limit Met" || secondNum === "Digit Limit Met") {
      return;
    }

    if (result || result === 0) {
      clearAll(result, symb);
    }
    setArythm(symb);
  };

  const calculateResult = () => {
    if (!firstNum || (firstNum === "0" && !secondNum && !arythm)) {
      return;
    }

    if (!arythm || secondNum === null) {
      return;
    }

    let res = 0;

    switch (arythm) {
      case "/":
        res = +firstNum / +secondNum;
        break;
      case "*":
        res = +firstNum * +secondNum;
        break;
      case "-":
        res = +firstNum - +secondNum;
        break;
      case "+":
        res = +firstNum + +secondNum;
        break;
      default:
        res = +firstNum;
    }

    setResult(numCheck(res));
  };

  const numCheck = (num) => {
    let cheked = num;
    if (cheked > 99999999999999999999) {
      cheked = "Digit Limit Met";
    }
    return cheked;
  };

  const shadow = () => {
    if (result === "Digit Limit Met") {
      return;
    }
    const first = firstNum && arythm ? firstNum : "";
    const action = arythm ? arythm : "";
    const second = secondNum ? secondNum : "";
    const res = result ? "=" + result : "";
    const shadow = `${first}${action}${second}${res}`;

    if (shadow.length > 31) {
      let start = shadow.length - 31;
      return `...${shadow.slice(start)}`;
    }
    return shadow;
  };

  const first = arythm ? null : firstNum;
  const aryth = secondNum ? null : arythm;
  const second = result || result === 0 ? null : secondNum;
  const res = result || result === 0 ? result : null;

  return (
    <div className="calculator">
      <div id="display-container">
        <div id="shadow">{shadow()}</div>
        <div id="display">
          {res}
          {second}
          {aryth}
          {first}
        </div>
      </div>
      <div className="buttonsBlock">
        <div className="row">
          <button
            className="button btn-big ac"
            value="AC"
            onClick={() => clearAll()}
          >
            AC
          </button>
          <button className="button" value="/" onClick={arythEnter}>
            /
          </button>
          <button className="button" value="*" onClick={arythEnter}>
            *
          </button>
        </div>
        <div className="row">
          <button className="button" value="7" onClick={numberEnter}>
            7
          </button>
          <button className="button" value="8" onClick={numberEnter}>
            8
          </button>
          <button className="button" value="9" onClick={numberEnter}>
            9
          </button>
          <button className="button" value="-" onClick={arythEnter}>
            -
          </button>
        </div>
        <div className="row">
          <button className="button" value="4" onClick={numberEnter}>
            4
          </button>
          <button className="button" value="5" onClick={numberEnter}>
            5
          </button>
          <button className="button" value="6" onClick={numberEnter}>
            6
          </button>
          <button className="button" value="+" onClick={arythEnter}>
            +
          </button>
        </div>
        <div className="row last-row">
          <button className="button" value="1" onClick={numberEnter}>
            1
          </button>
          <button className="button" value="2" onClick={numberEnter}>
            2
          </button>
          <button className="button" value="3" onClick={numberEnter}>
            3
          </button>
          <button className="button equal-sign" onClick={calculateResult}>
            =
          </button>
        </div>
        <div className="row last-row">
          <button className="button btn-big" value="0" onClick={numberEnter}>
            0
          </button>
          <button className="button" value="." onClick={numberEnter}>
            .
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
