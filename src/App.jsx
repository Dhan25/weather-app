import React, { useState, useEffect } from 'react';


import axios from 'axios';


import {
  IoSunny,
  IoRainy,
  IoThunderstorm,
  IoSearch
} from "react-icons/io5";
import { FaCloud, FaRegSnowflake } from "react-icons/fa";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind
} from 'react-icons/bs';


import { ImSpinner2 } from "react-icons/im";
import { RiCelsiusLine } from "react-icons/ri";

// API key
const APIkey = 'e72ca4ca15d1d56ae9930d9d089bb7fd';

function App() {

  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Bucharest');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputValue !== '') {
      setLocation(inputValue);
    }

    const input = document.querySelector('input');

    if (input.value === '') {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    input.value = '';
    e.preventDefault();
  };

  // Fetch data
  useEffect(() => {
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios.get(url).then((res) => {
      setTimeout(() => {
        setData(res.data);
        setLoading(false);
      }, 1500)
    }).catch(err => {
      setLoading(false);
      setErrorMsg(err);
    })
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('');
    }, 2000);

    return () => clearTimeout(timer);
  }, [errorMsg]);

  if (!data) {
    return (
      <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'>
        <div>
          <ImSpinner2 className='text-5xl animate-spin text-white' />
        </div>
      </div>
    )
  }

  let icon;


  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <FaCloud />;
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />;
      break;
    case 'Rain':
      icon = <IoRainy className='text-[#31cafb]'/>;
      break;
    case 'Clear':
      icon = <IoSunny className='text-[#ffde33]'/>;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className='text-[#31cafb]'/>;
      break;
    case 'Snow':
      icon = <FaRegSnowflake className='text-[#31cafb]'/>;
      break;
    case 'Thunderstorm':
      icon = <IoThunderstorm />;
      break;
  }

  // date object
  const date = new Date();

  return (
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0'>
      {errorMsg && <div className='w-52 h-12 max-w-[90vw] md:max-w-[450px] bg-[#ef0c0c] text-white absolute flex items-center justify-center z-10 opacity-85 lg:top-[50%] p-4 capitalize rounded-md'>{`${errorMsg.response.data.message}`}!</div>}
      <form className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-2`}>
        <div className='h-full relative flex items-center justify-between p-2'>
          <input onChange={(e) => handleInput(e)} className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full' type="text" placeholder='Search by city or country' />
          <button onClick={(e) => handleSubmit(e)} className='bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition'>
            <IoSearch className='text-2xl text-white' />
          </button>
        </div>
      </form>
      <div className='w-full max-w-[450px] bg-black/20 h-3/4 text-white backdrop-blur-[50px] rounded-[32px] py-12 px-6 z-0'>
        { loading ?
          (<div className='w-full h-full flex items-center justify-center'>
            <ImSpinner2 className='text-white text-6xl animate-spin' />
          </div>) :
          (
            <div>
              <div className='flex items-center justify-center gap-x-5'>
                <div className='text-[60px]'>{icon}</div>
                <div>
                  <div className='text-2xl font-semibold'>{data.name}, {data.sys.country}</div>
                  <div>
                    {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
                  </div>
                </div>
              </div>
              <div className='my-20'>
                <div className='flex justify-center items-center'>
                  <div className='text-[144px] leading-none font-light'>{parseInt(data.main.temp)}</div>
                  <div className='text-4xl'>
                    <RiCelsiusLine />
                  </div>
                </div>
                <div className='capitalize text-center'>{data.weather[0].description}</div>
              </div>
              <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
                <div className='flex justify-between'>
                  <div className='flex items-center gap-x-2'>
                    <div className='text-[20px]'>
                      <BsEye />
                    </div>
                    <div>
                      Visibility {' '}
                      <span className='ml-2'>{data.visibility / 1000} km</span>
                    </div>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <div className='text-[20px]'>
                      <BsThermometer />
                    </div>
                    <div className='flex '>
                      Feels like
                      <div className='flex ml-2'>{parseInt(data.main.feels_like)}
                        <RiCelsiusLine />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex justify-between'>
                  <div className='flex items-center gap-x-2'>
                    <div className='text-[20px]'>
                      <BsWater />
                    </div>
                    <div>
                      Humidity
                      <span className='ml-2'>{data.main.humidity} %</span>
                    </div>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <div className='text-[20px]'>
                      <BsWind />
                    </div>
                    <div>
                      Wind
                      <span className='ml-2'>{data.wind.speed}m/s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}


      </div>
    </div>
  )
}

export default App
