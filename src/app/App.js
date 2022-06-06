import React, { Component } from "react";

import WeatherForm from "./components/WeatherForm";
import WeatherInfo from "./components/WeatherInfo";
import WeatherInfoNext from "./components/WeatherInfoNext";

import { WEATHER_KEY } from "./keys";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: "",
      description: "",
      humidity: "",
      wind_speed: 0,
      city: "",
      country: "",
      error: null,
      location: {
        lon: null,
        lat: null,
      },
      next_weather: {
        city: null,
        list: [],
        type: "",
      },
    };
  }

  getCurrentWeather = async (e) => {
    try {
      const { lon, lat } = await this.getLocation();
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      return {
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        city: data.name,
        country: data.sys.country,
        error: null,
      };
    } catch (error) {
      console.log(error);
    }
  };

  getProxWeather = async (e) => {
    try {
      const { lon, lat } = await this.getLocation();
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=4&appid=${WEATHER_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      return { city: data.city, list: data.list, type: "prox" };
    } catch (error) {
      console.log(error);
    }
  };

  getLocation() {
    return new Promise((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        return reject("Geolocation is not available");
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          return resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            coords: position.coords,
          });
        },
        (error) => {
          return reject(`Geolocation is not available ${error.message}`);
        }
      );
    });
  }

  async componentDidMount() {
    const current = await this.getCurrentWeather();
    const prox = await this.getProxWeather();
    this.setState({
      ...current,
      next_weather: prox,
    });
  }

  getWeather(e) {
    e.preventDefault();
    const { city } = e.target.elements;
    const cityValue = city.value;
    console.log(cityValue);
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}`
    const response = await fetch(url);
    const data = await response.json();
  }

  render() {
    return (
      <div className="container p-4">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <WeatherForm getWeather={this.getWeather} />
            <h2 className="col-md-12 card card-body mt-2 animated fadeInUp">
              Ubicacion Actual
            </h2>
            <WeatherInfo {...this.state} />
          </div>
        </div>
        <h2 className="col-md-12 card card-body mt-2 animated fadeInUp">
          Proximos dias
        </h2>
        <div className="row">
          <WeatherInfoNext {...this.state.next_weather} />;
        </div>
      </div>
    );
  }
}

export default App;
