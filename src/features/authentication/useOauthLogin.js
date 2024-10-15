import { useMutation, useQueryClient } from "@tanstack/react-query";
import { oauthLogin as oauthLoginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useOauthLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: oauthLogin, isOauthLoading } = useMutation({
    mutationFn: ({ accessToken, provider }) =>
      oauthLoginApi({ accessToken, provider }),

    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      window.localStorage.setItem("UserInfo", JSON.stringify(user));
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR:", err);
      toast.error("Login failed, please try again!");
    },
  });

  return { oauthLogin, isOauthLoading };
}
