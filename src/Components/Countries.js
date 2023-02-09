import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Countries = () => {

  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(36);
  const [selectedRadio, setSelectedRadio] = useState("");
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

  // Le useEffect se joue lorsque le composant est "monté"
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => setData(res.data));
  }, []);

  return (
    <div className='countries' >

      <ul className="radio-container">
        <input type="range" min="1" max="250" defaultValue={rangeValue} onChange={(e) => setRangeValue(e.target.value)}
        />
        {radios.map((continent) => (
          <li>
            <input type="radio"
              id={continent}
              name="continentRadio"
              checked={continent === selectedRadio}
              onChange={(e) => setSelectedRadio(e.target.id)}
            />
            <label htmlFor={continent}>{continent}</label>
          </li>
        ))}
      </ul>
      {/* Si selectedRadio est true, alors on affiche le bouton */}
      {selectedRadio && <button onClick={() => setSelectedRadio("")} >Annuler la recherche</button>}
      <ul>
        {data
          // filter les pays en fonction de la valuer de l'input radio
          // Ensuite on trie par ordre décroissant de population
          // Puis on coupe le nbre de pays à afficher en fonction de la valeur de l'input range
          // Enfin on parcours le tableau avec map pour afficher les données.
          .filter((country) => country.continents[0].includes(selectedRadio))
          .sort((a, b) => b.population - a.population)
          .slice(0, rangeValue)
          .map((country, index) => (
            <Card key={index} country={country} />
          ))}
      </ul>
    </div>
  );
};

export default Countries;