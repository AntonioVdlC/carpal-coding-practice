import React, { Component } from "react";

import CityList from "./components/CityList";
import Header from "./components/Header";
import Input from "./components/Input";
import Loading from "./components/Loading";
import Main from "./components/Main";
import WeatherInfo from "./components/WeatherInfo";
import Whisper from "./components/Whisper";

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
      const { input: { value } } = this.state;

      if (!value) return;

      this.getWeatherInfo({
        city: value
      });
    }
  };

  handleInputButtonClick = e => {
    const { input: { value } } = this.state;

    if (!value) return;

    this.getWeatherInfo({ city: value });
  };

  getWeatherInfo = async ({ city, id }) => {
    const { store } = this.props;

    try {
      let data = await store.get(
        "weather",
        city ? { q: city } : id ? { id } : {}
      );
      let cities = await store.put("cities", { name: data.name, id: data.id });

      this.setState(prev => ({
        ...prev,
        data,
        cities,
        selected: id || data.id,
        error: false
      }));
    } catch (err) {
      this.setState(prev => ({ ...prev, error: true }));
    } finally {
      this.setState(prev => ({ ...prev, loading: false }));
    }
  };

  async componentDidMount() {
    const { store } = this.props;

    try {
      let cities = await store.get("cities");

      this.setState(prev => ({ ...prev, cities, error: false }));
    } catch (err) {
      this.setState(prev => ({ ...prev, error: true }));
    } finally {
      this.setState(prev => ({ ...prev, loading: false }));
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.loading ? (
          <Loading />
        ) : (
          <div>
            <Header title="Yet Another React Weather App" />
            <Whisper
              display={this.state.error}
              type="error"
              text="Oops, seems like something went wrong ... Please try again!"
            />
            <Main>
              <CityList
                cities={this.state.cities}
                selected={this.state.selected}
                onCityClick={id => () => this.getWeatherInfo({ id })}
              />
              <Input
                label="Please type a city"
                placeholder="Ex: Singapore"
                value={this.state.input.value}
                onInputChange={this.handleInputChange}
                onInputKeyDowm={this.handleInputKeyDown}
                onButtonClick={this.handleInputButtonClick}
              />
              <WeatherInfo data={this.state.data} />
            </Main>
          </div>
        )}
      </div>
    );
  }
}

export default App;
