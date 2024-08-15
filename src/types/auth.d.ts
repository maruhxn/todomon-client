export type UserInfo = {
  id: number;
  email: string;
  username: string;
  role: "ROLE_ADMIN" | "ROLE_USER";
  profileImage: string;
};

export type TokenDto = {
  accessToken: string;
  refreshToken: string;
};
