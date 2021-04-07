export const loginSubmitHandler = (identifier, password, doLogin) => {
  if (!identifier || !password) {
    return;
  }
  doLogin(identifier, password)
}
