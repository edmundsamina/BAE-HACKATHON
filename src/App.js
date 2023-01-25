import "./App.css";
import "./index.css";
import character from "./images/crayon-man-with-sword.png";
import { useState, useRef, useEffect } from "react";
import Card from "./components/Card/Card";

function App() {
  const [input, setInput] = useState("");
  const [carbonFootprint, setCarbonFootprint] = useState("");
  const [weight, setWeight] = useState("");
  const [trees, setNumberOfTrees] = useState("");

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
    const response = await fetch(
      `https://app.trycarbonapi.com/api/publicTransit`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMmIzN2UwYWVkNzY4Y2JkM2IzOGM3ZTI2MGY4MzY3NGM0ZDBhMzc3YTY4ZDkzNzc0NTI5YTBlZDNiOWQyYTI5NWRlZWE0ODUxMzVhNDFkY2IiLCJpYXQiOjE2NzQ2NDQxMTIsIm5iZiI6MTY3NDY0NDExMiwiZXhwIjoxNzA2MTgwMTEyLCJzdWIiOiIzMTM0Iiwic2NvcGVzIjpbXX0.VNfj4FryVeqpAvpwoRnWtMnwt6hKDycdn_ljb9An5vkX9eXKn-N0nO2Y8y8zXqNckqFh712cehFV8HQtwhDgeg",
        },
        body: JSON.stringify({
          distance: Number(input),
          type: transportType.current.value,
        }),
      }
    );
    const data = await response.json();
    setCarbonFootprint(data.carbon);
  }

  async function onClickTree() {
    const response = await fetch(
      `https://app.trycarbonapi.com/api/treeEquivalent`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMmIzN2UwYWVkNzY4Y2JkM2IzOGM3ZTI2MGY4MzY3NGM0ZDBhMzc3YTY4ZDkzNzc0NTI5YTBlZDNiOWQyYTI5NWRlZWE0ODUxMzVhNDFkY2IiLCJpYXQiOjE2NzQ2NDQxMTIsIm5iZiI6MTY3NDY0NDExMiwiZXhwIjoxNzA2MTgwMTEyLCJzdWIiOiIzMTM0Iiwic2NvcGVzIjpbXX0.VNfj4FryVeqpAvpwoRnWtMnwt6hKDycdn_ljb9An5vkX9eXKn-N0nO2Y8y8zXqNckqFh712cehFV8HQtwhDgeg",
        },
        body: JSON.stringify({
          weight: Number(weight),
          unit: "kg",
        }),
      }
    );
    const data = await response.json();
    setNumberOfTrees(data["Number Of Trees"]);
    console.log(data);
  }

  return (

    <div className="App" data-theme="cyberpunk">
      <div className="character-container text-3xl font-bold underline">
        Your Carbon Warrior
        <img className="character" src={character} alt="character" />
      </div>
      <div className="carbon-footprint-cards">
      <div className="card w-96 h-96 bg-primary text-primary-content ">
        <div class="card-body">
          <h2 class="card-title">Your Public Transport Footprint!</h2>
          <input onChange={handleChange} placeholder="Enter Distance in KM" />

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
          <button className="btn" onClick={onClick}>
            Get Your Carbon Footprint
          </button>
        </div>
        <div>
          <h3>{carbonFootprint}</h3>
        </div>
      </div>

      <div class="card w-96 h-96 bg-primary text-primary-content">
        <div class="card-body">
          <h1 className="card-title">Calculate Number of Trees!</h1>
          <label className="transport"> How much paper do you use? </label>
          <input
            onChange={handleChangeTree}
            placeholder="No. of pieces of paper"
          />
          <button className="btn" onClick={onClickTree}>
            Tree Equivalent
          </button>
        </div>
        <div className="card-actions justify-end">
          <h2>{trees} trees!</h2>
        </div>
      </div>



      <div class="card w-96 h-96 bg-primary text-primary-content">
        <div class="card-body">
          <h1 className="card-title">Your Car Footprint!</h1>
          <label className="transport"> No. Sheets Of Paper: </label>
          <input onChange={handleChangeTree} />
          <button className="btn" onClick={onClickTree}>
            Tree Equivalent
          </button>
        </div>
        <h3>{trees}</h3>
      </div>


      <div class="card w-96 h-96 bg-primary text-primary-content">
        <div class="card-body">
          <h1 className="card-title">Calculate Number of Trees!</h1>
          <input onChange={handleChangeTree} placeholder="Enter Distance in KM"/>
          <label className="transport"> Car-Type: </label>
          <select ref={transportType}>
            <option value="SmallDieselCar">Taxi</option>
            <option value="MediumDieselCar">ClassicBus</option>
            <option value="LargeDieselCar">EcoBus</option>
            <option value="MediumHybridCar">Coach</option>
            <option value="LargeHybridCar">NationalTrain</option>
            <option value="SmallPetrolCar">LightRail</option>
            <option value="MediumPetrolCar">Subway</option>
            <option value="LargePetrolCar">FerryOnFoot</option>
            <option value="FerryInCar">FerryInCar</option>
          </select>
          <button className="btn" onClick={onClickTree}>
            GET YOUR CARBON FOOTPRINT
          </button>
        </div>
        <h3>{trees}</h3>
      </div>
      </div>     
    </div>
  );
}

export default App;
