import React from 'react';

const WeatherCard = ({ weather }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-gray-800">
      <h2 className="text-2xl font-bold mb-2">{weather.name}, {weather.sys.country}</h2>
      <p className="text-xl">{weather.weather[0].description}</p>
      <p className="text-5xl font-bold">{weather.main.temp}°C</p>
      <div className="flex justify-between mt-4">
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherCard;
