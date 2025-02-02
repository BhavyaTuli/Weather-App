import React, { useEffect, useState } from "react";
import { useDate } from "../Utilities/useDate";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import fog from "../assets/icons/fog.png";
import windy from "../assets/icons/windy.png";
import storm from "../assets/icons/storm.png";
import "../index.css";

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
}) => {
  const [icon, setIcon] = useState();
  const time = useDate();

  useEffect(() => {
    if (iconString) {
      const lowerCaseIcon = iconString.toLowerCase();

      if (lowerCaseIcon.includes("cloud")) {
        setIcon(cloud);
      } else if (
        lowerCaseIcon.includes("rain") ||
        lowerCaseIcon.includes("drizzle")
      ) {
        setIcon(rain);
      } else if (lowerCaseIcon.includes("snow")) {
        setIcon(snow);
      } else if (
        lowerCaseIcon.includes("fog") ||
        lowerCaseIcon.includes("mist") ||
        lowerCaseIcon.includes("haze")
      ) {
        setIcon(fog);
      } else if (lowerCaseIcon.includes("wind")) {
        setIcon(windy);
      } else if (
        lowerCaseIcon.includes("storm") ||
        lowerCaseIcon.includes("thunder")
      ) {
        setIcon(storm);
      } else {
        setIcon(sun);
      }
    }
  }, [iconString]);

  return (
    <div className="w-[22rem] min-w-[22rem] h-[30rem] glassCard p-4">
      {/* Weather Icon and Temperature */}
      <div className="flex w-full justify-center items-center gap-4 mt-12 mb-4">
        <img src={icon} alt="weather-icon" className="w-16 h-16" />
        <p className="font-bold text-5xl flex justify-center items-center">
          {temperature} &deg;C
        </p>
      </div>

      {/* Location Name */}
      <div className="text-2xl text-center font-bold">{place}</div>

      {/* Date and Time */}
      <div className="w-full flex justify-between items-center mt-4">
        <p className="flex-1 text-center p-2">{new Date().toDateString()}</p>
        <p className="flex-1 text-center p-2">{time.time}</p>{" "}
        {/* Render `time.time` */}
      </div>

      {/* Wind Speed & Humidity */}
      <div className="w-full flex justify-between items-center mt-4 gap-4">
        <div className="flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg">
          Wind Speed
          <p className="font-normal">{windspeed} km/hr</p>{" "}
          {/* Replace nested <p> */}
        </div>
        <div className="flex-1 text-center p-2 font-bold rounded-lg bg-green-600">
          Humidity
          <p className="font-normal">{humidity}%</p> {/* Replace nested <p> */}
        </div>
      </div>

      {/* Heat Index */}
      <div className="w-full p-3 mt-4 flex justify-between items-center">
        <p className="font-semibold text-lg">Heat Index</p>
        <p className="text-lg">{heatIndex ? heatIndex : "N/A"}</p>
      </div>

      <hr className="bg-slate-600" />

      {/* Weather Conditions Text */}
      <div className="w-full p-4 flex justify-center items-center text-3xl font-semibold">
        {conditions}
      </div>
    </div>
  );
};

export default WeatherCard;
