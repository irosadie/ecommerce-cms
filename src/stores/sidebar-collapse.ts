/* eslint-disable camelcase */
import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export type SidebarCollapsedProps = boolean

const sidebarCollapsed = atom<SidebarCollapsedProps>({
  key: 'collapsed',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export default sidebarCollapsed
