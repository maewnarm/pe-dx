import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { User } from "src/pages/api/user/user";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>("/api/user/user");
  if (typeof window !== "undefined") console.log(user);
  useEffect(() => {
    if (!redirectTo || !user) return;
    console.log(redirectTo,redirectIfFound)
    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
