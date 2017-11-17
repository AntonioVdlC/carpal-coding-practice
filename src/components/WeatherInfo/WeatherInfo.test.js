import React from "react";
import ReactDOM from "react-dom";
import WeatherInfo from "./WeatherInfo";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<WeatherInfo />, div);
});
