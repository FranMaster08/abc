import React from "react";

const WeatherForm = (props) => (
  <div className="card card-body">
    <form onSubmit={props.getWeather}>
      <div className="form-group">
        <select
          id="city"
          name="city"
          placeholder="Your City Name"
          className="form-control"
          autoFocus
        >
          <option value="BuenosAires">Buenos Aires Capital</option>
          <option value="Barranquilla">Barranquilla</option>
          <option value="Madrid">Madrid</option>
          <option value="Cordoba">Cordoba</option>
          <option value="RamosMejia">Ramos Mejia</option>
        </select>
      </div>
      <button className="btn btn-success btn-block">Get Weather</button>
    </form>
  </div>
);

export default WeatherForm;
