/**
 * 環境變數設定
 *
 * 前綴含 `NEXT_PUBLIC_` - build 時寫入，無法在 runtime 設定
 * 前綴不含 `NEXT_PUBLIC_` - runtime 時可被設定
 *
 * 參考：https://paper.dropbox.com/doc/--CQb4squ7BM_WCI1h96LWcZ8IAg-1sRvBsDLCqGg7F4G9mIuI
 */

import { ENVIRONMENT } from './misc'

const ENV = (function () {
  const env = process.env.NEXT_PUBLIC_ENV

  if (!env) return ENVIRONMENT.LOCAL
  else if (Object.values(ENVIRONMENT).includes(env as ENVIRONMENT)) {
    return env as ENVIRONMENT
  }
  return ENVIRONMENT.LOCAL
})()

const API_ENDPOINT = process.env.API_ENDPOINT ?? ''

export { ENV, API_ENDPOINT }
