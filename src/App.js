import React, { Component } from "react";

import Header from "./components/Header";
import Loading from "./components/Loading";

import "./App.css";

class App extends Component {
  state = {
    loading: true,
    error: false
  };

  async componentDidMount() {
    const { store, APPID } = this.props;

    try {
      let data = await store.get("weather", { q: "Singapore", APPID });
      this.setState(prev => ({ ...prev, data, error: false }));
    } catch (err) {
      this.setState(prev => ({ ...prev, error: true }));
    }

    this.setState(prev => ({ ...prev, loading: false }));
  }

  render() {
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
          </div>
        )}
      </div>
    );
  }
}

export default App;
