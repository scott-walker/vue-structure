import { type StoreModule } from "@types"

// Экспортируем для модульной системы
export default (): StoreModule => {
  return {
    App: {
      id: "app",
      state: () => ({
        loading: false
      }),
      getters: {
        isLoading: (state: Record<string, unknown>) => state.loading
      },
      actions: {
        startLoading: function () {
          // @ts-expect-error - this context is provided by Store
          this.loading = true
        },
        stopLoading: function () {
          // @ts-expect-error - this context is provided by Store
          this.loading = false
        }
      }
    },
    User: {
      id: "user",
      state: () => ({
        name: "",
        isLogged: false
      }),
      getters: {
        getUserName: (state: Record<string, unknown>) => state.name,
        getIsLogged: (state: Record<string, unknown>) => state.isLogged
      },
      actions: {
        login: async function (loginData: { email: string; password: string }): Promise<void> {
          if (loginData.email === "admin" && loginData.password === "admin") {
            // @ts-expect-error - this context is provided by Store
            this.name = "Admin User"
            // @ts-expect-error - this context is provided by Store
            this.isLogged = true
          } else {
            throw new Error("Неверные учетные данные")
          }
        },
        logout: async function (): Promise<void> {
          // @ts-expect-error - this context is provided by Store
          this.name = ""
          // @ts-expect-error - this context is provided by Store
          this.isLogged = false
        }
      }
    }
  }
}
