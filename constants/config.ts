/**
 * 環境變數設定
 *
 * 前綴含 `NEXT_PUBLIC_` - build 時寫入，無法在 runtime 設定
 * 前綴不含 `NEXT_PUBLIC_` - runtime 時可被設定
 *
 * 參考：https://paper.dropbox.com/doc/--CQb4squ7BM_WCI1h96LWcZ8IAg-1sRvBsDLCqGg7F4G9mIuI
 */

// environment variables is used by codegen script, so manually loading is required
import dotenv from 'dotenv'
import { ENVIRONMENT } from './misc'

// Load env only if not already loaded by Next.js
// This typically applies to Node.js tools like GraphQL Codegen
if (!process.env.__NEXT_PRIVATE_RUNTIME_ENV) {
  // Priority: existing env > .env.local > .env
  dotenv.config({ path: '.env.local' })
  dotenv.config({ path: '.env' })
}

const JSON_ROOT = '/json'
const MISO_API_KEY = 'IHtn9b9tfPsO1EQpGV74OMf2syhELb6XVZe8u9FT'
let STATIC_FILE_DOMAIN: string
let JSON_FILE_PATH: string
let SITE_URL: `https://${string}`
let GTM_ID: string

const ENV = (function () {
  const env = process.env.NEXT_PUBLIC_ENV

  if (!env) return ENVIRONMENT.LOCAL
  else if (Object.values(ENVIRONMENT).includes(env as ENVIRONMENT)) {
    return env as ENVIRONMENT
  }
  return ENVIRONMENT.LOCAL
})()

const GCP_PROJECT_ID = 'mirrordaily'
const RECAPTCHA_SITE_KEY = '6LfXbQIrAAAAAPrIGJH_oBhdpNsDTkO5IwlM4UfX'
const RECAPTCHA_API_KEY = 'AIzaSyCCEuV8oEN0SZsU0Fg7E6e2gx-fdTCQLAQ'
const RECAPTCHA_SCORE = 0.7
/** section shorts must use specific key for navigation purpose */
const FIXED_KEY_FOR_SECTION_SHORTS = 'shorts'
const TIMESTAMP_FOR_CACHE = '?t=' + Date.now() / 100

