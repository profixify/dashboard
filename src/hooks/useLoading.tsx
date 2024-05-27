import { useState } from "react";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toggleLoading = () => setIsLoading(!isLoading);
  return {
    isLoading,
    toggleLoading,
  };
};
