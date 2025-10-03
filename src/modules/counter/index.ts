import Module from "../../core/Module"
import routes from "./routes"
import store from "./store"
import dependencies from "./depends"

export const counterModule = new Module({
  id: "counter",
  routes,
  store,
  sharedApi: ({ textService }) => {
    return {}
  }
})
