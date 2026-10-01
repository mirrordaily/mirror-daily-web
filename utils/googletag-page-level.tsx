'use client'
import { type PropsWithChildren, useEffect } from 'react'

type GoogleTagPageLevelProps =
  PropsWithChildren<googletag.config.PageSettingsConfig>

export function GoogleTagPageLevel({
  children,
  ...config
}: GoogleTagPageLevelProps) {
  const configKey = JSON.stringify(config)

  useEffect(() => {
    googletag.cmd.push(() => {
      googletag.setConfig(config)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configKey])

  return children
}
