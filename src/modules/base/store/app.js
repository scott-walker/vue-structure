export default () => {
  return {
    state: {
      loading: false
    },
    getters: {
      /**
       * Идет загрузка
       * @param {Object} state
       * @return {Boolean}
       */
      loading(state) {
        return state.loading
      }
    },
    mutations: {
      /**
       * Установить статус загрузки
       * @param {Object} state
       * @param {Boolean} loading
       */
      setLoading(state, loading) {
        state.loading = loading
      }
    },
    actions: {
      /**
       * Стартовать режим загрузки
       * @param {Object} context
       */
      startLoading({ commit }) {
        commit("setLoading", true)
      },

      /**
       * Остановить режим загрузки
       * @param {Object} context
       */
      stopLoading({ commit }) {
        commit("setLoading", false)
      }
    }
  }
}
