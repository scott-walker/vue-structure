import Module from "@base/Module"
import routes from "./routes"
import store from "./store"

return new Module("common", { routes, store })
