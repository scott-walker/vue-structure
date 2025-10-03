import type { SharedApi, ModuleInitShared, UtilsApi } from "@types"
import { UserService } from "./services/UserService"

/**
 * Общедоступный API модуля "user"
 */
export const initShared: ModuleInitShared = ({ useShared }): SharedApi => {
  const { httpClient, localStorage } = useShared<UtilsApi>("utils")
  const userService = new UserService(httpClient, localStorage)

  return {
    userService
  }
}
