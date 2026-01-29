'use client'

import {
  type DableWidgetType,
  type DableCommand,
  DABLE_WIDGET_CONFIG,
} from '@/constants/ad'
import { useEffect, useState, useMemo } from 'react'
import { useWindowSize } from 'usehooks-ts'

declare global {
  interface Window {
    dable: (command: DableCommand, ...args: string[]) => void
    dableq?: unknown[][]
  }
}

type DableWidgetProps = {
  type: DableWidgetType
  customClasses?: string
}

export default function DableWidget({ type, customClasses }: DableWidgetProps) {
  const { width = 0 } = useWindowSize()
  const [shouldRender, setShouldRender] = useState(false)
  const config = DABLE_WIDGET_CONFIG[type]

  const isMobile = useMemo(() => width <= 768, [width])

  useEffect(() => {
    if (!width) setShouldRender(false)
    if (isMobile) {
      setShouldRender(config.device === 'mobile')
    } else {
      setShouldRender(config.device === 'pc')
    }
    if (config.device === 'both') setShouldRender(true)
  }, [isMobile, config, width])

  useEffect(() => {
    if (!shouldRender || typeof window.dable !== 'function') return
    window.dable(config.renderType, `dablewidget_${config.widgetId}`)
  }, [config, shouldRender])

  return (
    shouldRender && (
      <div key={`dable-widget-${type}-${config.widgetId}`}>
        <div
          id={`dablewidget_${config.widgetId}`}
          data-widget_id-pc={config.pcWidgetId}
          data-widget_id-mo={config.moWidgetId}
          className={customClasses}
        />
      </div>
    )
  )
}
