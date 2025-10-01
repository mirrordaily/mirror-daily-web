'use client'

export default function TestVideo() {
  return (
    <>
      <div id="mainContainer" className="relative">
        <div id="adContainer" className="absolute left-0 top-0" />
        <div id="content">
          <video
            id="contentElement"
            src="https://storage.googleapis.com/gvabox/media/samples/stock.mp4"
            loop
            controls
          ></video>
        </div>
        <button id="playButton">Play</button>
        <div id="adContainer"></div>
      </div>
      <button id="playButton">Play</button>
    </>
  )
}
