import './App.css';
import character from './images/crayon-man-with-sword.png'

function App() {
  return (
    <div className="App">
    <div className="Character">Your Carbon Warrior
    <img src={character} alt="character"/></div>
    <div className="Stats">
      <input/>
      <div className="transport-type">
                <label className="transport"> Transport-Type: </label>
                <select
                 
                >
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
      <button>Get Your Carbon Footprint</button>
    </div>
    </div>
  );
}

export default App;
