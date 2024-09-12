import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing

import { SortType } from '../../server/api/posts/routes'

interface ReckonState {
  sort: SortType
  changeSort: (to: SortType) => void
}

export const useBearStore = create<ReckonState>()(
  devtools(
    persist(
      (set) => ({
        sort: "top",
        changeSort: (to) => set((state) => ({ sort: to})),
      }),
      {
        name: 'reckon-storage',
      },
    ),
  ),
)