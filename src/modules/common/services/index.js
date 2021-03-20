import UserService from "./UserService"
import TextService from "./TextService"

export default {
  userService: context => new UserService(context),
  textService: context => new TextService(context)
}