switch (ENV) {
  case ENVIRONMENT.PRODUCTION:
    STATIC_FILE_DOMAIN = 'statics-prod.mirrordaily.news'
    JSON_FILE_PATH = `https://${STATIC_FILE_DOMAIN}${JSON_ROOT}`
    SITE_URL = 'https://www.mirrordaily.news'
    GTM_ID = 'GTM-MPWSXJ4X'
    break

  case ENVIRONMENT.STAGING:
    STATIC_FILE_DOMAIN = 'statics-staging.mirrordaily.news'
    JSON_FILE_PATH = `https://${STATIC_FILE_DOMAIN}${JSON_ROOT}`
    SITE_URL = 'https://staging.mirrordaily.news'
    GTM_ID = 'GTM-P7XPJ6P4'
    break

  case ENVIRONMENT.DEVELOPMENT:
    STATIC_FILE_DOMAIN = 'statics-dev.mirrordaily.news'
    JSON_FILE_PATH = `https://${STATIC_FILE_DOMAIN}${JSON_ROOT}`
    SITE_URL = 'https://dev.mirrordaily.news'
    GTM_ID = 'GTM-MG9V2TJC'
    break

  default:
    STATIC_FILE_DOMAIN = 'statics-dev.mirrordaily.news'
    JSON_FILE_PATH = `https://${STATIC_FILE_DOMAIN}${JSON_ROOT}`
    SITE_URL = 'https://dev.mirrordaily.news'
    GTM_ID = 'GTM-MG9V2TJC'
    break
}
const URL_STATIC_POPULAR_NEWS = `${JSON_FILE_PATH}/popular.json${TIMESTAMP_FOR_CACHE}`
const URL_STATIC_LATEST_NEWS = `${JSON_FILE_PATH}/latest_posts`
const URL_STATIC_HEADER = `${JSON_FILE_PATH}/header.json${TIMESTAMP_FOR_CACHE}`
const URL_STATIC_HOT_NEWS = `${JSON_FILE_PATH}/flash-news.json${TIMESTAMP_FOR_CACHE}`
const URL_STATIC_EDITOR_CHOICE = `${JSON_FILE_PATH}/editor-choice.json${TIMESTAMP_FOR_CACHE}`
const URL_STATIC_TOPIC = `${JSON_FILE_PATH}/topics.json${TIMESTAMP_FOR_CACHE}`
const URL_STATIC_LATEST_SHORTS = `${JSON_FILE_PATH}/latest-shorts-hp.json${TIMESTAMP_FOR_CACHE}`
const URL_STATIC_LATEST_VIDEOS = `${JSON_FILE_PATH}/youtube/UCeN_H2EG1U6StWZhlBEWjjg_latest.json${TIMESTAMP_FOR_CACHE}`
const URL_STATIC_WEATHER = `${JSON_FILE_PATH}/weather.json${TIMESTAMP_FOR_CACHE}`
const URL_STATIC_LATEST_SPORTS_NEWS = `${JSON_FILE_PATH}/latest/latest_content_section_sport_1.json`
const URL_STATIC_SPORTS_EVENTS = `${JSON_FILE_PATH}/sports_schedule.json${TIMESTAMP_FOR_CACHE}`
const URL_STATIC_PROMOTE_TOPICS = `${JSON_FILE_PATH}/promote-topics.json${TIMESTAMP_FOR_CACHE}`
// shorts listing page
const URL_STATIC_NEWS_SHORTSPAGE = `${JSON_FILE_PATH}/shortpage_news`
const URL_STATIC_CREATIVTY_SHORTPAGE = `${JSON_FILE_PATH}/shortpage_creativity`
// section page
const URL_STATIC_SECTION_NEWS = `${JSON_FILE_PATH}/latest/latest_content_section`
// category page
const URL_STATIC_CATEGORY_NEWS = `${JSON_FILE_PATH}/latest/latest_content_category`
// topic page
const URL_STATIC_TOPIC_NEWS = `${JSON_FILE_PATH}/latest/latest_content_topic`
const CPBL_SITE_URL = 'https://www.cpbl.com.tw'
const TPBL_SITE_URL = 'https://tpbl.basketball'

const VIDEO_AD_BASE_URL = 'https://googleads.g.doubleclick.net/pagead/ads'
const VIDEO_AD_CLIENT_ID = 'ca-video-pub-4968145218643279'

const API_ENDPOINT = process.env.API_ENDPOINT ?? ''

if (!API_ENDPOINT) {
  console.warn(
    '[config] API_ENDPOINT is empty. This may break GraphQL Codegen or API requests.'
  )
}

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY ?? ''
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX ?? ''
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID ?? ''

export {
  ENV,
  CPBL_SITE_URL,
  TPBL_SITE_URL,
  API_ENDPOINT,
  URL_STATIC_POPULAR_NEWS,
  URL_STATIC_LATEST_NEWS,
  URL_STATIC_HEADER,
  URL_STATIC_HOT_NEWS,
  URL_STATIC_EDITOR_CHOICE,
  URL_STATIC_TOPIC,
  URL_STATIC_LATEST_SHORTS,
  URL_STATIC_LATEST_VIDEOS,
  URL_STATIC_WEATHER,
  URL_STATIC_NEWS_SHORTSPAGE,
  URL_STATIC_CREATIVTY_SHORTPAGE,
  URL_STATIC_SPORTS_EVENTS,
  URL_STATIC_LATEST_SPORTS_NEWS,
  URL_STATIC_PROMOTE_TOPICS,
  URL_STATIC_SECTION_NEWS,
  URL_STATIC_CATEGORY_NEWS,
  URL_STATIC_TOPIC_NEWS,
  GCP_PROJECT_ID,
  RECAPTCHA_SITE_KEY,
  RECAPTCHA_API_KEY,
  RECAPTCHA_SCORE,
  FIXED_KEY_FOR_SECTION_SHORTS,
  SITE_URL,
  GTM_ID,
  MISO_API_KEY,
  VIDEO_AD_BASE_URL,
  VIDEO_AD_CLIENT_ID,
  MAILCHIMP_API_KEY,
  MAILCHIMP_SERVER_PREFIX,
  MAILCHIMP_LIST_ID,
}
