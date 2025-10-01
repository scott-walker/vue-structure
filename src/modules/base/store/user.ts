import { type StoreModule } from "@types"
import UserService from "../services/UserService"

interface LoginData {
  email: string
  password: string
}

export default ({ invoke }: { invoke: (address: string) => unknown }): StoreModule => {
  const userService = invoke("@base/services/UserService") as UserService
  const user = userService.getUser()

  return {
    User: {
      id: "user",
      state: () => ({
        email: user.email || null,
        token: user.token || null
      }),
      getters: {
        /**
         * Имя пользователя
         * @param state состояние
         * @return имя пользователя
         */
        name: (state: Record<string, unknown>) => state.email || "Гость",

        /**
         * Токен
         * @param state состояние
         * @return токен
         */
        token: (state: Record<string, unknown>) => state.token,

        /**
         * Пользователь залогинен
         * @param state состояние
         * @return статус авторизации
         */
        isLogged: (state: Record<string, unknown>) => !!state.token
      },
      actions: {
        /**
         * Логинеться
         * @param loginData данные для входа
         */
        login: async function(loginData: LoginData): Promise<void> {
          const token = await userService.login(loginData.email, loginData.password)

          // @ts-expect-error - this context is provided by Store
          this.email = loginData.email
          // @ts-expect-error - this context is provided by Store
          this.token = token
        },

        /**
         * Разлогинеться
         */
        logout: async function(): Promise<void> {
          await userService.logout()

          // @ts-expect-error - this context is provided by Store
          this.email = null
          // @ts-expect-error - this context is provided by Store
          this.token = null
        }
      }
    }
  }
}
