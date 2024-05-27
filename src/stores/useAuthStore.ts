import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Token {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

const INITIAL_STATE: Token = {
  accessToken: undefined,
  refreshToken: undefined,
};

interface AuthStore {
  tokens: Token;
  setTokens: (tokens: Token) => void;
  clearTokens: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (setState) => ({
      tokens: INITIAL_STATE,
      setTokens: (tokens: Token) => setState({ tokens }),
      clearTokens: () => setState({ tokens: INITIAL_STATE }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
