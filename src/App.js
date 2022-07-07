import { React, useState } from "react"

function App() {

  const [calc, setCalc] = useState("")
  const [result, setResult] = useState("")
  
  
  const ops = ['/', '*', '+', '-', '.']


  const updateCalc = value => {
    if (value === "Enter") {
      calculate()
      return;
    } else if (value === "Backspace") {
      deleteLast()
      return;
    }
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      setCalc(calc.slice(0,-1) + value)
      return;
    }

    setCalc(calc + value)

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  }


  const createDigits = () => {
    const digits = []

    for (let i = 1; i < 10; i++) {
       digits.push(
        <input type="button" 
        onClick={() => updateCalc(i.toString())} key={i}
        
        value={i} />
          
      )
    }
     
    return digits
  }


  const calculate = () => {
    setCalc(eval(calc).toString())
    setResult("")

  }

  const deleteLast = () => {
    if (calc === "") {
      return;
    }
    
    const value = calc.slice(0, -1);

    setCalc(value)

  }

  // const deleteLast = () => {
    
  // }


  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ""} 
          &nbsp;
          <input value={ calc || "0"} onKeyDown={(e) => updateCalc(e.key)}/>
          </div>
        <div className="operators">  
          <input type="button" onClick={() => setCalc("")} value="CLR" />
          <input type="button" onClick={deleteLast} value="DEL" />
        </div>   
        <div className="operators">
          <input type="button" onClick={() => updateCalc("/")} value="/" />
          <input type="button" onClick={() => updateCalc("*")} value="*" />
          <input type="button" onClick={() => updateCalc("+")} value="+" />
          <input type="button" onClick={() => updateCalc("-")} value="-" />
        </div>   

        <div className="digits">
          { createDigits() }
          <input type="button" onClick={() => updateCalc(".")} value="." />
          <input type="button" onClick={() => updateCalc("0")} value="0" />

          <input type="button" id="enter" onClick={calculate} value="=" />
        </div>
      </div>
    </div>
  );
}

export default App;
