'use client'
// import { useEffect, useRef } from 'react'

import type {
  ApiDataBlockBase,
  ApiDataBlockType,
  Organization,
  Video_Readr,
  VideoV2_MM,
  VideoImage,
} from '../types'

// import { VIDEO_AD_BASE_URL, VIDEO_AD_CLIENT_ID } from '@/constants/config'

type ContentVideo_Readr = {
  video: Video_Readr
}

type ContentVideoV2_MM = {
  desc: string
  video: VideoV2_MM
}

// since video V1 and v2 for readr stores the same data structure, we handle them as one
interface ApiDataVideo_Readr extends ApiDataBlockBase {
  type: ApiDataBlockType.Video | ApiDataBlockType.VideoV2
  content: [ContentVideo_Readr]
  alignment: 'center'
}

/**
 *  From 2023, video button store new structure for MM and then had been updated the version to v2.
 *  The v1 version data were removed from the db so no longer need to handle them.
 */
interface ApiDataVideoV2_MM extends ApiDataBlockBase {
  type: ApiDataBlockType.VideoV2
  content: [ContentVideoV2_MM]
  alignment: 'center'
}

export type ApiDataVideo = ApiDataVideo_Readr | ApiDataVideoV2_MM

type VideoProps = {
  video: {
    id: string
    url: string
    name: string
    heroImage: VideoImage | null
  }
}

