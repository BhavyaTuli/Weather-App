import React, { useEffect, useState } from 'react'
import { useStateContext } from '../Context/context'
import Clear from '../assets/images/Clear.jpg'
import Fog from '../assets/images/foggy.png'
import Cloudy from '../assets/images/Cloudy.jpg'
import Rainy from '../assets/images/Rainy.jpg'
import Snow from '../assets/images/snow.jpg'
import Stormy from '../assets/images/Stormy.jpg'
import Sunny from '../assets/images/Sunny.jpg'

// Forming image in the background according to the weather 
const Background_Layout = () => {

  const {weather} = useStateContext()
  const [image, setImage] = useState(Clear)

  useEffect(()=>{

    if(weather?.weather?.[0]?.main){
      let condition = weather.weather[0].main.toLowerCase(); // Get main weather condition

      if(condition.includes('cloud')){
        setImage(Cloudy);
      } else if(condition.includes('snow')){
        setImage(Snow);
      } else if(condition.includes('rain') || condition.includes('shower') ){
        setImage(Rainy);
      } else if(condition.includes('thunder') || condition.includes('storm')){
        setImage(Stormy);
      } else if(condition.includes('fog') || condition.includes("mist") || condition.includes("haze")){
        setImage(Fog);
      } else if(condition.includes('clear')){
        setImage(Sunny);
      } else{
        setImage(Clear); //default
      }
    } 
  },[ weather])

  return (
    <img src={image} alt="weather-image" className='h-screen w-full fixed left-0 top-0 -z-[10]' />
  )
}

export default Background_Layout
