import 'server-only'
import { MINUTE } from '@/constants/time-unit'
import { fetchSectionsAndCategories } from '@/app/actions-general'
import { DEFAULT_SECTION_COLOR } from '@/constants/misc'
class SectionColorManager {
  private lastTime = 0
  private cacheTime = MINUTE * 5
  private defaultColor = DEFAULT_SECTION_COLOR
  private data: Awaited<ReturnType<typeof fetchSectionsAndCategories>>

  constructor() {
    this.data = []

    // prevent reference error during initilization
    setTimeout(() => this.updateData(), 10)
  }

  async updateData() {
    const result = await fetchSectionsAndCategories()
    this.lastTime = new Date().valueOf()
    this.data = result
  }

  async getColor(sectionSlug?: string): Promise<string> {
    if (!sectionSlug) return this.defaultColor

    const now = new Date().valueOf()

    if (now - this.lastTime > this.cacheTime) {
      await this.updateData()
    }

    return (
      this.data.find((item) => sectionSlug === item.slug)?.color ??
      this.defaultColor
    )
  }
}

export const colorManger = new SectionColorManager()
