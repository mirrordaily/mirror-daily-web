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
const STATIC_CACHE_TIMESTAMP = Math.floor(Date.now() / 100)
const TIMESTAMP_FOR_CACHE = '?t=' + STATIC_CACHE_TIMESTAMP

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

/**
 * Static JSON file paths (relative to /json root)
 * These are used with readStaticJson() utility which handles fs/fetch automatically
 */
const STATIC_JSON_POPULAR_NEWS = 'popular.json'
const URL_STATIC_POPULAR_NEWS = `${JSON_FILE_PATH}/${STATIC_JSON_POPULAR_NEWS}${TIMESTAMP_FOR_CACHE}`
const STATIC_JSON_LATEST_NEWS = 'latest_posts'
const URL_STATIC_LATEST_NEWS = `${JSON_FILE_PATH}/${STATIC_JSON_LATEST_NEWS}`
const STATIC_JSON_HEADER = 'header.json'
const STATIC_JSON_HOT_NEWS = 'flash-news.json'
const STATIC_JSON_EDITOR_CHOICE = 'editor-choice.json'
const URL_STATIC_EDITOR_CHOICE = `${JSON_FILE_PATH}/${STATIC_JSON_EDITOR_CHOICE}${TIMESTAMP_FOR_CACHE}`
const STATIC_JSON_TOPIC = 'topics.json'
const STATIC_JSON_LATEST_SHORTS = 'latest-shorts-hp.json'
const URL_STATIC_LATEST_SHORTS = `${JSON_FILE_PATH}/${STATIC_JSON_LATEST_SHORTS}${TIMESTAMP_FOR_CACHE}`
const STATIC_JSON_LATEST_VIDEOS = 'youtube/UCeN_H2EG1U6StWZhlBEWjjg_latest.json'
const STATIC_JSON_WEATHER = 'weather.json'
const STATIC_JSON_LATEST_SPORTS_NEWS =
  'latest/latest_content_section_sport_1.json'
const STATIC_JSON_SPORTS_EVENTS = 'sports_schedule.json'
const URL_STATIC_SPORTS_EVENTS = `${JSON_FILE_PATH}/${STATIC_JSON_SPORTS_EVENTS}${TIMESTAMP_FOR_CACHE}`
// shorts listing page
const STATIC_JSON_NEWS_SHORTSPAGE = 'shortpage_news'
const URL_STATIC_NEWS_SHORTSPAGE = `${JSON_FILE_PATH}/${STATIC_JSON_NEWS_SHORTSPAGE}`
const STATIC_JSON_CREATIVITY_SHORTPAGE = 'shortpage_creativity'
const URL_STATIC_CREATIVITY_SHORTPAGE = `${JSON_FILE_PATH}/${STATIC_JSON_CREATIVITY_SHORTPAGE}`
// section page
const STATIC_JSON_SECTION_NEWS = 'latest/latest_content_section'
// category page
const STATIC_JSON_CATEGORY_NEWS = 'latest/latest_content_category'
// topic page
const STATIC_JSON_TOPIC_NEWS = 'latest/latest_content_topic'

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

const API_STORY_GQL_ENDPOINT = process.env.STORY_GQL_ENDPOINT ?? ''
if (!API_STORY_GQL_ENDPOINT) {
  console.warn(
    '[config] API_STORY_GQL_ENDPOINT is empty. This may break GraphQL Codegen or API requests.'
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
  API_STORY_GQL_ENDPOINT,
  STATIC_FILE_DOMAIN,
  STATIC_JSON_POPULAR_NEWS,
  URL_STATIC_POPULAR_NEWS,
  STATIC_JSON_LATEST_NEWS,
  URL_STATIC_LATEST_NEWS,
  STATIC_JSON_HEADER,
  STATIC_JSON_HOT_NEWS,
  STATIC_JSON_EDITOR_CHOICE,
  URL_STATIC_EDITOR_CHOICE,
  STATIC_JSON_TOPIC,
  STATIC_JSON_LATEST_SHORTS,
  URL_STATIC_LATEST_SHORTS,
  STATIC_JSON_LATEST_VIDEOS,
  STATIC_JSON_WEATHER,
  STATIC_JSON_NEWS_SHORTSPAGE,
  STATIC_JSON_CREATIVITY_SHORTPAGE,
  URL_STATIC_NEWS_SHORTSPAGE,
  URL_STATIC_CREATIVITY_SHORTPAGE,
  STATIC_JSON_SPORTS_EVENTS,
  URL_STATIC_SPORTS_EVENTS,
  STATIC_JSON_LATEST_SPORTS_NEWS,
  STATIC_JSON_SECTION_NEWS,
  STATIC_JSON_CATEGORY_NEWS,
  STATIC_JSON_TOPIC_NEWS,
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
  STATIC_CACHE_TIMESTAMP,
}
