'use client'
import NextImage from 'next/image'
import arrowUp from '@/public/icons/weather/arrow-up.svg'
import arrowDown from '@/public/icons/weather/arrow-down.svg'
import { useState } from 'react'
import IconSunny from '@/public/icons/weather/sunny.svg'
import IconCloudy from '@/public/icons/weather/cloudy.svg'
import IconOvercast from '@/public/icons/weather/overcast.svg'
import IconShower from '@/public/icons/weather/shower.svg'
import IconThunderStorm from '@/public/icons/weather/thunderstorm.svg'
import IconRain from '@/public/icons/weather/rain.svg'
import IconSnow from '@/public/icons/weather/snow.svg'
import IconWeatherUnknown from '@/public/icons/weather/unknown.svg'
import type { CityAndWeather } from '@/types/homepage'

const weatherToImage = {
  晴: IconSunny,
  多雲: IconCloudy,
  陰: IconOvercast,
  陣雨: IconShower,
  雷陣雨: IconThunderStorm,
  雨: IconRain,
  雪: IconSnow,
  未知: IconWeatherUnknown,
} as const

type Props = {
  data: CityAndWeather
}
export default function WeatherMain({ data }: Props) {
  const cities = Object.keys(data)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState(
    cities.includes('臺北市') ? '臺北市' : cities?.[0] || ''
  )

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleCitySelect = (city: string) => {
    setSelectedCity(city)
    setIsDropdownOpen(false)
  }

  const info = data[selectedCity]
  if (!info) return null

  return (
    <div className="flex w-full justify-center">
      <div className="flex h-[50px] w-full items-center bg-[#f6f6fb] px-2 leading-none shadow-[0_2px_2px_0_rgba(0,0,0,0.1)] md:max-w-[680px] md:pl-5 md:pr-6 lg:px-4">
        <p className="mr-5 flex text-base font-medium text-[#7f8493] md:grow">
          今日天氣
        </p>
        <div className="relative">
          <button
            className={`group mr-4 flex grow gap-x-4 text-base font-bold hover-or-active:text-[#674ab1] md:gap-x-3 lg:ml-[37px] ${
              isDropdownOpen ? 'text-[#674ab1]' : 'text-[#2b2b2b]'
            }`}
            onClick={toggleDropdown}
          >
            <p>{selectedCity}</p>
            <NextImage
              src={arrowUp}
              width={16}
              height={16}
              className={`block ${isDropdownOpen ? 'hidden' : ''} group-hover:hidden`}
              alt="箭頭"
            />
            <NextImage
              src={arrowDown}
              width={16}
              height={16}
              alt="箭頭"
              className={`block ${isDropdownOpen ? '' : 'hidden'} group-hover:block`}
            />
          </button>
          {isDropdownOpen && (
            <ul className="absolute left-0 top-full z-city-selection-box h-[91px] w-[100px] cursor-pointer overflow-y-auto bg-[#f6f6fb] px-[26px] pt-[11px] md:h-[196px] lg:left-6">
              {cities.map((city) => (
                <li
                  className="whitespace-nowrap pb-4 text-base font-medium hover-or-active:text-[#674ab1]"
                  key={city}
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
        <NextImage
          src={
            weatherToImage[info.weather as keyof typeof weatherToImage] ||
            IconWeatherUnknown
          }
          width={18}
          height={18}
          alt="天氣圖示"
          className="mr-4 h-[18px] lg:mr-5"
        />
        <p className="mr-4 h-9 w-[39px] text-2xl font-bold text-[#2b2b2b] lg:mr-5">
          {info.maxTemp}º
        </p>
        <p className="h-6 text-base font-bold text-[#7f8493]">
          {info.minTemp}º
        </p>
      </div>
    </div>
  )
}
