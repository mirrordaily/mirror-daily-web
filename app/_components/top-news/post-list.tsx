import HighlightItem from './highlight-item'

type PropsOfHighlightItem = Parameters<typeof HighlightItem>[0]

export default function PostList() {
  const data: PropsOfHighlightItem = {
    // categoryName: '廚房密技',
    // categoryColor: 'rgb(203,174,94)',
    postName:
      '測試 rss 分類手動排序只抓第一個_萬象測試 rss 分類手動排序只抓第一個_萬象',
    postSlug: 'test_manualOrderOfCategories_2',
    heroImage: {
      resized: {
        original:
          'https://v3-statics-dev.mirrormedia.mg/images/ca661b5c-a75e-42f9-8201-4ff43eae9f3c.webp',
        w480: 'https://v3-statics-dev.mirrormedia.mg/images/ca661b5c-a75e-42f9-8201-4ff43eae9f3c-w480.webp',
        w800: 'https://v3-statics-dev.mirrormedia.mg/images/ca661b5c-a75e-42f9-8201-4ff43eae9f3c-w800.webp',
        w1200: '',
        w1600:
          'https://v3-statics-dev.mirrormedia.mg/images/ca661b5c-a75e-42f9-8201-4ff43eae9f3c-w1600.webp',
        w2400:
          'https://v3-statics-dev.mirrormedia.mg/images/ca661b5c-a75e-42f9-8201-4ff43eae9f3c-w2400.webp',
      },
      resizedWebp: {
        original:
          'https://v3-statics-dev.mirrormedia.mg/images/ca661b5c-a75e-42f9-8201-4ff43eae9f3c.webP',
        w480: 'https://v3-statics-dev.mirrormedia.mg/images/ca661b5c-a75e-42f9-8201-4ff43eae9f3c-w480.webP',
        w800: 'https://v3-statics-dev.mirrormedia.mg/images/ca661b5c-a75e-42f9-8201-4ff43eae9f3c-w800.webP',
        w1200: '',
        w1600:
          'https://v3-statics-dev.mirrormedia.mg/images/ca661b5c-a75e-42f9-8201-4ff43eae9f3c-w1600.webP',
        w2400:
          'https://v3-statics-dev.mirrormedia.mg/images/ca661b5c-a75e-42f9-8201-4ff43eae9f3c-w2400.webP',
      },
    },
    // publishedDate: '2024-03-21T06:52:00.000Z',
  }

  return (
    <div className="mt-4 flex w-full flex-col md:mt-[6px] lg:mt-[11px]">
      <HighlightItem {...data} />
      <div>{/* other items */}</div>
    </div>
  )
}
