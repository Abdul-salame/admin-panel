
export const isAuthenticated = () => {
  return localStorage.getItem("gmi_admin") === "true";
};

export const login = () => {
  localStorage.setItem("gmi_admin", "true");
};

export const logout = () => {
  localStorage.removeItem("gmi_admin");
};
