import React from "react";
import format from "../helpers/formatListWeater";
import WeatherInfo from "./WeatherInfo";

const WeatherInfoNext = (props) => {
  const dataFormat = format(props);
  const components = dataFormat ? dataFormat : [];
  return (
    <>
      {components.map((item, index) => (
        <WeatherInfo {...item} key={index} />
      ))}
    </>
  );
};

export default WeatherInfoNext;
