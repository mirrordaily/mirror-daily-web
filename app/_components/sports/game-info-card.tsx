import { CPBL_SITE_URL } from '@/constants/config'
import type { SportsGameData } from '@/types/homepage'
import Image from 'next/image'

type GameInfoCardProps = {
  gameData: SportsGameData
}

const TriganleTag = () => (
  <div className="absolute -right-5 top-[6px] w-2 border-y-8 border-r-[12px] border-y-transparent border-r-mirror-red"></div>
)

export default function GameInfoCard({ gameData }: GameInfoCardProps) {
  const {
    homeTeamLogo,
    visitingTeamLogo,
    homeTeamScore,
    visitingTeamScore,
    homeTeamName,
    visitingTeamName,
    league,
  } = gameData
  console.log({ gameData })
  return (
    <div className="flex flex-col rounded-2xs border-[0.5px] border-black-primary-300 bg-white px-5 py-3 text-black-primary-500">
      <section className="mb-3 flex justify-between">
        {/* TODO: 找出如何實作第幾節、時間更新模式 */}
        <p>終場</p>
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
              <p>{homeTeamName}</p>
              <span>主隊</span>
            </div>
            <p className="text-xl font-bold">{homeTeamScore}</p>
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
              <p>{visitingTeamName}</p>
              <span>客隊</span>
            </div>
            <p className="text-xl font-bold">{visitingTeamScore}</p>
            {visitingTeamScore > homeTeamScore ? <TriganleTag /> : <></>}
          </div>
        </li>
      </ul>
    </div>
  )
}
