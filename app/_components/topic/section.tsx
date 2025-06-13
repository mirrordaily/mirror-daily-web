import SportsMain from '../sports/main'
import TopicMain from './topic-main'
import WeatherMain from './weather-main'
import {
  fetchSportsEvents,
  fetchTopics,
  fetchWeather,
  fetchLatestSportsNews,
} from '@/app/actions'

export default async function TopicSection() {
  const topicData = await fetchTopics()
  const weatherData = await fetchWeather()
  const result = await fetchSportsEvents()
  const latestSportsNewsData = await fetchLatestSportsNews()

  return (
    <section className="section-in-homepage mb-9 mt-6 flex flex-col gap-y-6 md:my-9 md:gap-y-9 lg:my-10 lg:h-[768px] lg:gap-y-[50px]">
      <div className="flex max-w-full flex-col justify-between gap-y-6 lg:h-full lg:flex-row lg:gap-5">
        <div className="flex flex-col lg:order-3 lg:gap-5">
          {weatherData && <WeatherMain data={weatherData} />}
          <span className="hidden bg-[#F6F6FB] lg:flex lg:grow lg:overflow-y-scroll lg:p-4">
            <SportsMain
              scheduleData={result}
              latestSportsNewsData={latestSportsNewsData}
            />
          </span>
        </div>
        <div className="hidden lg:order-2 lg:block lg:h-full lg:w-px lg:border lg:border-r-black-primary-800"></div>
        {topicData && <TopicMain data={topicData} />}
      </div>
    </section>
  )
}
