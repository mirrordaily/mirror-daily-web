import { useGetSportsEventsQuery } from '@/redux/sports-events/api'
import type { SportsGameData } from '@/types/homepage'

interface UseSportsEventsRTKOptions {
  /** Initial data to use while loading (typically from SSR) */
  initialData?: SportsGameData[]
  /** Polling interval in milliseconds (default: 3000) */
  pollingInterval?: number
  /** Whether to skip polling when tab is unfocused (default: true) */
  skipPollingIfUnfocused?: boolean
  /** Enable fetching; when false, skip initial fetch/polling */
  enabled?: boolean
}

export const useSportsEventsRTK = (options: UseSportsEventsRTKOptions = {}) => {
  const {
    initialData = [],
    pollingInterval = 3000,
    skipPollingIfUnfocused = true,
    enabled = true,
  } = options

  const {
    data = initialData,
    error,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    refetch,
  } = useGetSportsEventsQuery(undefined, {
    pollingInterval: enabled ? pollingInterval : 0,
    skipPollingIfUnfocused,
    refetchOnMountOrArgChange: true,
    skip: !enabled,
  })

  return {
    data,
    error,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    refetch,
    isPolling: pollingInterval > 0,
  }
}
