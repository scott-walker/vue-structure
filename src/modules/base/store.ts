import { type StoreModule } from "@types"

export default (): StoreModule => {
  return {
    Base: {
      id: "base",
      state: () => ({
        // Состояние базового модуля
      }),
      getters: {
        // Геттеры базового модуля
      },
      actions: {
        // Действия базового модуля
      }
    }
  }
}
