import type { StoredState } from "@types"
import type { Ref } from "vue"

/**
 * Хранилище состояния модуля "user"
 */
export type UserStore = StoredState & {
  name: Ref<string>
  isLogged: Ref<boolean>
  loading: Ref<boolean>
  startLoading: () => void
  stopLoading: () => void
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}
