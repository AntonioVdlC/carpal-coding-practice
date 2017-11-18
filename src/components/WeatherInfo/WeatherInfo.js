import React from "react";

import { ktoc } from "../../utils/convert-temperature";

import "./WeatherInfo.css";

const WeatherInfo = ({ data }) =>
  data ? (
    <div className="weather">
      <p className="weather-city">{data.name}</p>
      <p className="weather-temperature">{ktoc(data.main.temp)} °C</p>
      <p className="weather-main">{data.weather[0].main}</p>
      <img
        className="weather-icon"
        src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
        alt={data.weather[0].main}
      />
    </div>
  ) : null;

export default WeatherInfo;