const Video = ({ video }: VideoProps) => {
  // const adContainerRef = useRef<HTMLDivElement>(null)
  // const videoContentRef = useRef<HTMLVideoElement>(null)
  // const isAdPlaying = useRef<boolean>(false)
  // const isContentFinished = useRef<boolean>(false)
  // const adsManagerRef = useRef<google.ima.AdsManager | null>(null)
  // const adDisplayContainerRef = useRef<google.ima.AdDisplayContainer | null>(
  //   null
  // )
  // const adsLoaderRef = useRef<google.ima.AdsLoader | null>(null)
  // const adsInitialized = useRef(false)

  // useEffect(() => {
  //   if (
  //     typeof window === 'undefined' ||
  //     !window.google ||
  //     !adContainerRef.current ||
  //     !videoContentRef.current
  //   )
  //     return

  //   const adContainer = adContainerRef.current
  //   const videoContent = videoContentRef.current
  //   const ima = window.google.ima

  //   adDisplayContainerRef.current = new ima.AdDisplayContainer(
  //     adContainer,
  //     videoContent
  //   )

  //   const adsLoader = new ima.AdsLoader(adDisplayContainerRef.current)
  //   adsLoaderRef.current = adsLoader

  //   const { AdErrorEvent, AdEvent, AdsManagerLoadedEvent } = ima

  //   function onAdError(adErrorEvent: google.ima.AdErrorEvent) {
  //     console.log('Ad Error:', adErrorEvent.getError())
  //     if (adsManagerRef.current) {
  //       adsManagerRef.current.destroy()
  //       adsManagerRef.current = null
  //     }
  //   }

  //   function onContentPauseRequested() {
  //     isAdPlaying.current = true
  //     if (videoContentRef.current) {
  //       videoContentRef.current.pause()
  //       videoContentRef.current.controls = false
  //     }
  //   }

  //   function onContentResumeRequested() {
  //     isAdPlaying.current = false
  //     if (videoContentRef.current) {
  //       videoContentRef.current.controls = true
  //       if (!isContentFinished.current) {
  //         // Try to resume video after ad, but don't throw if user hasn't interacted
  //         videoContentRef.current.play().catch(() => {})
  //       }
  //     }
  //   }

  //   function onAdLoaded(adEvent: google.ima.AdEvent) {
  //     const ad = adEvent.getAd()
  //     if (!ad?.isLinear()) {
  //       // Try to play non-linear ad, but don't throw if user hasn't interacted
  //       videoContentRef.current?.play().catch(() => {})
  //     }
  //   }

  //   function onAdsManagerLoaded(
  //     adsManagerLoadedEvent: google.ima.AdsManagerLoadedEvent
  //   ) {
  //     const adsRenderingSettings = new ima.AdsRenderingSettings()
  //     adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true

  //     if (!videoContentRef.current) return

  //     adsManagerRef.current = adsManagerLoadedEvent.getAdsManager(
  //       videoContentRef.current,
  //       adsRenderingSettings
  //     )

  //     adsManagerRef.current.addEventListener(
  //       AdErrorEvent.Type.AD_ERROR,
  //       onAdError
  //     )
  //     adsManagerRef.current.addEventListener(
  //       AdEvent.Type.CONTENT_PAUSE_REQUESTED,
  //       onContentPauseRequested
  //     )
  //     adsManagerRef.current.addEventListener(
  //       AdEvent.Type.CONTENT_RESUME_REQUESTED,
  //       onContentResumeRequested
  //     )
  //     adsManagerRef.current.addEventListener(AdEvent.Type.LOADED, onAdLoaded)
  //   }

  //   adsLoaderRef.current.addEventListener(
  //     AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
  //     onAdsManagerLoaded,
  //     false
  //   )
  //   adsLoaderRef.current.addEventListener(
  //     AdErrorEvent.Type.AD_ERROR,
  //     onAdError,
  //     false
  //   )

  //   const contentEndedListener = function () {
  //     if (isAdPlaying.current) return
  //     isContentFinished.current = true
  //     adsLoader.contentComplete()
  //   }
  //   videoContent.onended = contentEndedListener

  //   const currentPageUrl = encodeURIComponent(window.location.href)

  //   const adsRequest = new ima.AdsRequest()
  //   adsRequest.adTagUrl = `${VIDEO_AD_BASE_URL}?ad_type=video_text_image&client=${VIDEO_AD_CLIENT_ID}&videoad_start_delay=0&description_url=${currentPageUrl}&max_ad_duration=30000&adtest=on`

  //   const containerWidth = adContainer.clientWidth
  //   const containerHeight = adContainer.clientHeight

  //   adsRequest.linearAdSlotWidth = containerWidth
  //   adsRequest.linearAdSlotHeight = containerHeight
  //   adsRequest.nonLinearAdSlotWidth = containerWidth
  //   adsRequest.nonLinearAdSlotHeight = 150

  //   adsLoader.requestAds(adsRequest)
  // }, [])

  // const playAds = () => {
  //   if (!adsInitialized.current && adDisplayContainerRef.current) {
  //     adDisplayContainerRef.current.initialize()
  //     try {
  //       adsManagerRef.current?.init(
  //         videoContentRef.current!.clientWidth,
  //         videoContentRef.current!.clientHeight
  //       )
  //       adsManagerRef.current?.start()
  //       adsInitialized.current = true
  //     } catch (e) {
  //       videoContentRef.current?.play()
  //     }
  //   }
  // }

  const heroImage = video.heroImage?.resized?.original
  return (
    <div className="video-block">
      <video
        src={video.url}
        loop
        controls
        poster={heroImage}
        preload="metadata"
      />
    </div>
  )

  // return (
  // <div id="mainContainer" className="relative">
  //   <div
  //     id="adContainer"
  //     ref={adContainerRef}
  //     className="absolute left-0 top-0 size-full"
  //   />
  //   <div className="video-block">
  //     <video
  //       src={video.url}
  //       loop
  //       controls
  //       poster={heroImage}
  //       preload="metadata"
  //       ref={videoContentRef}
  //       onPlay={() => {
  //         playAds()
  //       }}
  //     />
  //   </div>
  // </div>

  // )
}

export default function VideoBlock({
  apiDataBlock,
  organization,
}: {
  apiDataBlock: ApiDataVideo
  organization: Organization
}) {
  switch (organization) {
    case 'mirror-media': {
      const apiDataAudio = apiDataBlock as ApiDataVideoV2_MM
      const videoData = apiDataAudio.content[0]?.video
      return (
        <Video
          video={{
            id: videoData.id,
            name: videoData.name,
            url: videoData.videoSrc,
            heroImage: videoData.heroImage,
          }}
        />
      )
    }
    case 'readr-media': {
      const apiDataAudio = apiDataBlock as ApiDataVideo_Readr
      const videoData = apiDataAudio.content[0]?.video
      return (
        <Video
          video={{
            id: videoData.id,
            name: videoData.name,
            url: videoData.url,
            heroImage: videoData.coverPhoto,
          }}
        />
      )
    }
    default:
      return null
  }
}
