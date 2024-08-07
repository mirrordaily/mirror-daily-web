import type { TAB } from '@/types/shorts'
import type { Shorts } from '@/types/homepage'
import ShortsHeader from './header'
import Navbar from './navbar'
import VideoBlock from './video-block'
import MobileNavbar from './mobile-navbar'

export default function ShortsLayout() {
  const TAB_LINKS: Record<TAB, string> = {
    NEWS: '',
    CREATIVITY: '',
  }

  const items: Shorts[] = [
    {
      title: '他取代蘿拉回鍋14天　蔡阿嘎員工突發「不自殺聲明」｜shorts ',
      fileUrl:
        'https://statics-dev.mirrordaily.news/files/ae-a-ae-e-ae-a-e-14a-a-e-e-a-a-a-c-c-a-ae-e-ae-e-ae-a-i-shorts-hqCXarPWiSNq0qJv5nDW.mp4',
      poster: '',
      link: '',
      contributor:
        '標普業年薪最高 CEO 出爐 台南女兒領走 17.5 億紀錄，我是第二行',
    },
    {
      title:
        'MAMA典禮再創新！首度進軍美國　11月登場連辦3天跨兩大洲全球直播｜shorts ',
      fileUrl:
        'https://statics-dev.mirrordaily.news/files/mam-aa-c-a-a-ae-i-e-a-e-e-c-a-a-11ae-c-a-e-e-3a-e-a-a-ae-a-c-c-ae-i-shorts-VyhAq8Jh8eI2Cq0xe2s.mp4',
      poster: '',
      link: '',
    },
    {
      title:
        '郭采潔驚爆「已婚」登熱搜！　爆「老公」吸毒、濫交黑歷史曝光｜shorts ',
      fileUrl:
        'https://statics-dev.mirrordaily.news/files/e-e-ae-e-c-a-a-a-a-c-c-ae-i-a-c-a-e-a-a-a-ae-a-ae-ae-e-ae-a-ae-a-i-shorts-3eyO3W9KgBzfTaC9TK.mp4',
      poster: '',
      link: '',
    },
    {
      title: '45年來首見！獼猴闖二殯吃供品　趴如來佛上打瞌睡｜',
      fileUrl:
        'https://statics-dev.mirrordaily.news/files/45a-ae-e-e-i-c-c-e-ae-ae-a-ae-a-a-e-a-ae-ae-ae-ae-c-c-i-t1FkPBjFNRma9tZ7Yc.mp4',
      poster: '',
      link: '',
    },
    {
      title: '幼兒園性侵案延燒！蔣萬安道歉了　孩童受傷「都是我的責任」｜',
      fileUrl:
        'https://statics-dev.mirrordaily.news/files/a-a-a-ae-ae-ae-a-c-i-e-e-a-e-ae-ae-a-a-c-a-a-a-e-ae-ae-c-e-ae-a-i-3iO2bla8TGyIfXcyQn9q.mp4',
      poster:
        'https://statics-dev.mirrordaily.news/images/08e3d112-b9e6-47e0-8c9f-1668323e9ae9-w800.webP',
      link: '',
    },
    {
      title: '可不可翻版？清心店員「手捧茶凍玩拋接」　網嘆：哪家飲料店正常｜',
      fileUrl:
        'https://statics-dev.mirrordaily.news/files/a-ae-a-c-c-i-ae-a-a-a-a-ae-ae-e-a-c-ae-ae-a-a-c-a-i-a-a-e-ae-a-ae-a-i-tjTbzUbGa466G5ww61Ki.mp4',
      poster: '',
      link: '',
    },
    {
      title: '3毒犯拒檢狂飆進科大！　警連轟15槍制伏｜',
      fileUrl:
        'https://statics-dev.mirrordaily.news/files/3ae-c-ae-ae-c-e-e-c-a-i-a-e-e-e-15ae-a-ae-i-6WO9geDOUzfzjuLVEj.mp4',
      poster: '',
      link: '',
      contributor:
        '標普業年薪最高 CEO 出爐 台南女兒領走 17.5 億紀錄，我是第二行',
    },
    {
      title: '川普提槍擊案「上帝站在我這邊」　親吻喪命義消頭盔悼念｜',
      fileUrl:
        'https://statics-dev.mirrordaily.news/files/a-ae-ae-ae-ae-ae-a-ae-a-c-a-ae-e-e-a-a-e-a-a-a-c-ae-e-c-ae-a-i-UUnzKNzEPb9YpaDeEG4.mp4',
      poster: '',
      link: '',
    },
    {
      title: '稱台灣搶走晶片生意　川普：應付美國保護費｜#shorts #鏡新聞 ',
      fileUrl:
        'https://statics-dev.mirrordaily.news/files/c-a-c-ae-e-ae-c-c-ae-a-a-ae-i-ae-ae-c-a-ae-e-e-i-shorts-e-ae-e-y49eFrfZQercNVleZlHa.mp4',
      poster: '',
      link: '',
    },
    {
      title: '川普要「保護費」？　謝龍介：兩岸要走和平道路｜#shorts #鏡新聞 ',
      fileUrl:
        'https://statics-dev.mirrordaily.news/files/a-ae-e-a-ae-e-e-a-i-a-e-e-ae-i-a-a-e-e-a-a-e-e-i-shorts-e-ae-e-fadgDWU9ygt1PNwyFz.mp4',
      poster: '',
      link: '',
    },
  ]

  return (
    <div className="relative flex h-screen max-h-screen w-full max-w-screen-sm flex-col md:max-w-screen-lg">
      <ShortsHeader />
      <div className="flex grow flex-col overflow-hidden md:flex-row md:px-5 md:pt-[var(--shorts-body-padding)]">
        <Navbar tabs={TAB_LINKS} activeTab="NEWS" />
        {/* Body */}
        <VideoBlock items={items} />
      </div>
      <MobileNavbar tabs={TAB_LINKS} activeTab="NEWS" />
    </div>
  )
}
