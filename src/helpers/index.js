export function getAuthHeader() {
  const token = localStorage.getItem("auth_token");

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
