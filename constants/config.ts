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

let STATIC_FILE_DOMAIN: string
let URL_STATIC_POPULAR_NEWS: string
let URL_STATIC_LATEST_NEWS: string

const ENV = (function () {
  const env = process.env.NEXT_PUBLIC_ENV

  if (!env) return ENVIRONMENT.LOCAL
  else if (Object.values(ENVIRONMENT).includes(env as ENVIRONMENT)) {
    return env as ENVIRONMENT
  }
  return ENVIRONMENT.LOCAL
})()

const GCP_PROJECT_ID = 'mirrordaily'

switch (ENV) {
  case ENVIRONMENT.DEVELOPMENT:
    STATIC_FILE_DOMAIN = 'v3-statics-dev.mirrormedia.mg'
    URL_STATIC_POPULAR_NEWS = `https://${STATIC_FILE_DOMAIN}/files/json/popular.json`
    URL_STATIC_LATEST_NEWS = `https://${STATIC_FILE_DOMAIN}/files/json/post_external`
    break

  default:
    STATIC_FILE_DOMAIN = 'v3-statics-dev.mirrormedia.mg'
    URL_STATIC_POPULAR_NEWS = `https://${STATIC_FILE_DOMAIN}/files/json/popular.json`
    URL_STATIC_LATEST_NEWS = `https://${STATIC_FILE_DOMAIN}/files/json/post_external`
}

const API_ENDPOINT = process.env.API_ENDPOINT ?? ''

export {
  ENV,
  API_ENDPOINT,
  URL_STATIC_POPULAR_NEWS,
  URL_STATIC_LATEST_NEWS,
  GCP_PROJECT_ID,
}
