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
      <div className="relative w-[75px] overflow-hidden rounded-[10px] bg-mirror-blue-700 shadow-[0_2.47px_2.47px_0_#00000040] lg:w-[120px]">
        <div className="aspect-[74/74] lg:aspect-[120/120]">
          <CustomImage
            images={heroImage.resized}
            alt={`推廣專題-${name}`}
            className="size-full object-cover"
          />
        </div>
        <div className="h-10 lg:h-16">
          <p className="line-clamp-2 px-[7px] pt-[2px] text-[10px] font-medium leading-[1.2] text-mirror-blue-200 lg:pt-[5px] lg:text-base lg:leading-[1.2]">
            {name}
          </p>
        </div>
      </div>
    </a>
  )
}
