<template>
  <div class="application">
    <div class="application__user">
      <div class="application__user-panel user-panel" v-if="isLogged">
        <span class="user-panel__name">{{ name }}</span>
        <button class="user-panel__buttom" @click="onLogout()">Выйти</button>
      </div>

      <div class="application__user-form user-form" v-else>
        <div class="user-form__form">
          <div class="user-form__fields">
            <input class="user-form__field" type="text" v-model="email" />
            <input class="user-form__field" type="text" v-model="password" />
          </div>
          <div v-if="error" class="user-form__error">{{ error }}</div>
        </div>

        <button class="user-form__buttom" @click="onLogin()">Войти</button>
      </div>

      <div v-show="loading" class="application__user-loader">Идет загрузка...</div>
    </div>

    <nav v-if="isLogged" class="application__nav">
      <router-link class="application__nav-item" :to="{ name: 'Home' }">Home</router-link>
      <router-link class="application__nav-item" :to="{ name: 'Hello' }">Hello</router-link>
    </nav>

    <div class="application__content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "App",
  data() {
    return {
      email: "",
      password: "",
      error: null
    }
  },
  computed: {
    ...mapGetters("App", ["loading"]),
    ...mapGetters("User", ["name", "isLogged"])
  },
  methods: {
    ...mapActions("App", ["startLoading", "stopLoading"]),
    ...mapActions("User", ["login", "logout"]),

    /**
     * Обработать логин
     */
    async onLogin() {
      this.error = null
      this.startLoading()

      try {
        await this.login({ email: this.email, password: this.password })
      } catch (message) {
        this.error = message
      }

      this.stopLoading()
    },

    /**
     * Обработать логаут
     */
    async onLogout() {
      this.startLoading()

      await this.logout()

      this.stopLoading()
    }
  }
}
</script>

<style lang="scss">
@import "@assets/index";

.application {
  width: 100vw;
  height: 100vh;

  &__nav {
    padding: 10px;

    &-item {
      margin-right: 10px;
      color: $primary-color;
    }
  }

  &__user {
    display: flex;
    align-items: center;
    padding: 10px;
    background: #f3f3f3;

    .user-panel {
      &__name {
        margin-right: 10px;
      }
      &__buttom {
        @include button();
      }
    }

    .user-form {
      display: flex;
      align-items: flex-start;

      &__fields {
        display: flex;
        align-items: center;
      }
      &__error {
        padding: 5px;
        font-size: 12px;
        color: $danger-color;
      }
      &__field {
        margin-right: 20px;
        @include field();
      }
      &__buttom {
        @include button();
      }
    }

    &-loader {
      margin: 0 20px;
      font-size: 12px;
      font-weight: bold;
      color: $primary-color;
    }
  }

  &__content {
    padding: 10px;
  }
}
</style>
