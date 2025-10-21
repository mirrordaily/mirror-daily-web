/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useRef } from 'react'

import type {
  ApiDataBlockBase,
  ApiDataBlockType,
  Organization,
  Video_Readr,
  VideoV2_MM,
  VideoImage,
} from '../types'

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

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google?: any
  }
}

const Video = ({ video }: VideoProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null)
  const videoContentRef = useRef<HTMLVideoElement>(null)
  const isAdPlaying = useRef<boolean>(false)
  const isContentFinished = useRef<boolean>(false)
  const adsManagerRef = useRef<any>(null)
  const adDisplayContainerRef = useRef<any>(null)
  const adsLoaderRef = useRef<any>(null)
  const adsInitialized = useRef(false)

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !window.google ||
      !adContainerRef.current ||
      !videoContentRef.current
    )
      return

    const ima = window.google.ima

    adDisplayContainerRef.current = new ima.AdDisplayContainer(
      adContainerRef.current,
      videoContentRef.current
    )

    const adsLoader = new ima.AdsLoader(adDisplayContainerRef.current)
    adsLoaderRef.current = adsLoader

    function onAdError(adErrorEvent: any) {
      console.log('Ad Error:', adErrorEvent.getError())
      if (adsManagerRef.current) {
        adsManagerRef.current.destroy()
        adsManagerRef.current = null
      }
      videoContentRef.current?.play()
    }

    function onContentPauseRequested() {
      isAdPlaying.current = true
      if (videoContentRef.current) {
        videoContentRef.current.pause()
        videoContentRef.current.controls = false
      }
    }

    function onContentResumeRequested() {
      isAdPlaying.current = false
      if (videoContentRef.current) {
        videoContentRef.current.controls = true
        if (!isContentFinished.current) {
          videoContentRef.current.play()
        }
      }
    }

    function onAdLoaded(adEvent: any) {
      const ad = adEvent.getAd()
      if (!ad.isLinear()) {
        videoContentRef.current?.play()
      }
    }

    function onAdsManagerLoaded(adsManagerLoadedEvent: any) {
      const adsRenderingSettings = new ima.AdsRenderingSettings()
      adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true

      adsManagerRef.current = adsManagerLoadedEvent.getAdsManager(
        videoContentRef.current,
        adsRenderingSettings
      )

      adsManagerRef.current.addEventListener(
        window.google.ima.AdErrorEvent.Type.AD_ERROR,
        onAdError
      )
      adsManagerRef.current.addEventListener(
        window.google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
        onContentPauseRequested
      )
      adsManagerRef.current.addEventListener(
        window.google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
        onContentResumeRequested
      )
      adsManagerRef.current.addEventListener(
        window.google.ima.AdEvent.Type.LOADED,
        onAdLoaded
      )
    }

    adsLoaderRef.current.addEventListener(
      window.google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      onAdsManagerLoaded,
      false
    )
    adsLoaderRef.current.addEventListener(
      window.google.ima.AdErrorEvent.Type.AD_ERROR,
      onAdError,
      false
    )

    const contentEndedListener = function () {
      if (isAdPlaying.current) return
      isContentFinished.current = true
      adsLoader.contentComplete()
    }
    videoContentRef.current.onended = contentEndedListener

    const adsRequest = new ima.AdsRequest()

    adsRequest.adTagUrl =
      'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator='

    adsRequest.linearAdSlotWidth = adContainerRef.current.clientWidth
    adsRequest.linearAdSlotHeight = adContainerRef.current.clientHeight

    adsRequest.nonLinearAdSlotWidth = adContainerRef.current.clientWidth
    adsRequest.nonLinearAdSlotHeight = 150

    adsLoader.requestAds(adsRequest)
  }, [])

  const playAds = () => {
    if (!adsInitialized.current && adDisplayContainerRef.current) {
      adDisplayContainerRef.current.initialize()
      try {
        adsManagerRef.current?.init(
          videoContentRef.current!.clientWidth,
          videoContentRef.current!.clientHeight,
          window.google.ima.ViewMode.NORMAL
        )
        adsManagerRef.current?.start()
        adsInitialized.current = true
      } catch (e) {
        videoContentRef.current?.play()
      }
    }
  }

  const heroImage = video.heroImage?.resized?.original
  return (
    <div id="mainContainer" className="relative">
      <div
        id="adContainer"
        ref={adContainerRef}
        className="absolute left-0 top-0 size-full"
      />
      <div className="video-block">
        <video
          src={video.url}
          loop
          controls
          poster={heroImage}
          preload="metadata"
          ref={videoContentRef}
          onPlay={() => {
            playAds()
          }}
        />
      </div>
    </div>
  )
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
