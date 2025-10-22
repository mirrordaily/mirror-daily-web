import { ENVIRONMENT } from '@/constants/misc'
import { ENV } from './config'

/**
 * 熱門新聞來自 GA 流量最高的文章。
 * 用於暫時隱藏長期佔據 GA 流量榜的文章。
 * 若之後資料來源邏輯修改，此段程式碼可刪除。
 */
const prodHiddenIds = ['17836', '19377', '20037']

export const hiddenPopularPostIds =
  ENV === ENVIRONMENT.PRODUCTION ? prodHiddenIds : []
