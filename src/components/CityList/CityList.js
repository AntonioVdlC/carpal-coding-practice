import React from "react";

import "./CityList.css";

const CityList = ({ cities, onCityClick, selected }) =>
  cities && cities.length ? (
    <div className="cities">
      <ul className="cities-list">
        {cities.map(city => (
          <li
            key={city.id}
            className={`cities-list-element ${
              city.id === selected ? "selected" : ""
            }`}
            onClick={onCityClick(city.id)}
          >
            {city.name}
          </li>
        ))}
      </ul>
    </div>
  ) : null;

export default CityList;
