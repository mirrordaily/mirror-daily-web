import 'server-only'
import { MINUTE } from '@/constants/time-unit'
import { fetchSectionsAndCategories } from '@/app/actions-general'

class SectionColorManager {
  private lastTime = 0
  private cacheTime = MINUTE * 5
  private defaultColor = '#D0D2D8'
  private data: Awaited<ReturnType<typeof fetchSectionsAndCategories>>

  constructor() {
    this.data = []
    this.updateData()
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
