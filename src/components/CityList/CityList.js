import React from "react";

import "./CityList.css";

const CityList = ({ cities, onCityClick }) =>
  cities && cities.length ? (
    <div className="cities">
      <ul className="cities-list">
        {cities.map(city => (
          <li
            key={city.id}
            className="cities-list-element"
            onClick={onCityClick(city.id)}
          >
            {city.name}
          </li>
        ))}
      </ul>
    </div>
  ) : null;

export default CityList;
