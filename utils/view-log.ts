import 'server-only'

import { Logging } from '@google-cloud/logging'
import { GCP_PROJECT_ID, ENV, SITE_URL } from '@/constants/config'
import { parseUserAgentInfo } from '@/utils/user-agent'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

export type ViewEventType = 'page-view' | 'video-view'

export type ViewLogPayload = {
  eventType: ViewEventType
  currentUrl: string
  referrer: string
  screenSize: { width: number; height: number }
  extra?: Record<string, unknown>
}

let loggingClient: Logging | null = null

function getLoggingClient() {
  if (!loggingClient) {
    loggingClient = new Logging({ projectId: GCP_PROJECT_ID })
  }
  return loggingClient
}

/**
 * ADC exists only on Google Cloud managed runtimes (Cloud Run, GCE, GKE)
 * with a service account attached. Skip writes locally so missing
 * credentials do not throw.
 */
function canUseCloudLogging(): boolean {
  return !!process.env.K_SERVICE || !!process.env.GCE_METADATA_HOST
}

export async function logView({
  eventType,
  currentUrl,
  referrer,
  screenSize,
  extra = {},
}: ViewLogPayload) {
  if (!canUseCloudLogging()) return

  const logName = `${GCP_PROJECT_ID}-${ENV}-web-${eventType}`
  const log = getLoggingClient().log(logName)
  const userAgentInfo = await parseUserAgentInfo()
  const taipeiNow = dayjs().tz('Asia/Taipei')
  const formattedDate = taipeiNow.format('YYYY/MM/DD')
  const formattedTime = taipeiNow.format('HH:mm')
  const { browser, device, os, isInAppBrowser, isWebview, ipAddress } =
    userAgentInfo
  const { name: browserName, version: browserVersion } = browser
  const { model: deviceModel, vendor: deviceVendor } = device
  const { name: osName, version: osVersion } = os
  const pageType = parsePageType(currentUrl)

  const metadata = {
    resource: { type: 'global' },
    severity: 'DEFAULT',
    labels: {
      eventType,
      date: formattedDate,
      time: formattedTime,
      browserName,
      browserVersion,
      deviceModel,
      deviceVendor,
      osName,
      osVersion,
      ipAddress,
      referrer,
    },
  }

  const jsonPayload = {
    pageURL: currentUrl,
    pageType,
    screenSize,
    isInAppBrowser,
    isWebview,
    extra,
  }

  const entry = log.entry(metadata, jsonPayload)

  return log.write(entry)
}

function parsePageType(url: string) {
  try {
    const { pathname } = new URL(url, SITE_URL)
    const parsed = pathname.split('/')

    switch (parsed[1]) {
      case '':
        return 'index'
      case 'topic':
        return parsed[2] ? 'topic' : 'topic-listing'
      default:
        return parsed[1] ?? ''
    }
  } catch {
    return ''
  }
}
