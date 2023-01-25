import "./App.css";
import character from "./images/crayon-man-with-sword.png";
import { useState, useRef, useEffect } from "react";

function App() {
  const [input, setInput] = useState("");
  const[carbonFootprint, setCarbonFootprint] = useState("")
  const [weight, setWeight] = useState("");
  const[trees, setNumberOfTrees] = useState("")

  const transportType = useRef();
  const unitType = useRef();


  function handleChange(e) {
    const text = e.target.value;
    setInput(text);
    console.log(text);
  }

  
  function handleChangeTree(e) {
    const text = e.target.value;
    setWeight(text * 0.005);
    console.log(text);
  }
  
  async function onClick() {

    const response = await fetch(`https://app.trycarbonapi.com/api/publicTransit`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMmIzN2UwYWVkNzY4Y2JkM2IzOGM3ZTI2MGY4MzY3NGM0ZDBhMzc3YTY4ZDkzNzc0NTI5YTBlZDNiOWQyYTI5NWRlZWE0ODUxMzVhNDFkY2IiLCJpYXQiOjE2NzQ2NDQxMTIsIm5iZiI6MTY3NDY0NDExMiwiZXhwIjoxNzA2MTgwMTEyLCJzdWIiOiIzMTM0Iiwic2NvcGVzIjpbXX0.VNfj4FryVeqpAvpwoRnWtMnwt6hKDycdn_ljb9An5vkX9eXKn-N0nO2Y8y8zXqNckqFh712cehFV8HQtwhDgeg"
      },
      body:JSON.stringify( {
        "distance": Number(input),
        "type": transportType.current.value
      })
    })
    const data = await response.json()
    setCarbonFootprint(data.carbon)
  }

  async function onClickTree() {

    const response = await fetch(`https://app.trycarbonapi.com/api/treeEquivalent`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMmIzN2UwYWVkNzY4Y2JkM2IzOGM3ZTI2MGY4MzY3NGM0ZDBhMzc3YTY4ZDkzNzc0NTI5YTBlZDNiOWQyYTI5NWRlZWE0ODUxMzVhNDFkY2IiLCJpYXQiOjE2NzQ2NDQxMTIsIm5iZiI6MTY3NDY0NDExMiwiZXhwIjoxNzA2MTgwMTEyLCJzdWIiOiIzMTM0Iiwic2NvcGVzIjpbXX0.VNfj4FryVeqpAvpwoRnWtMnwt6hKDycdn_ljb9An5vkX9eXKn-N0nO2Y8y8zXqNckqFh712cehFV8HQtwhDgeg"
      },
      body:JSON.stringify( {
        "weight": Number(weight),
        "unit": "kg"
      })
    })
    const data = await response.json()
    setNumberOfTrees(data["Number Of Trees"])
    console.log(data)
  }



  return (
    <div className="App">
      <div className="Character">
        Your Carbon Warrior
        <img src={character} alt="character" />
      </div>
      <div className="Stats">
        <input onChange={handleChange} />
        <div className="transport-type">
          <label className="transport"> Transport-Type: </label>
          <select ref={transportType}>
            <option value="Taxi">Taxi</option>
            <option value="ClassicBus">ClassicBus</option>
            <option value="EcoBus">EcoBus</option>
            <option value="Coach">Coach</option>
            <option value="NationalTrain">NationalTrain</option>
            <option value="LightRail">LightRail</option>
            <option value="Subway">Subway</option>
            <option value="FerryOnFoot">FerryOnFoot</option>
            <option value="FerryInCar">FerryInCar</option>
          </select>
        </div>
        <button onClick={onClick}>Get Your Carbon Footprint</button>
      </div>
      <div>
        <h3>{carbonFootprint}</h3>
      </div>
     

      <div>
      <label className="transport"> No. Sheets Of Paper: </label>
      <input onChange={handleChangeTree} />
          <button onClick={onClickTree}>Tree Equivalent</button>
          <h3>{trees}</h3>
      </div>
    </div>
  );
}

export default App;
