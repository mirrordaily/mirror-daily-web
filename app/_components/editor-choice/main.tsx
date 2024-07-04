'use client'

import TabButton from './tab-button'
import { useState } from 'react'

export default function EditorChoiceMain() {
  const TAB = {
    EDITOR_CHOICE: '編輯精選',
    AI_CHOICE: 'AI 精選',
  } as const

  type ValueOfTab = (typeof TAB)[keyof typeof TAB]

  const [activeTab, setActiveTab] = useState<ValueOfTab>(TAB.EDITOR_CHOICE)

  return (
    <div className="relative w-full">
      <div className="z-over-editor-choice mb-4 flex justify-center gap-x-2 md:absolute md:left-4 md:top-4 lg:left-7">
        {Object.values(TAB).map((value) => (
          <TabButton
            key={value}
            text={value}
            isActive={activeTab === value}
            onClick={() => setActiveTab(value)}
          />
        ))}
      </div>
      {/* Swiper Component */}
    </div>
  )
}
