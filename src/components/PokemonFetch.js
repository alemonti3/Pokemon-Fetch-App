import React, { useState, useEffect } from "react";
import axios from "axios";

function PokemonFetch(props) {
  const [pokemon, setPokemon] = useState([]);
  const { sortBy, quantity } = props;

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${quantity}&offset=0`)
      .then((res) => {
        getPokemon(res.data.results);
      });
  }, [quantity]);

  function getPokemon(results) {
    setPokemon([]);
    results.forEach((element) => {
      axios.get(element.url).then((res) => {
        setPokemon((prev) => [...prev, res.data]);
      });
    });
  }

  console.log(pokemon);
  return (
    <>
      <div id="container">
        {[...pokemon]
          .sort((a, b) => a.id - b.id)
          .map((curr, index) => {
            return (
              <div key={index} className="pokemon">
                <div>
                  <span className="pokemonId">
                    {" (#"}
                    {curr.id}
                    {")"}
                  </span>
                </div>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${curr.id}.png`}
                  alt={`${
                    curr.name.charAt(0).toUpperCase() + curr.name.slice(1)
                  }`}
                  title={`${
                    curr.name.charAt(0).toUpperCase() + curr.name.slice(1)
                  }`}
                  width="120"
                  height="120"
                ></img>
                <div className="pokemonInfo">
                  <div style={{ fontSize: "18px" }}>
                    {curr.name.charAt(0).toUpperCase() + curr.name.slice(1)}
                  </div>
                  <div
                    style={{
                      color:
                        curr.stats[0].base_stat >= 50 ? "green" : "#d50000",
                    }}
                  >
                    Punti vita: {curr.stats[0].base_stat}
                  </div>
                  <div
                    style={{
                      color:
                        curr.stats[1].base_stat >= 80 ? "green" : "#d50000",
                    }}
                  >
                    Attacco: {curr.stats[1].base_stat}
                  </div>
                  <div
                    style={{
                      color:
                        curr.stats[2].base_stat >= 80 ? "green" : "#d50000",
                    }}
                  >
                    Difesa: {curr.stats[2].base_stat}
                  </div>
                  <div>Peso: {curr.weight}</div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default PokemonFetch;
