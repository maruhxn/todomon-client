export type UserInfo = {
  sub: string;
  id: number;
  username: string;
  subscribed: boolean;
  role: "ROLE_ADMIN" | "ROLE_USER";
  profileImage: string;
  starPoint: number;
  foodCnt: number;
  iat: number;
  exp: number;
};
