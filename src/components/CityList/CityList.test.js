import React from "react";
import ReactDOM from "react-dom";
import CityList from "./CityList";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CityList />, div);
});
