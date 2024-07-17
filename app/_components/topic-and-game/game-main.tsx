import type { Game } from '@/types/homepage'
import GameItem from './game-item'

export default function GameMain() {
  const games: Game[] = [
    {
      name: '絕區零',
      description: '【街訪突擊特企】捕獲！母親節前夕賣場的「挑禮忙人」',
      link: 'https://play.google.com/store/apps/details?id=com.HoYoverse.Nap',
      heroImage: {
        resized: {
          w1200: '',
          w1600:
            'https://statics-dev.mirrordaily.news/images/473329f8-9e89-4a57-a608-6d357246caa6-w1600.webp',
          w2400:
            'https://statics-dev.mirrordaily.news/images/473329f8-9e89-4a57-a608-6d357246caa6-w2400.webp',
          w480: 'https://statics-dev.mirrordaily.news/images/473329f8-9e89-4a57-a608-6d357246caa6-w480.webp',
          w800: 'https://statics-dev.mirrordaily.news/images/473329f8-9e89-4a57-a608-6d357246caa6-w800.webp',
          original:
            'https://statics-dev.mirrordaily.news/images/473329f8-9e89-4a57-a608-6d357246caa6.webp',
        },
        resizedWebp: {
          original:
            'https://statics-dev.mirrordaily.news/images/473329f8-9e89-4a57-a608-6d357246caa6.webP',
          w1200: '',
          w1600:
            'https://statics-dev.mirrordaily.news/images/473329f8-9e89-4a57-a608-6d357246caa6-w1600.webP',
          w2400:
            'https://statics-dev.mirrordaily.news/images/473329f8-9e89-4a57-a608-6d357246caa6-w2400.webP',
          w480: 'https://statics-dev.mirrordaily.news/images/473329f8-9e89-4a57-a608-6d357246caa6-w480.webP',
          w800: 'https://statics-dev.mirrordaily.news/images/473329f8-9e89-4a57-a608-6d357246caa6-w800.webP',
        },
      },
    },
    {
      name: '勇闖王國-自由冒險RPG',
      description:
        '【街訪突擊特企】捕獲！母親節前夕賣場的「挑禮忙人」 【街訪突擊特企】捕獲！母親節前夕賣場的「挑禮忙人」',
      link: 'https://play.google.com/store/apps/details?id=com.forevernine.th.android',
      heroImage: {
        resized: {
          w1200: '',
          w1600:
            'https://statics-dev.mirrordaily.news/images/63a4d2c8-4131-4292-9e55-57159219df8d-w1600.jpg',
          w2400:
            'https://statics-dev.mirrordaily.news/images/63a4d2c8-4131-4292-9e55-57159219df8d-w2400.jpg',
          w480: 'https://statics-dev.mirrordaily.news/images/63a4d2c8-4131-4292-9e55-57159219df8d-w480.jpg',
          w800: 'https://statics-dev.mirrordaily.news/images/63a4d2c8-4131-4292-9e55-57159219df8d-w800.jpg',
          original:
            'https://statics-dev.mirrordaily.news/images/63a4d2c8-4131-4292-9e55-57159219df8d.jpg',
        },
        resizedWebp: {
          original:
            'https://statics-dev.mirrordaily.news/images/63a4d2c8-4131-4292-9e55-57159219df8d.webP',
          w1200: '',
          w1600:
            'https://statics-dev.mirrordaily.news/images/63a4d2c8-4131-4292-9e55-57159219df8d-w1600.webP',
          w2400:
            'https://statics-dev.mirrordaily.news/images/63a4d2c8-4131-4292-9e55-57159219df8d-w2400.webP',
          w480: 'https://statics-dev.mirrordaily.news/images/63a4d2c8-4131-4292-9e55-57159219df8d-w480.webP',
          w800: 'https://statics-dev.mirrordaily.news/images/63a4d2c8-4131-4292-9e55-57159219df8d-w800.webP',
        },
      },
    },
    {
      name: '薑餅人之塔',
      description:
        '【街訪突擊特企】捕獲！母親節前夕賣場的「挑禮忙人」【街訪突擊特企】捕獲！母親節前夕賣場的「挑禮忙人」【街訪突擊特企】捕獲！母親節前夕賣場的「挑禮忙人」 ',
      link: 'https://play.google.com/store/apps/details?id=com.devsisters.cba',
      heroImage: {
        resized: {
          w1200: '',
          w1600:
            'https://statics-dev.mirrordaily.news/images/58e68bdd-9928-44ae-b988-6d46c3f552df-w1600.jpg',
          w2400:
            'https://statics-dev.mirrordaily.news/images/58e68bdd-9928-44ae-b988-6d46c3f552df-w2400.jpg',
          w480: 'https://statics-dev.mirrordaily.news/images/58e68bdd-9928-44ae-b988-6d46c3f552df-w480.jpg',
          w800: 'https://statics-dev.mirrordaily.news/images/58e68bdd-9928-44ae-b988-6d46c3f552df-w800.jpg',
          original:
            'https://statics-dev.mirrordaily.news/images/58e68bdd-9928-44ae-b988-6d46c3f552df.jpg',
        },
        resizedWebp: {
          original:
            'https://statics-dev.mirrordaily.news/images/58e68bdd-9928-44ae-b988-6d46c3f552df.webP',
          w1200: '',
          w1600:
            'https://statics-dev.mirrordaily.news/images/58e68bdd-9928-44ae-b988-6d46c3f552df-w1600.webP',
          w2400:
            'https://statics-dev.mirrordaily.news/images/58e68bdd-9928-44ae-b988-6d46c3f552df-w2400.webP',
          w480: 'https://statics-dev.mirrordaily.news/images/58e68bdd-9928-44ae-b988-6d46c3f552df-w480.webP',
          w800: 'https://statics-dev.mirrordaily.news/images/58e68bdd-9928-44ae-b988-6d46c3f552df-w800.webP',
        },
      },
    },
    {
      name: '熱血江湖：歸來',
      description:
        '標普業年薪最高 CEO 出爐 台南女兒領走 17.5 億紀錄，我是第二行',
      link: 'https://play.google.com/store/apps/details?id=com.fivering.rxjh.and',
      heroImage: {
        resized: {
          w1200: '',
          w1600:
            'https://statics-dev.mirrordaily.news/images/b97c726f-cbe0-4a07-8c5b-767b90745c6e-w1600.jpg',
          w2400:
            'https://statics-dev.mirrordaily.news/images/b97c726f-cbe0-4a07-8c5b-767b90745c6e-w2400.jpg',
          w480: 'https://statics-dev.mirrordaily.news/images/b97c726f-cbe0-4a07-8c5b-767b90745c6e-w480.jpg',
          w800: 'https://statics-dev.mirrordaily.news/images/b97c726f-cbe0-4a07-8c5b-767b90745c6e-w800.jpg',
          original:
            'https://statics-dev.mirrordaily.news/images/b97c726f-cbe0-4a07-8c5b-767b90745c6e.jpg',
        },
        resizedWebp: {
          original:
            'https://statics-dev.mirrordaily.news/images/b97c726f-cbe0-4a07-8c5b-767b90745c6e.webP',
          w1200: '',
          w1600:
            'https://statics-dev.mirrordaily.news/images/b97c726f-cbe0-4a07-8c5b-767b90745c6e-w1600.webP',
          w2400:
            'https://statics-dev.mirrordaily.news/images/b97c726f-cbe0-4a07-8c5b-767b90745c6e-w2400.webP',
          w480: 'https://statics-dev.mirrordaily.news/images/b97c726f-cbe0-4a07-8c5b-767b90745c6e-w480.webP',
          w800: 'https://statics-dev.mirrordaily.news/images/b97c726f-cbe0-4a07-8c5b-767b90745c6e-w800.webP',
        },
      },
    },
    {
      name: '精靈探險家',
      description: '噁爆！中國身障正妹直播賣唱　當街慘遭癡漢亂摸',
      link: 'https://play.google.com/store/apps/details?id=com.sgjlmx.game',
      heroImage: {
        resized: {
          w1200: '',
          w1600:
            'https://statics-dev.mirrordaily.news/images/2991fe04-6c45-4f6a-83cf-67829fc3e887-w1600.jpg',
          w2400:
            'https://statics-dev.mirrordaily.news/images/2991fe04-6c45-4f6a-83cf-67829fc3e887-w2400.jpg',
          w480: 'https://statics-dev.mirrordaily.news/images/2991fe04-6c45-4f6a-83cf-67829fc3e887-w480.jpg',
          w800: 'https://statics-dev.mirrordaily.news/images/2991fe04-6c45-4f6a-83cf-67829fc3e887-w800.jpg',
          original:
            'https://statics-dev.mirrordaily.news/images/2991fe04-6c45-4f6a-83cf-67829fc3e887.jpg',
        },
        resizedWebp: {
          original:
            'https://statics-dev.mirrordaily.news/images/2991fe04-6c45-4f6a-83cf-67829fc3e887.webP',
          w1200: '',
          w1600:
            'https://statics-dev.mirrordaily.news/images/2991fe04-6c45-4f6a-83cf-67829fc3e887-w1600.webP',
          w2400:
            'https://statics-dev.mirrordaily.news/images/2991fe04-6c45-4f6a-83cf-67829fc3e887-w2400.webP',
          w480: 'https://statics-dev.mirrordaily.news/images/2991fe04-6c45-4f6a-83cf-67829fc3e887-w480.webP',
          w800: 'https://statics-dev.mirrordaily.news/images/2991fe04-6c45-4f6a-83cf-67829fc3e887-w800.webP',
        },
      },
    },
  ]

  const getTabletContent = () => {
    const horizontalDivider = <hr className="h-[2px] bg-[#000928]" />
    const elements: JSX.Element[] = []

    games.slice(0, 4).forEach((game, index) => {
      if ((index + 1 - 2) % 2 === 1) {
        elements.push(horizontalDivider, horizontalDivider)
      }

      elements.push(<GameItem {...game} />)
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
