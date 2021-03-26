export default ({ invoke }) => {
  const accessManager = invoke("@utils/AccessManager")

  return [
    {
      path: "/hello",
      name: "Hello",
      component: () => import("./views/Hello"),
      meta: {
        access: () => accessManager.isLogged()
      }
    }
  ]
}
