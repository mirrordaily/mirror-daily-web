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
dotenv.config({ path: '.env.local', override: true })
import { ENVIRONMENT } from './misc'

const JSON_ROOT = '/json'
let STATIC_FILE_DOMAIN: string
let JSON_FILE_PATH: string
let SITE_URL: `https://${string}`

const ENV = (function () {
  const env = process.env.NEXT_PUBLIC_ENV

  if (!env) return ENVIRONMENT.LOCAL
  else if (Object.values(ENVIRONMENT).includes(env as ENVIRONMENT)) {
    return env as ENVIRONMENT
  }
  return ENVIRONMENT.LOCAL
})()

const GCP_PROJECT_ID = 'mirrordaily'
/** section shorts must use specific key for navigation purpose */
const FIXED_KEY_FOR_SECTION_SHORTS = 'short'

switch (ENV) {
  case ENVIRONMENT.PRODUCTION:
    STATIC_FILE_DOMAIN = 'statics-prod.mirrordaily.news'
    JSON_FILE_PATH = `https://${STATIC_FILE_DOMAIN}${JSON_ROOT}`
    SITE_URL = 'https://www.mirrordaily.news'
    break

  case ENVIRONMENT.STAGING:
    STATIC_FILE_DOMAIN = 'statics-staging.mirrordaily.news'
    JSON_FILE_PATH = `https://${STATIC_FILE_DOMAIN}${JSON_ROOT}`
    SITE_URL = 'https://staging.mirrordaily.news'
    break

  case ENVIRONMENT.DEVELOPMENT:
    STATIC_FILE_DOMAIN = 'statics-dev.mirrordaily.news'
    JSON_FILE_PATH = `https://${STATIC_FILE_DOMAIN}${JSON_ROOT}`
    SITE_URL = 'https://dev.mirrordaily.news'
    break

  default:
    STATIC_FILE_DOMAIN = 'statics-dev.mirrordaily.news'
    JSON_FILE_PATH = `https://${STATIC_FILE_DOMAIN}${JSON_ROOT}`
    SITE_URL = 'https://dev.mirrordaily.news'
    break
}

const URL_STATIC_POPULAR_NEWS = `${JSON_FILE_PATH}/popular.json`
const URL_STATIC_LATEST_NEWS = `${JSON_FILE_PATH}/latest_posts`
const URL_STATIC_SECTION_AND_CATEGORY = `${JSON_FILE_PATH}/sections-and-categories.json`
const URL_STATIC_FLASH_NEWS = `${JSON_FILE_PATH}/flash-news.json`
const URL_STATIC_EDITOR_CHOICE = `${JSON_FILE_PATH}/editor-choice.json`
const URL_STATIC_TOPIC = `${JSON_FILE_PATH}/topics.json`
const URL_STATIC_GAME = `${JSON_FILE_PATH}/games.json`
const URL_STATIC_LATEST_SHORTS = `${JSON_FILE_PATH}/latest-shorts.json`

const API_ENDPOINT = process.env.API_ENDPOINT ?? ''

export {
  ENV,
  API_ENDPOINT,
  URL_STATIC_POPULAR_NEWS,
  URL_STATIC_LATEST_NEWS,
  URL_STATIC_SECTION_AND_CATEGORY,
  URL_STATIC_FLASH_NEWS,
  URL_STATIC_EDITOR_CHOICE,
  URL_STATIC_TOPIC,
  URL_STATIC_GAME,
  URL_STATIC_LATEST_SHORTS,
  GCP_PROJECT_ID,
  FIXED_KEY_FOR_SECTION_SHORTS,
  SITE_URL,
}
