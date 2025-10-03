import { ref } from "vue"
import type { StoredApi } from "@types"
import type { UserStore } from "./types"

/**
 * Хранилище состояния модуля "user"
 */
export const initStored = (): StoredApi<UserStore> => {
  const name = ref("")
  const isLogged = ref(false)
  const loading = ref(false)

  /**
   * Начать загрузку
   */
  const startLoading = () => {
    loading.value = true
  }

  /**
   * Остановить загрузку
   */
  const stopLoading = () => {
    loading.value = false
  }

  /**
   * Логинить пользователя
   * @param data данные для входа
   */
  const login = async function (email: string, password: string): Promise<void> {
    startLoading()

    await new Promise(resolve => setTimeout(resolve, 1000))

    if (email === "admin" && password === "admin") {
      name.value = "Admin User"
      isLogged.value = true
    } else {
      throw new Error("Неверные учетные данные")
    }

    stopLoading()
  }

  /**
   * Разлогинить пользователя
   */
  const logout = async function (): Promise<void> {
    startLoading()

    await new Promise(resolve => setTimeout(resolve, 1000))

    name.value = ""
    isLogged.value = false

    stopLoading()
  }

  return {
    name,
    isLogged,
    loading,
    startLoading,
    stopLoading,
    login,
    logout
  }
}
