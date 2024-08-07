import type { TAB } from '@/types/shorts'
import ShortsHeader from './header'
import MobileNavbar from './mobile-navbar'

export default function ShortsLayout() {
  const TAB_LINKS: Record<TAB, string> = {
    NEWS: '',
    CREATIVITY: '',
  }

  return (
    <div className="relative flex h-screen max-h-screen w-full max-w-screen-sm flex-col md:max-w-screen-lg">
      <ShortsHeader />
      <div className="flex grow flex-col overflow-hidden md:flex-row md:px-5 md:pt-[var(--shorts-body-padding)]">
        {/* Navbar */}
        {/* Body */}
      </div>
      <MobileNavbar tabs={TAB_LINKS} activeTab="NEWS" />
    </div>
  )
}
