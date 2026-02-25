import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script src="https://cse.google.com/cse.js?cx=8699fc3347bb84e9d&as_q=query_string" />
      <div
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="gcse-search"
      />
    </>
  )
}
