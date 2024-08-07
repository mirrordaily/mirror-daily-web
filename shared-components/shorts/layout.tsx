import type { Shorts } from '@/types/homepage'
import ShortsHeader from './header'
import Navbar from './navbar'
import VideoBlock from './video-block'
import MobileNavbar from './mobile-navbar'
import type { SHORTS_TYPE } from '@/types/common'

type Props = {
  tabLinks: Record<SHORTS_TYPE, string>
  activeTab: SHORTS_TYPE
  items: Shorts[]
}

export default function ShortsLayout({ tabLinks, activeTab, items }: Props) {
  return (
    <div className="relative flex h-screen max-h-screen w-full max-w-screen-sm flex-col md:max-w-screen-lg">
      <ShortsHeader />
      <div className="flex grow flex-col overflow-hidden md:flex-row md:px-5 md:pt-[var(--shorts-body-padding)]">
        <Navbar tabs={tabLinks} activeTab={activeTab} />
        {/* Body */}
        <VideoBlock items={items} />
      </div>
      <MobileNavbar tabs={tabLinks} activeTab={activeTab} />
    </div>
  )
}
