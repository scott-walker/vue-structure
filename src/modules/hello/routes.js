export default ({ invoke }) => {
  const accessManager = invoke("accessManager")

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
