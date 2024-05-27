import { useJwt as useBaseJwt } from "react-jwt";
import useAuthStore from "@/stores/useAuthStore.ts";

interface JwtPayload {
  user_id: number;
}
export const useJwt = () => {
  const { tokens } = useAuthStore();
  const { isExpired, decodedToken } = useBaseJwt<JwtPayload>(
    tokens.accessToken || ""
  );
  return {
    isExpired,
    decodedToken,
    accessToken: tokens.accessToken,
  };
};
