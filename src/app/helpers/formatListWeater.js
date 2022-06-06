const weatherInfoFormat = (weaterItem) => {
  const datos =
    weaterItem.city &&
    weaterItem.list.map((item) => {
      return {
        temperature: item.main.temp,
        city: weaterItem.city ? weaterItem.city.name : null,
        humidity: item.main.humidity,
        wind_speed: item.wind.speed,
        country: weaterItem.city ? weaterItem.city.country : null,
        description: null,
      };
    });
  return datos;
};

const format = (list) => weatherInfoFormat(list);

export default format;
