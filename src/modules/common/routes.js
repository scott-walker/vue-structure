import Home from "./views/Home"

/**
 * Получить маршруты в контексте
 */
export default () => {
  return [
    {
      path: "/",
      name: "Home",
      component: Home
    }
  ]
}
