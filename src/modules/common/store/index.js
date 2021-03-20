import appStore from "./app"

export default context => {
  return {
    App: appStore(context)
  }
}
