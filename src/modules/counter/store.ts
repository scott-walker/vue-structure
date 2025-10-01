import { defineStore } from "pinia"
import { type StoreModule } from "@types"

// Создаем store с помощью defineStore
export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
    message: "Counter Module"
  }),
  getters: {
    getCount: state => state.count,
    getMessage: state => state.message,
    getDoubleCount: state => state.count * 2,
    getIsEven: state => state.count % 2 === 0
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    reset() {
      this.count = 0
    },
    setCount(value: number) {
      this.count = value
    },
    setMessage(message: string) {
      this.message = message
    }
  }
})

// Экспортируем для модульной системы
export default (): StoreModule => {
  return {
    Counter: {
      id: "counter",
      state: () => ({
        count: 0,
        message: "Counter Module"
      }),
      getters: {
        getCount: state => state.count,
        getMessage: state => state.message,
        getDoubleCount: state => state.count * 2,
        getIsEven: state => state.count % 2 === 0
      },
      actions: {
        increment() {
          this.count++
        },
        decrement() {
          this.count--
        },
        reset() {
          this.count = 0
        },
        setCount(value: number) {
          this.count = value
        },
        setMessage(message: string) {
          this.message = message
        }
      }
    }
  }
}
