import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script src="https://cse.google.com/cse.js?cx=8699fc3347bb84e9d" />
      <div
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="gcse-search"
      />
    </>
  )
}
