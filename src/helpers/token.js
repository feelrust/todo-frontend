function getToken() {
  const user = JSON.parse(localStorage.getItem("todoUser"));
  const { token } = user;
  return token;
}

export default getToken;
