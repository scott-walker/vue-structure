# Vue Structure (Модульная архитектура)

Проект реализует модульную архитектуру на базе Vue 3, Vue Router, Pinia

### Core Technologies

![Vue.js](https://img.shields.io/badge/Vue.js-3.5.22-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3.0.3-FFD859?style=for-the-badge&logo=pinia&logoColor=white)
![Vue Router](https://img.shields.io/badge/Vue_Router-4.5.1-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)

## 🏗 Архитектурные принципы

### Модульность

- **Строгая изоляция** - каждый модуль самодостаточен
- **Нет глобальных views/stores** - все в модулях
- **Единая структура** - все модули следуют одинаковой структуре
- **Масштабируемость** - легко добавлять новые модули

### Типизация

- Полная типизация TypeScript
- Семантичные типы для всех компонентов
- Type safety на всех уровнях

![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Type Safety](https://img.shields.io/badge/Type%20Safety-Full-green?style=for-the-badge)
![Modular](https://img.shields.io/badge/Architecture-Modular-blue?style=for-the-badge)
![Isolation](https://img.shields.io/badge/Isolation-Strict-red?style=for-the-badge)

## 📁 Структура проекта

```
src/
├── components/           # Переиспользуемые компоненты
│   ├── UserPanel.vue    # Панель пользователя
│   ├── AppNavigation.vue # Навигация
│   ├── Breadcrumbs.vue  # Хлебные крошки
│   └── AppContent.vue   # Основной контент
├── modules/             # Модули приложения
│   ├── base/           # Базовый модуль
│   ├── app/            # Модуль приложения
│   ├── hello/          # Модуль приветствия
│   └── counter/        # Модуль счетчика
├── base/               # Ядро приложения
│   ├── Application.ts  # Главный класс
│   ├── Context.ts      # Система контекста
│   ├── Module.ts       # Базовый класс модуля
│   └── StoreManager.ts # Менеджер Store
├── utils/              # Утилиты
├── types/              # TypeScript типы
└── config/             # Конфигурация
```

## 🚀 Быстрый старт

### Установка зависимостей

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build
```

### Тестирование

```bash
# Unit тесты
npm run test:unit

# E2E тесты
npm run test:e2e

# Линтинг
npm run lint
```

## 📚 Факин докс (редко обновляется)

Подробная документация находится в папке `docs/`:

- **[Правила создания модулей](docs/module-creation-rules.md)** - подробное руководство по созданию модулей
- **[Технические детали](docs/technical-details.md)** - технические аспекты миграции

## 🎯 Создание модуля

### 1. Создание структуры

```bash
mkdir src/modules/my-module
mkdir src/modules/my-module/views
mkdir src/modules/my-module/components
```

### 2. Базовые файлы

- `index.ts` - экспорт модуля
- `routes.ts` - маршруты модуля
- `store.ts` - stores модуля
- `depends.ts` - зависимости модуля

### 3. Регистрация модуля

Добавить в `src/modules/index.js`:

```javascript
import myModule from "./my-module"
export default [base, app, hello, counter, myModule]
```

## Основные компоненты (core)

### Application

Главный класс приложения, управляющий инициализацией Vue, маршрутизацией и stores.

### Context

Система контекста для внедрения зависимостей между модулями.

### Module

Базовый класс для всех модулей приложения.

### StoreManager

Менеджер для работы с абстрактной системой Store в модульной архитектуре.

### Декомпозированные компоненты

- **UserPanel** - панель пользователя с авторизацией
- **AppNavigation** - навигационное меню
- **Breadcrumbs** - хлебные крошки
- **AppContent** - основной контент с роутингом

## Примеры модулей

### Простой модуль (base)

- Только маршруты
- Базовые зависимости

### Модуль с store (hello)

- Маршруты
- Простой store
- Views

### Полнофункциональный модуль (counter)

- Маршруты
- Store с состоянием
- Views и компоненты
- Зависимости

## Ключевые особенности

- **Модульная архитектура** - каждый модуль изолирован и самодостаточен
- **TypeScript** - полная типизация на всех уровнях приложения
- **Vue 3 Composition API** - современный подход к разработке компонентов
- **Абстрактная система Store** - универсальное управление состоянием
- **Context API** - система внедрения зависимостей между модулями
- **Декомпозированные компоненты** - переиспользуемые UI элементы
- **Умная навигация** - с хлебными крошками и активными состояниями
- **Масштабируемость** - легко добавлять новые модули и функции
- **Производительность** - оптимизированная сборка с Vite

## 🚀 Преимущества архитектуры

### Для разработчиков

- **Быстрая разработка** - модули можно разрабатывать независимо
- **Легкое тестирование** - каждый модуль тестируется изолированно
- **Переиспользование** - компоненты и логика легко переиспользуются
- **Типобезопасность** - TypeScript предотвращает ошибки на этапе разработки

### Для проекта

- **Масштабируемость** - легко добавлять новые функции и модули
- **Поддерживаемость** - четкое разделение ответственности
- **Производительность** - оптимизированная загрузка и рендеринг
- **Гибкость** - возможность замены отдельных частей системы

## 🚫 Архитектурные ограничения

- **Нет глобальных views** - все views должны быть в модулях
- **Нет глобальных stores** - все stores должны быть в модулях
- **Модульная изоляция** - модули не должны напрямую обращаться друг к другу
- **Context для взаимодействия** - использование Context API для обмена данными

## 🛠 Технологический стек

### Frontend

- **Vue 3** - современный фреймворк с Composition API
- **TypeScript** - строгая типизация на всех уровнях
- **Vite** - быстрая сборка и разработка
- **CSS3** - современные стили без препроцессоров

### State Management

- **Абстрактная система Store** - универсальное управление состоянием
- **Совместимость с Pinia** - возможность использования Pinia под капотом

### Архитектура

- **Модульная система** - изолированные модули приложения
- **Context API** - система внедрения зависимостей
- **Декомпозированные компоненты** - переиспользуемые UI элементы

## Лицензия

![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Made with](https://img.shields.io/badge/made%20with-Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
