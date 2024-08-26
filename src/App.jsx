import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    // Check if dark mode preference is stored in localStorage
    const storedPreference = localStorage.getItem('darkMode');
    return storedPreference === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const fetchWeather = async () => {
    const API_KEY = '8fc051d426f8d2565158aea96e211b37';
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('City not found. Please try again.');
      setWeatherData(null);
    }
  };

  const handleSearch = () => {
    if (city) fetchWeather();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className='flex justify-between items-center bg-white p-1 dark:bg-zinc-900 shadow-xl  dark:text-white fixed w-full  mb-3'>
        <div className='text-xl font-bold pl-8'>ShortIt</div>
        <button
          onClick={toggleDarkMode}
          className="px-2 bg-gray-800 text-white rounded-md dark:bg-gray-200 dark:text-black"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-white text-center bg-[#d87ea5] dark:bg-[#2F1847] border-[#624763] border-4 border-solid p-10 rounded-3xl">
          <h1 className="text-4xl font-bold mb-6 text-[#2f2230] dark:text-white">Weather Forecast</h1>
          <div className="flex mb-4">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter city name"
              className="px-4 py-2 rounded-l-md outline-none focus:ring-2 focus:ring-[#D63AF9] text-black dark:text-white dark:bg-gray-800"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-[#C62E65] dark:bg-indigo-800 text-white rounded-r-md hover:bg-indigo-800 dark:hover:bg-indigo-600"
            >
              Search
            </button>
          </div>
          {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
          {weatherData && <WeatherCard weather={weatherData} />}
        </div>
      </div>
    </>
  );
};

export default App;
