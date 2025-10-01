import { type StoreModule } from "@types"

export default (): StoreModule => {
  return {
    App: {
      id: "app",
      state: () => ({
        loading: false
      }),
      getters: {
        /**
         * Идет загрузка
         * @param state состояние
         * @return статус загрузки
         */
        loading: (state: Record<string, unknown>) => state.loading
      },
      actions: {
        /**
         * Стартовать режим загрузки
         */
        startLoading: function() {
          // @ts-expect-error - this context is provided by Store
          this.loading = true
        },

        /**
         * Остановить режим загрузки
         */
        stopLoading: function() {
          // @ts-expect-error - this context is provided by Store
          this.loading = false
        }
      }
    }
  }
}
