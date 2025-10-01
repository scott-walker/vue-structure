import { defineStore } from "pinia"
import { type StoreModule } from "@types"

// Создаем store с помощью defineStore
export const useHelloStore = defineStore("hello", {
  state: () => ({
    message: "Hello from Store!",
    count: 0
  }),
  getters: {
    getMessage: state => state.message,
    getCount: state => state.count,
    getDoubleCount: state => state.count * 2
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

// Экспортируем для модульной системы
export default (): StoreModule => {
  return {
    Hello: {
      id: "hello",
      state: () => ({
        message: "Hello from Store!",
        count: 0
      }),
      getters: {
        getMessage: state => state.message,
        getCount: state => state.count,
        getDoubleCount: state => state.count * 2
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
    }
  }
}
