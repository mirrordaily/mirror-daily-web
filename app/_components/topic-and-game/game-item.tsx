{
  /*
   * This component is currently not needed due to requirement changes.
   */
}
import NextLink from 'next/link'
import CustomImage from '@/shared-components/custom-image'
import type { Game } from '@/types/homepage'

export default function GameItem({ name, description, link, heroImage }: Game) {
  return (
    <NextLink
      href={link}
      target="_blank"
      className="group/game flex flex-row border-[#000928] pb-4 pt-[22px] lg:py-7"
    >
      <div className="flex grow flex-col gap-y-[14px] text-[#000928] group-hover/game:text-[#575D71] group-active/game:text-[#575D71]">
        <p className="line-clamp-1 text-base font-bold leading-normal md:text-lg lg:text-base">
          {name}
        </p>
        <p className="line-clamp-2 text-base font-medium leading-normal md:line-clamp-3 md:leading-6 lg:line-clamp-2 lg:text-sm lg:leading-normal">
          {description}
        </p>
      </div>
      <CustomImage
        className="ml-8 shrink-0 md:ml-6 md:self-end lg:self-start"
        images={heroImage.resized}
        imagesWebP={heroImage.resizedWebp}
        alt={name}
        width={88}
        height={88}
      />
    </NextLink>
  )
}
