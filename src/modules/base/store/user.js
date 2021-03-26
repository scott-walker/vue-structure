export default ({ invoke }) => {
  const userService = invoke("@base/services/UserService")
  const user = userService.getUser()

  return {
    state: {
      email: user.email || null,
      token: user.token || null
    },
    getters: {
      /**
       * Имя пользователя
       * @param {Object} state
       * @return {String}
       */
      name(state) {
        return state.email || "Гость"
      },

      /**
       * Токен
       * @param {Object} state
       * @return {String}
       */
      token(state) {
        return state.token
      },

      /**
       * Пользователь залогинен
       * @param {Object} state
       * @return {Boolean}
       */
      isLogged(state) {
        return !!state.token
      }
    },
    mutations: {
      /**
       * Установить имя
       * @param {Object} state
       * @param {String} email
       */
      setEmail(state, email) {
        state.email = email
      },

      /**
       * Установить токен
       * @param {Object} state
       * @param {String} email
       */
      setToken(state, token) {
        state.token = token
      }
    },
    actions: {
      /**
       * Логинеться
       * @param {Object} context
       * @param {Object} params
       */
      async login({ commit }, { email, password }) {
        const token = await userService.login(email, password)

        commit("setEmail", email)
        commit("setToken", token)
      },

      /**
       * Разлогинеться
       * @param {Object} context
       */
      async logout({ commit }) {
        await userService.logout()

        commit("setEmail", null)
        commit("setToken", null)
      }
    }
  }
}
