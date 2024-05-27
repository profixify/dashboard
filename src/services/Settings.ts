import useAxios from "@/core/libs/http";
import type { BaseSettings, UpdateMutationAction } from "@/core/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSettings = () => {
  const axios = useAxios();
  const settings = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const response = await axios.get<BaseSettings>("/settings/");
      return response.data;
    },
  });
  return settings;
};

export const useUpdateSettings = ({
  onError,
  onMutate,
  onSuccess,
}: UpdateMutationAction) => {
  const axios = useAxios();
  const updateSettings = useMutation({
    mutationKey: ["updateSettings"],
    mutationFn: async (data: Partial<BaseSettings>) => {
      const response = await axios.patch("/settings/", data);
      return response.data;
    },
    onError,
    onMutate,
    onSuccess,
  });
  return updateSettings;
};
