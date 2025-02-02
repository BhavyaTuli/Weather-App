import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({
    wind_speed: 0,
    humidity: 0,
    temp: 0,
    feels_like: 0,
    weather: [{ description: "Unknown", main: "Unknown" }], // ✅ Default values
  });
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("Delhi");
  const [thisLocation, setLocation] = useState("");

  // fetch API
  const fetchWeather = async () => {
    const options = {
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/forecast", // OpenWeatherMap 5-day forecast URL
      params: {
        q: place, // Location from state
        appid: import.meta.env.VITE_API_KEY, // Your OpenWeatherMap API Key
        units: "metric", // Use metric units (Celsius)
      },
    };

    try {
      const response = await axios.request(options);
      console.log("API Response:", response.data);

      const cityName = response.data.city.name; // City name
      const countryCode = response.data.city.country; // Country code
      // Format location as "City, Country"
      const location = `${cityName}, ${countryCode}`;
      // Extracting necessary information
      setLocation(location); // Set location as the city name
      setValues(response.data.list); // Set forecast data (array of weather values)
      setWeather(response.data.list[0]); // Set current weather (first entry in forecast)
    } catch (e) {
      console.error(e);
      alert("This place does not exist");
    }
  };

  useEffect(() => {
    fetchWeather(); // Fetch weather whenever `place` changes
  }, [place]);

  useEffect(() => {
    console.log(values); // Log the forecast values for debugging
  }, [values]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        thisLocation,
        place,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
