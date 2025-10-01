# Правила создания модулей

## 🏗 Принципы модульной архитектуры

### Основные правила:

1. **Нет глобальных views** - все views только в модулях
2. **Нет глобальных stores** - все stores только в модулях
3. **Все маршруты в модулях** - каждый модуль управляет своими маршрутами
4. **Модульная изоляция** - каждый модуль самодостаточен
5. **Единая структура** - все модули следуют одинаковой структуре

## 📁 Структура модуля

Каждый модуль должен иметь следующую структуру:

```
src/modules/[module-name]/
├── index.ts                    # Экспорт модуля
├── routes.ts                   # Маршруты модуля
├── store.ts                    # Stores модуля
├── depends.ts                  # Зависимости модуля
├── views/                      # Страницы модуля
│   └── [ViewName].vue
├── components/                 # Компоненты модуля
│   └── [ComponentName].vue
└── services/                   # Сервисы модуля (опционально)
    └── [ServiceName].ts
```

## 📝 Создание нового модуля

### 1. Создание базовой структуры

```bash
mkdir src/modules/my-module
mkdir src/modules/my-module/views
mkdir src/modules/my-module/components
mkdir src/modules/my-module/services
```

### 2. Создание index.ts

```typescript
import Module from "@base/Module"
import routes from "./routes"
import store from "./store"
import dependencies from "./depends"

export default new Module("my-module", { routes, store, dependencies })
```

### 3. Создание routes.ts

```typescript
import { type RouteRecordRaw } from "vue-router"
import MyView from "./views/MyView.vue"

export default ({ invoke }: { invoke: (address: string) => unknown }): RouteRecordRaw[] => {
  const accessManager = invoke("@utils/AccessManager") as { isLogged: () => boolean }

  return [
    {
      path: "/my-module",
      name: "MyModule",
      component: MyView,
      beforeEnter: (to, from, next) => {
        if (accessManager.isLogged()) {
          next()
        } else {
          next({ name: "login" })
        }
      }
    }
  ]
}
```

### 4. Создание store.ts

```typescript
import { defineStore } from "pinia"
import { type PiniaStoreModule } from "@types"

// Создаем store с помощью defineStore
export const useMyModuleStore = defineStore("my-module", {
  state: () => ({
    data: []
  }),
  getters: {
    getData: state => state.data
  },
  actions: {
    setData(data: unknown[]) {
      this.data = data
    }
  }
})

// Экспортируем для модульной системы
export default (): PiniaStoreModule => {
  return {
    MyModule: {
      id: "my-module",
      state: () => ({
        data: []
      }),
      getters: {
        getData: state => state.data
      },
      actions: {
        setData(data: unknown[]) {
          this.data = data
        }
      }
    }
  }
}
```

### 5. Создание depends.ts

```typescript
// Зависимости модуля
export default ({ invoke }: { invoke: (address: string) => unknown }) => {
  const httpClient = invoke("@utils/HttpClient")

  return {
    "@my-module/services/MyService": () => new MyService(httpClient)
  }
}
```

### 6. Создание views/MyView.vue

```vue
<template>
  <div class="my-view">
    <h1>{{ title }}</h1>
    <MyComponent />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useMyModuleStore } from "../store"
import MyComponent from "../components/MyComponent.vue"

// Имя компонента
defineOptions({
  name: "MyView"
})

// Используем store модуля
const myModuleStore = useMyModuleStore()

// Computed свойства
const title = computed(() => "My Module")
</script>

<style scoped>
.my-view {
  padding: 2rem;
}
</style>
```

### 7. Создание components/MyComponent.vue

```vue
<template>
  <div class="my-component">
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useMyModuleStore } from "../store"

// Имя компонента
defineOptions({
  name: "MyComponent"
})

// Используем store модуля
const myModuleStore = useMyModuleStore()

// Computed свойства
const message = computed(() => "Hello from MyComponent")
</script>

<style scoped>
.my-component {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;
}
</style>
```

### 8. Регистрация модуля

Добавить модуль в `src/modules/index.js`:

```javascript
import myModule from "./my-module"

export default [base, app, hello, counter, myModule]
```

## 🎯 Правила именования

### Файлы и папки:

- **Модули**: `kebab-case` (например: `my-module`)
- **Компоненты**: `PascalCase` (например: `MyComponent.vue`)
- **Views**: `PascalCase` (например: `MyView.vue`)
- **Stores**: `camelCase` (например: `useMyModuleStore`)

### Store ID:

- Store ID должен совпадать с именем модуля
- Использовать `kebab-case` (например: `"my-module"`)

### Маршруты:

- **path**: `/module-name` (например: `/my-module`)
- **name**: `PascalCase` (например: `MyModule`)

## 🔧 Типизация

### Обязательные типы:

- Все функции должны иметь типы параметров и возвращаемых значений
- Использовать `defineOptions` для имен компонентов
- Типизировать все computed свойства и методы

### Примеры типизации:

```typescript
// Store actions
async login(loginData: { email: string; password: string }): Promise<void>

// Component methods
const updateData = (): void => { /* ... */ }

// Computed properties
const data = computed(() => store.getData)
```

## 🚫 Запрещенные практики

### Нельзя:

- Создавать файлы в `src/views/` или `src/components/`
- Создавать stores в `src/stores/`
- Использовать глобальные переменные между модулями
- Прямые импорты между модулями (использовать Context)

### Можно:

- Создавать модули в `src/modules/`
- Использовать Context для обмена данными между модулями
- Создавать переиспользуемые утилиты в `src/utils/`

## 📋 Чек-лист создания модуля

- [ ] Создана папка модуля в `src/modules/`
- [ ] Создан `index.ts` с экспортом модуля
- [ ] Создан `routes.ts` с маршрутами
- [ ] Создан `store.ts` с stores
- [ ] Создан `depends.ts` с зависимостями
- [ ] Созданы views в папке `views/`
- [ ] Созданы компоненты в папке `components/`
- [ ] Все файлы типизированы
- [ ] Модуль зарегистрирован в `modules/index.js`
- [ ] Протестирована функциональность

## 🔄 Обновление существующих модулей

При обновлении модуля:

1. Сохранить структуру папок
2. Обновить типизацию
3. Проверить совместимость с Context
4. Обновить документацию
5. Протестировать изменения

## 📚 Примеры модулей

### Простой модуль (только view):

- `base` - базовый модуль с маршрутами

### Модуль с store:

- `app` - модуль с глобальными stores
- `hello` - модуль с простым store

### Полнофункциональный модуль:

- `counter` - модуль с store, views, components

## 🎉 Заключение

Следование этим правилам обеспечивает:

- **Консистентность** архитектуры
- **Масштабируемость** проекта
- **Легкость поддержки** кода
- **Изоляцию** модулей
- **Переиспользование** компонентов
