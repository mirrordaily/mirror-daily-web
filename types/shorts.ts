import type { SHORTS_TYPE } from './common'

export type ShortsData = {
  id: string
  name: string
  state: string
  contributor: string
  videoSection: SHORTS_TYPE
  tagId?: string
}

export enum FormState {
  Default = 'default',
  Success = 'success',
  Fail = 'fail',
}

export type FormActionResponse =
  | {
      state: FormState.Default
    }
  | {
      state: FormState.Success
    }
  | {
      state: FormState.Fail
      errors: Record<string, string[]>
    }

export enum FormProgress {
  Initial = 'initial',
  FileInfo = 'file-info',
  PersonInfo = 'person-info',
}
