import ShortsHeader from './header'
export default function ShortsLayout() {
  return (
    <div className="relative flex h-screen max-h-screen w-full max-w-screen-sm flex-col md:max-w-screen-lg">
      <ShortsHeader />
      <div className="flex grow flex-col overflow-hidden md:flex-row md:px-5 md:pt-[var(--shorts-body-padding)]">
        {/* Navbar */}
        {/* Body */}
      </div>
      {/* Mobile Navbar */}
    </div>
  )
}
