import type { Shorts } from '@/types/homepage'
import ShortsList from './list'

export default function ShortsNewsSection() {
  const items: Shorts[] = [
    {
      fileUrl:
        'https://statics-dev.mirrordaily.news/files/a-ae-e-a-ae-e-e-a-i-a-e-e-ae-i-a-a-e-e-a-a-e-e-i-shorts-e-ae-e-fadgDWU9ygt1PNwyFz.mp4',
      title: '川普要「保護費」？　謝龍介：兩岸要走和平道路｜#shorts #鏡新聞',
      link: '',
    },
    {
      fileUrl:
        'https://statics-dev.mirrordaily.news/files/c-a-c-ae-e-ae-c-c-ae-a-a-ae-i-ae-ae-c-a-ae-e-e-i-shorts-e-ae-e-y49eFrfZQercNVleZlHa.mp4',
      title: '稱台灣搶走晶片生意　川普：應付美國保護費｜#shorts #鏡新聞',
      link: '',
    },
    {
      fileUrl:
        'https://statics-dev.mirrordaily.news/files/e-a-e-e-2024-07-11-ae-a-12-11-55-dfCpyljL2jsa3WlRlMVg.mov',
      title: '上架影片',
      link: '',
    },
    {
      fileUrl: 'https://www.youtube.com/shorts/o_l6Ox3Vlzw',
      title:
        '【右左どっち】変身するのら！　 #ホロライブ #姫森ルーナ #天音かなた #さくらみこ',
      link: '',
    },
    {
      fileUrl:
        'https://statics-dev.mirrordaily.news/files/e-a-e-e-2024-07-11-ae-a-12-11-55-dfCpyljL2jsa3WlRlMVg.mov',
      title: '上架影片',
      link: '',
      poster:
        'https://w0.peakpx.com/wallpaper/300/911/HD-wallpaper-dark-vertical-black-thumbnail.jpg',
    },
    {
      fileUrl: 'https://www.youtube.com/shorts/j_b2kBo68cU',
      title: "【Official Music Video】Poppin'Party「トレモロアイズ」",
      link: '',
    },
  ]

  return (
    <section className="mb-[34px] mt-5 w-full max-w-screen-sm md:mt-6 md:max-w-screen-md lg:my-9 lg:max-w-none">
      <p className="px-[23px] text-base font-bold leading-normal text-[#119CC7] md:px-5 lg:px-9 lg:text-lg">
        短影音．新聞
      </p>
      <ShortsList customClass="mt-[19px]" customColor="#1F668E" items={items} />
    </section>
  )
}
