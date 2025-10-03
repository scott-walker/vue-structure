import Module from "../../core/Module"
import routes from "./routes"
import store from "./store"
import dependencies from "./depends"

export default new Module("hello", () => {
  return {
    routes,
    store,
    dependencies
  }
})
