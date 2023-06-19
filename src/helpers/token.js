function getToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { token } = user;
  return token;
}

export default getToken;
