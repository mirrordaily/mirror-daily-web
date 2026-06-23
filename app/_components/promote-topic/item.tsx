import type { PromoteTopicData } from '@/types/homepage'
import CustomImage from '@/shared-components/custom-image'
import { getTopicPageUrl } from '@/utils/site-urls'

type Props = {
  post: PromoteTopicData
}

export default function PromoteTopicItem({ post }: Props) {
  if (!post.topics) return null

  const { name, slug, heroImage } = post.topics

  return (
    <a href={getTopicPageUrl(slug)} className="block" target="_blank">
      <div className="relative w-[124px] overflow-hidden rounded-[10px] bg-mirror-blue-700">
        <div className="aspect-[3/2]">
          <CustomImage
            images={heroImage.resized}
            alt={`推廣專題-${name}`}
            className="size-full object-cover"
          />
        </div>
        <div className="h-14">
          <p className="line-clamp-1 px-3 pt-[10px] text-base font-medium leading-[1.2] text-mirror-blue-200">
            {name}
          </p>
        </div>
      </div>
    </a>
  )
}
