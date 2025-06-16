import { CPBL_SITE_URL } from '@/constants/config'
import dayjs, { type Dayjs } from 'dayjs'
import Image from 'next/image'
import { type GameNode } from './helper/game-node'
import { formatChineseDate } from './helper/utils/date-utils'

type GameInfoCardProps = {
  gameData: GameNode
  selectedDate: Dayjs
}

const TriganleTag = () => (
  <div className="absolute -right-5 top-[6px] w-2 border-y-8 border-r-[12px] border-y-transparent border-r-mirror-red"></div>
)
const GlowingDot = () => (
  <div className="size-2 animate-glowing-red rounded-full bg-red-500" />
)

export default function GameInfoCard({
  gameData,
  selectedDate,
}: GameInfoCardProps) {
  const {
    homeTeamLogo,
    visitingTeamLogo,
    homeTeamScore,
    visitingTeamScore,
    homeTeamName,
    visitingTeamName,
    league,
    startTime,
    endTime,
    currentPlay,
    status,
  } = gameData
  const getDisplayScore = (teamType: 'home' | 'visiting'): number | string => {
    if (status === 'ONGOING' && currentPlay) {
      if (teamType === 'home') {
        return currentPlay.home_score
      }
      if (teamType === 'visiting') {
        return currentPlay.visiting_score
      }
    }
    if (status === 'FINISHED') {
      return teamType === 'home' ? homeTeamScore : visitingTeamScore
    }
    return '-'
  }
  const formatGameTime = (time: Dayjs) => {
    const isSameDay = selectedDate.isSame(time, 'day')
    const weekday = formatChineseDate(time)
    const hour = time.hour()
    const period = hour < 12 ? '上午' : '下午'
    const formattedLocalTime = time.format('HH:mm')
    if (!isSameDay) return `${weekday}${period}${formattedLocalTime}`
    return `${period}${formattedLocalTime}`
  }
  const gameStatus = () => {
    if (status === 'POSTPONED') return '延賽'
    if (endTime) return '終場'
    // TODO: 籃球棒球要分開考慮
    if (dayjs(startTime) < dayjs(Date.now())) {
      switch (league) {
        case 'cpbl':
          return currentPlay?.inning ? `${currentPlay.inning}局` : '比賽中'
        case 'tpbl':
          return currentPlay?.inning ? `第${currentPlay.inning}節` : '比賽中'
        default:
          break
      }
    }
    return formatGameTime(dayjs(startTime))
  }

  return (
    <div className="flex flex-col rounded-2xs border-[0.5px] border-primary-300 bg-white px-5 py-3 text-primary-500">
      <section className="mb-3 flex justify-between">
        {/* TODO: 找出如何實作第幾節、時間更新模式 */}
        <p
          className={`flex items-center gap-2 text-xs leading-[18px] ${currentPlay ? 'text-mirror-blue-700' : 'text-primary-500'}`}
        >
          <span>{currentPlay && <GlowingDot />}</span>
          {gameStatus()}
        </p>
        <p>{league.toUpperCase()}</p>
      </section>
      <ul className="flex flex-col gap-2">
        <li className="flex gap-3">
          <div className="relative size-10">
            <Image
              src={`${CPBL_SITE_URL}/${homeTeamLogo}`}
              fill
              alt="home team logo"
            />
          </div>
          <div className="relative flex grow justify-between">
            <div>
              <p className="font-bold text-primary-800">{homeTeamName}</p>
              <span>主隊</span>
            </div>
            <p className="text-xl font-bold">{getDisplayScore('home')}</p>
            {homeTeamScore > visitingTeamScore ? <TriganleTag /> : <></>}
          </div>
        </li>
        <li className="flex gap-3">
          <div className="relative size-10">
            <Image
              src={`${CPBL_SITE_URL}/${visitingTeamLogo}`}
              fill
              alt="visiting team logo"
            />
          </div>
          <div className="relative flex grow justify-between">
            <div>
              <p className="font-bold text-primary-800">{visitingTeamName}</p>
              <span>客隊</span>
            </div>
            <p className="text-xl font-bold">{getDisplayScore('visiting')}</p>
            {visitingTeamScore > homeTeamScore ? <TriganleTag /> : <></>}
          </div>
        </li>
      </ul>
    </div>
  )
}
