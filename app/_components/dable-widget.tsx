'use client'

import {
  type DableWidgetType,
  type DableCommand,
  DABLE_PROD_WIDGET_CONFIG,
  DABLE_DEV_WIDGET_CONFIG,
} from '@/constants/ad'
import { ENV } from '@/constants/config'
import { useEffect, useState } from 'react'
import useWindowDimensions from '@/hooks/use-window-dimensions'

declare global {
  interface Window {
    dable: (command: DableCommand, ...args: string[]) => void
    dableq?: unknown[][]
  }
}

type DableWidgetProps = {
  type: DableWidgetType
  className?: string
}

export default function DableWidget({ type, className }: DableWidgetProps) {
  const { width } = useWindowDimensions()
  const [shouldRender, setShouldRender] = useState(false)
  const isProd = ENV === 'prod'
  const config = isProd
    ? DABLE_PROD_WIDGET_CONFIG[type]
    : DABLE_DEV_WIDGET_CONFIG[type]

  useEffect(() => {
    if (config.device === 'both') setShouldRender(true)
    if (!width) setShouldRender(false)
    const isMobile = (width ?? 0) <= 768
    if (isMobile) {
      setShouldRender(config.device === 'mobile')
    } else {
      setShouldRender(config.device === 'pc')
    }
    console.log('shouldRender', shouldRender)
  }, [width])

  return (
    shouldRender && (
      <div key={`dable-widget-${type}-${config.widgetId}`}>
        <div
          id={`dablewidget_${config.widgetId}`}
          data-widget_id={config.widgetId}
          data-widget_id-pc={config.pcWidgetId}
          data-widget_id-mo={config.moWidgetId}
          className={className}
        />
        <script />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              dable('setService', 'mirrordaily.news');
              ${isProd ? "dable('sendLogOnce');" : ''}
              dable('${config.renderType}', 'dablewidget_${config.widgetId}');
            `,
          }}
        />
      </div>
    )
  )
}
