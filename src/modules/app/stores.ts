import { defineStore } from "pinia"

// App Store - управление состоянием приложения
export const useAppStore = defineStore("app", {
  state: () => ({
    loading: false
  }),
  getters: {
    isLoading: state => state.loading
  },
  actions: {
    startLoading() {
      this.loading = true
    },
    stopLoading() {
      this.loading = false
    }
  }
})

// User Store - управление пользователями
export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
    isLogged: false
  }),
  getters: {
    getUserName: state => state.name,
    getIsLogged: state => state.isLogged
  },
  actions: {
    async login(loginData: { email: string; password: string }): Promise<void> {
      // Простая имитация логина
      if (loginData.email === "admin" && loginData.password === "admin") {
        this.name = "Admin User"
        this.isLogged = true
      } else {
        throw new Error("Неверные учетные данные")
      }
    },
    async logout(): Promise<void> {
      this.name = ""
      this.isLogged = false
    }
  }
})
