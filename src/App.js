import "./App.css";
import character from "./images/crayon-man-with-sword.png";
import { useState, useRef, useEffect } from "react";

function App() {
  const [input, setInput] = useState("");

  const transportType = useRef();

  function handleChange(e) {
    const text = e.target.value;
    setInput(text);
    console.log(text);
  }
  
  async function onClick() {
    console.log(transportType.current.value);

    const headers = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.API_KEY
      },
      data:JSON.stringify( {
        distance: Number(input),
        type: transportType.current.value
      })
    }
    const response = await fetch(`https://app.trycarbonapi.com/api/publicTransit`, headers)
    const data = await response.json()
    console.log("RESPONSE: " + data)
  }

  /* curl --request POST
  --url https://app.trycarbonapi.com/api/publicTransit
  --header 'Authorization: Bearer API_KEY'
  --data '{
      "distance": 500,
      "type": Taxi
      }'
  */

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
    </div>
  );
}

export default App;
