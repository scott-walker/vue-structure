import { type StoreModule } from "@types"
import appStore from "./app"
import userStore from "./user"

export default (context: { invoke: (address: string) => unknown }): StoreModule => {
  const appModule = appStore()
  const userModule = userStore(context)

  return {
    ...appModule,
    ...userModule
  }
}
