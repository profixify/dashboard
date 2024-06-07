import useAxios from "@/core/libs/http";
import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "@/pages/Login/types.ts";
import useAuthStore from "@/stores/useAuthStore.ts";
import { useNotification } from "@/hooks";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const axios = useAxios();
  const { toast } = useNotification();
  const { setTokens } = useAuthStore();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginFormData) => {
      const response = await axios.post("/token/", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Login successfully, you will redirecting");
      if (data) {
        const { access, refresh } = data;
        setTokens({
          accessToken: access,
          refreshToken: refresh,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    },
    onError: () => {
      toast.error("Invalid Credentials");
    },
  });
};
