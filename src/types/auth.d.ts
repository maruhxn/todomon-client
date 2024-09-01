export type UserInfo = {
  id: number;
  email: string;
  username: string;
  subscribed: boolean;
  role: "ROLE_ADMIN" | "ROLE_USER";
  profileImage: string;
  starPoint: number;
  foodCnt: number;
};

export type TokenDto = {
  accessToken: string;
  refreshToken: string;
};
