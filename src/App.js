import React, { Component } from "react";

import Header from "./components/Header";
import Input from "./components/Input";
import Loading from "./components/Loading";

import "./App.css";

class App extends Component {
  state = {
    loading: true,
    error: false,
    input: {
      value: ""
    }
  };

  handleInputChange = value => {
    this.setState(prev => ({
      ...prev,
      input: { ...prev.input, value }
    }));
  };

  handleInputKeyDown = e => {
    if (e.keyCode === 13) {
      this.getWeatherInfo();
    }
  };

  getWeatherInfo = async () => {
    const { store } = this.props;
    const { input: { value } } = this.state;

    try {
      let data = await store.get("weather", { q: value });
      this.setState(prev => ({ ...prev, data, error: false }));
    } catch (err) {
      this.setState(prev => ({ ...prev, error: true }));
    }

    this.setState(prev => ({ ...prev, loading: false }));
  };

  componentDidMount() {
    this.setState(prev => ({ ...prev, loading: false }));
  }

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        {this.state.loading ? (
          <Loading />
        ) : (
          <div>
            {this.state.error ? (
              <p className="error">
                Oops, seems like something went wrong ... Please try again!
              </p>
            ) : null}
            <p>App</p>
            <Input
              label="Please type a city"
              placeholder="Ex: Singapore"
              value={this.state.input.value}
              onInputChange={this.handleInputChange}
              onInputKeyDowm={this.handleInputKeyDown}
            />
            {data ? (
              <div>
                <p>{data.name}</p>
                <p>{data.main.temp}</p>
                <p>{data.weather[0].main}</p>
                <p>
                  <img
                    src={`http://openweathermap.org/img/w/${
                      data.weather[0].icon
                    }.png`}
                  />
                </p>
                <p>{new Date(Date.now()).toString()}</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default App;
