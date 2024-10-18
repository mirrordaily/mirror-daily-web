import type { Organization } from '../types'

// TODO: Retain readr incase it becomes an external partner
const sourceCustomIdToOrganization: Record<string, Organization> = {
  mirrormedia: 'mirror-media',
  readr: 'readr-media',
}

export function getOrganizationFromSourceCustomId(sourceCustomId: string) {
  return sourceCustomIdToOrganization[sourceCustomId]
}
