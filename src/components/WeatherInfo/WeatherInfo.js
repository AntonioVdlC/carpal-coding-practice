import React from "react";

import "./WeatherInfo.css";

const WeatherInfo = ({ data }) =>
  data ? (
    <div className="weather">
      <p>{data.name}</p>
      <p>{data.main.temp}</p>
      <p>{data.weather[0].main}</p>
      <p>
        <img
          src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
        />
      </p>
      <p>{new Date(Date.now()).toString()}</p>
    </div>
  ) : null;

export default WeatherInfo;
