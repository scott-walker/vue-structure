import Module from "@base/Module"
import routes from "./routes"
import store from "./store"
import dependencies from "./depends"

export default new Module("counter", { routes, store, dependencies })
