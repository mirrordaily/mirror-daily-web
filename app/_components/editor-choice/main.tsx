'use client'

import TabButton from './tab-button'
import SwiperComponent from './swiper-component'
import { useState } from 'react'
import type { EditorChoice } from '@/types/homepage'

type Props = {
  editor: EditorChoice[]
  ai: EditorChoice[]
}

export default function EditorChoiceMain(props: Props) {
  const TAB = {
    EDITOR_CHOICE: {
      id: 'editor',
      name: '編輯精選',
    },
    AI_CHOICE: {
      id: 'ai',
      name: 'AI 精選',
    },
  } as const

  type ValueOfTab = (typeof TAB)[keyof typeof TAB]['id']

  const validTabs = Object.values(TAB)
    .map((item) => item.id)
    .filter((id) => props[id].length > 0)

  const [activeTab, setActiveTab] = useState<ValueOfTab>(validTabs[0]!)

  const list = props[activeTab]

  return (
    <div className="relative w-full">
      <div className="z-over-editor-choice mb-6 flex justify-center gap-x-2 md:absolute md:left-4 md:top-4">
        {validTabs.map((tab) => {
          const amount = props[tab].length

          if (!amount) return

          const item = Object.values(TAB).find((obj) => obj.id === tab)!

          return (
            <TabButton
              key={item.id}
              text={item.name}
              isActive={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          )
        })}
      </div>
      <SwiperComponent key={activeTab} list={list} />
      <div className="hidden h-[20px] w-full bg-mirror-blue-700 lg:block" />
    </div>
  )
}
