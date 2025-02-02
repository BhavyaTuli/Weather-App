import React, { useEffect, useState } from "react";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import fog from "../assets/icons/fog.png";
import windy from "../assets/icons/windy.png";
import storm from "../assets/icons/storm.png";

const MiniCard = ({time, temp, iconString}) => {

  console.log("MiniCard Props:", { time, temp, iconString });
  const [icon, setIcon] = useState(sun);

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
    <div className='glassCard w-[10rem] h-[10rem] p-4 flex flex-col'>
      <p className='text-center'>
        { new Date(time).toLocaleDateString('en', {weekday: 'long'}).split(" ")[0]}
      </p>
      <hr/>
      <div className='w-full flex justify-center items-center flex-1'>
        <img src={icon} alt="weather"  className="w-[4rem] h-[4rem]"/>
      </div>
      <p className="text-center font-bold">{temp}&deg;C</p>

    </div>
  )
    
};

export default MiniCard;
