"use client";

import { useEffect } from "react";
import { setAuthCookieFromQueryParameters } from "./actions";

interface OAuth2SearchParam {
  memberId: string;
  accessToken: string;
  refreshToken: string;
}

export default function AuthPage({
  searchParams,
}: {
  searchParams: OAuth2SearchParam;
}) {
  useEffect(() => {
    setAuthCookieFromQueryParameters(
      searchParams.memberId,
      searchParams.accessToken,
      searchParams.refreshToken
    );
  }, []);

  return null;
}
