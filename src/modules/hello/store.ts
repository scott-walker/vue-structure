import type UserService from "@modules/user/services/UserService"
import { type Store } from "../../types/old"
import { ref } from "vue"

/**
 * Интерфейс состояния
 */
interface HelloState {
  message: string
  count: number
}

/**
 * Интерфейс гетеров
 */
interface HelloGetters {
  getMessage: (state: HelloState) => string
  getCount: (state: HelloState) => number
  getDoubleCount: (state: HelloState) => number
}

/**
 * Интерфейс экшенов
 */
interface HelloActions {
  setMessage: (message: string) => void
  increment: () => void
  decrement: () => void
  reset: () => void
}

/**
 * Конфигурация store для модуля "hello"
 */
export const oldStore = (): Store<HelloState, HelloGetters, HelloActions> => ({
  id: "hello",
  state: () => ({
    message: "Hello from Store!",
    count: 0
  }),
  getters: {
    getMessage: (state: HelloState) => state.message,
    getCount: (state: HelloState) => state.count,
    getDoubleCount: (state: HelloState) => state.count * 2
  },
  actions: {
    setMessage(message: string) {
      this.message = message
    },
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    reset() {
      this.count = 0
    }
  }
})

/**
 * Конфигурация store для модуля "hello"
 */
export const store = ({ userService }: { userService: UserService }) => {
  const message = ref("Hello from Store!")
  const count = ref(0)

  return {
    message,
    count
  }
}
