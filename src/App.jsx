import React, { useState } from "react";
import search from "./assets/icons/search.svg";
import { useStateContext } from "./Context/context";
import { Background_Layout, WeatherCard, MiniCard } from "./components";

const App = () => {
  const [input, setInput] = useState("");
  const { weather, thisLocation, values, place, setPlace } = useStateContext();

  const submitCity = () => {
    setPlace(input)
    setInput('')
  }

  return (
    <div className="w-full h-screen text-black px-0">
      <nav className="w-full p-3 flex justify-between items-center">
        <h1 className="font-bold tracking-wide text-3xl">WeatherSense</h1>
        <div className="bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
          <img src={search} alt="search" className="w-[1.5rem] h-[1.5rem]" />
          <input
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                // submit the form
                submitCity()
              }
            }}
            type="text" placeholder='Search city'
            className="focus:outline-none w-full text-[#212121] text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </nav>
      <Background_Layout />
      <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center">
        <WeatherCard
          place={thisLocation}
          windspeed={weather?.wind?.speed || 0}
          humidity={weather?.main?.humidity || 0}
          temperature={weather?.main?.temp || 0}
          heatIndex={weather?.main?.feels_like || 0}
          iconString={weather?.weather?.[0]?.description || "Unknown"} // ✅ Safe access
          conditions={weather?.weather?.[0]?.main || "Unknown"} // ✅ Safe access
        />

        <div className="flex justify-center flex-wrap gap-8 w-[60%]">
          {values
            ?.filter((curr, index, self) => {
              // Get the date portion of the timestamp (ignoring time)
              const date = new Date(curr.dt * 1000).toDateString();
              // Return only the first entry for each date
              return self.findIndex((item) => new Date(item.dt * 1000).toDateString() === date) === index;
            })
            .slice(1, 7)
            .map((curr) => {
              return (
                <MiniCard
                  key={curr.dt}
                  time={curr.dt * 1000}
                  temp={curr.main.temp}
                  iconString={curr.weather[0].description}
                />
              );
            })}
        </div>
      </main>
    </div>
  );
};
export default App;
