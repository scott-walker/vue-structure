import appStore from "./app"
import userStore from "./user"

export default context => {
  return {
    App: appStore(context),
    User: userStore(context)
  }
}
