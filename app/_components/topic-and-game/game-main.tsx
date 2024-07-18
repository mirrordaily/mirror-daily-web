import GameItem from './game-item'
import { fetchGames } from '@/app/actions'

export default async function GameMain() {
  const games = await fetchGames()

  const getTabletContent = () => {
    const horizontalDivider = <hr className="h-[2px] bg-[#000928]" />
    const elements: JSX.Element[] = []

    games.slice(0, 4).forEach((game, index) => {
      if ((index + 1 - 2) % 2 === 1) {
        elements.push(horizontalDivider, horizontalDivider)
      }

      elements.push(<GameItem {...game} key={game.name} />)
    })

    /**
     *   explanation for formula in gridRowEnd
     *
     *   # of games | # of elements | index | end # of vertical divider
     *   1, 2       | 1, 2          | 0     | 2
     *   3, 4       | 5, 6          | 1     | 4
     *   5, 6       | 9, 10         | 2     | 6
     *   2n+1, 2n+2 | 4n+1, 4n+2    | n     | (n+1)*2
     */

    elements.push(
      <hr
        className="col-start-2 col-end-2 row-start-1 h-auto w-px bg-[#000928]"
        style={{
          gridRowEnd: (Math.floor(elements.length / 4) + 1) * 2,
        }}
      />
    )

    return elements
  }

  return (
    <div className="flex w-full shrink-0 flex-col lg:max-w-[305px]">
      <p className="text-lg font-bold leading-normal text-[#119CC7]">
        遊戲專區
      </p>
      {games.length && (
        <>
          <div className="mt-[2px] grid grid-flow-row auto-rows-auto divide-y divide-[#000928] md:hidden lg:-mt-2 lg:grid lg:[&>*:last-of-type]:pb-0">
            {/* mobile, desktop */}
            {games.map((game) => (
              <GameItem {...game} key={game.name} />
            ))}
          </div>
          <div className="mt-[23px] hidden grid-flow-row-dense grid-cols-[minmax(0,_1fr)_2px_minmax(0,_1fr)] gap-x-8 gap-y-5 *:py-0 md:grid lg:hidden">
            {/* tablet */}
            {getTabletContent()}
          </div>
        </>
      )}
    </div>
  )
}
