/** Alert: no imports is allowed in this file */

const IS_PREVIEW_MODE = process.env.NEXT_PUBLIC_IS_PREVIEW_MODE === 'true'
// should be applied in preview mode
const SITE_BASE_PATH = IS_PREVIEW_MODE ? '/preview-server' : ''

export { IS_PREVIEW_MODE, SITE_BASE_PATH }
