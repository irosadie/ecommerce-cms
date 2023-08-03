/* eslint-disable camelcase */
import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export type TabActiveProps = 'table' | 'chart'

const tabActive = atom<TabActiveProps>({
  key: 'tabActive',
  default: 'table',
  effects_UNSTABLE: [persistAtom],
})

export default tabActive
