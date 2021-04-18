export default function ({ store, redirect, route }) {
  /* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
  // console.log(store)
  if (!store.state.user.authenticated) {
    return redirect({
      name: 'auth-login',
      query: { redirect: route.fullPath },
    })
  }
}
