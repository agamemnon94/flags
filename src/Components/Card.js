import React from 'react';

// ↓ La props country a été destructurée. Elle correspond à props.country qui vient de Countries ↓.
const Cards = ({ country }) => {
  // console.log(country);
  return (
    <li className='card'>
      <img src={country.flags.svg} alt={"Drapeau du pays" + country.translations.fra.common} />
      <div className="infos">
        <h2>{country.translations.fra.common}</h2>
        <h4>{country.capital}</h4>
        <p>Pop. : {country.population.toLocaleString()} hab.</p>
      </div>
    </li>
  );
};

export default Cards;