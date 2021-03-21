import UserService from "./UserService"

export default ({ invoke }) => {
  return {
    userService: () => new UserService(invoke("httpClient"), invoke("errorParser"))
  }
}
