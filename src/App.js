import React, { useState } from "react";
import "./App.css";
//import { calculate } from "./components/calculate.js";

const App = () => {

  const [result, setResult] = useState("");
  const [calc, setCalc] = useState("");
  const ops = ["/", "*", "-", "+", ".", "%"];

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button
          className="pad-item"
          onClick={() => updateCalc(i.toString())}
          key={i}
        >
          {i}
        </button>
      );
    }
    return digits;
  };

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }
    if( (value==='0'||'1'||'2'||'3'||'4'||'6'||'7'||'8'||'9') && (calc.slice(0)==='0') && (value!=='.') )
    {
      console.log('cant use octal')
      return ;
    }
    setCalc(calc + value);
    document.querySelector('#input').classList.remove('result');
    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const calculator = () => {
    setCalc(result);
    setResult('');
    document.querySelector('#input').classList.add('result');
  };

  const clear = () => {
    setCalc("");
    setResult("");
    document.querySelector('#input').classList.remove('result');
  };

  const backspace = () => {
    if (calc === "") {
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value);
    document.querySelector('#input').classList.remove('result');
  };


  return (
    <div className="pad">
      <div className="display">
        <div id="input">{calc || '|'}</div>
        <div id="output">{result ? result : '|'}</div>
      </div>
      {/* <div className="misc">
        <button className="pad-item" onClick={() => updateCalc("^(2)")}>
          <div>
            x
            <sup>
              <small>2</small>
            </sup>
          </div>
        </button>
        <button className="pad-item" onClick={() => updateCalc("^(3)")}>
          <div>
            x
            <sup>
              <small>3</small>
            </sup>
          </div>
        </button>
        <button className="pad-item" onClick={() => updateCalc("^")}>
          <div>
            x
            <sup>
              <small>y</small>
            </sup>
          </div>
        </button>
        <button className="pad-item"> &pi; </button>
      </div> */}
      <div className="ctrl">
        <button className="pad-item" id="clear" onClick={() => clear()}>
          C
        </button>
        <button className="pad-item" onClick={() => updateCalc("/")}>
          /
        </button>
        <button className="pad-item" onClick={() => updateCalc("*")}>
          &times;
        </button>
        <button className="pad-item" onClick={() => backspace()}>
          <i className="fas fa-backspace"></i>
        </button>
      </div>
      <div className="operators">
        <button className="pad-item" onClick={() => updateCalc("-")}>
          -
        </button>
        <button className="pad-item" onClick={() => updateCalc("+")}>
          +
        </button>
        <button className="pad-item" id="equal" onClick={() => calculator()}>
          =
        </button>
      </div>

      <div className="digits">
        {createDigits()}
        <button className="pad-item" onClick={() => updateCalc("%")}>
          %
        </button>
        <button className="pad-item" onClick={() => updateCalc("0")}>
          0
        </button>
        <button className="pad-item" onClick={() => updateCalc(".")}>
          .
        </button>
      </div>
    </div>
  );
};

export default App;
