import type { SharedApi, IModule, UtilsApi } from "@types"
import { UserService } from "./services/UserService"

/**
 * Общедоступный API модуля "user"
 */
export const initShared: IModule["initShared"] = ({ useShared }): SharedApi => {
  const { httpClient, localStorage } = useShared<UtilsApi>("utils")
  const userService = new UserService(httpClient, localStorage)

  return {
    userService
  }
}
