import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import PokemonFetch from "./components/PokemonFetch";

function App() {
  const [sortBy, setSortBy] = useState("");
  const [quantity, setQuantity] = useState(25);
  const [sortStatus, setSortStatus] = useState({
    id: false,
    hp: false,
    attacco: false,
    difesa: false,
  });
  const sortOptionChange = (e) => {
    if (e.target.value == "Id") {
      setSortStatus([...sortStatus, { id: !sortStatus.id }]);
      console.log("entrato");
    }
  };
  return (
    <div className="App">
      <div class="headerInfo">
        <div id="options">
          <div id="logo">
            <img
              src="https://1000logos.net/wp-content/uploads/2017/05/Pokemon-Logo.png"
              height="150"
              width="250"
            />
          </div>
          <div>
            <input type="search" placeholder="Cerca un pokemon..."></input>
            <select>
              <option value="" disabled defaultValue>
                Ordina per
              </option>
              <option value="Id" onChange={(e) => sortOptionChange(e)}>
                ID {sortStatus.id ? "(desc)" : "(asc)"}
              </option>
              <option value="Hp">Punti vita (asc)</option>
              <option value="Attacco">Attacco (asc)</option>
              <option value="Difesa">Difesa (asc)</option>
            </select>
            <select onChange={(e) => setQuantity(e.target.value)}>
              <option value="50" disabled default>
                Seleziona
              </option>
              <option value="5">5</option>
              <option value="15">15</option>
              <option value="25" selected defaultValue>
                25
              </option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="100000">Tutti</option>
            </select>
          </div>
        </div>
      </div>
      <PokemonFetch sortBy={sortBy} quantity={quantity} />
    </div>
  );
}

export default App;
