export default context => {
  const accessManager = context.get("accessManager")

  return [
    {
      path: "/",
      name: "Home",
      component: null,
      meta: {
        access: () => accessManager.isLogged()
      }
    }
  ]
}
