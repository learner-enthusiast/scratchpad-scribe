// src/utils/authHelpers.ts

export const handleAuthResponse = (
  data: any,
  setUser: (user: any) => void,
  TOKEN_KEY: string,
  USER_KEY: string
) => {
  const token = data.token;
  const userData = data.user;

  if (!token) {
    throw new Error("No token returned from server");
  }

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
  setUser(userData);

  return { success: true, user: userData };
};
