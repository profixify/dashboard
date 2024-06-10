import useAxios from "@/core/libs/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateModelFormInputs,
  EditModelFormInputs,
} from "@/pages/Settings/Model/types.ts";

export const useModels = () => {
  const axios = useAxios();
  return useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const response = await axios.get("/models/");
      return response.data;
    },
  });
};

export const useCreateModel = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createModel"],
    mutationFn: async (data: CreateModelFormInputs) => {
      const response = await axios.post("/models/", data);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
};

export const useEditModel = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editModel"],
    mutationFn: async (data: EditModelFormInputs) => {
      const response = await axios.put(`/models/${data.uuid}/`, data);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
};

export const useDeleteModel = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteModel"],
    mutationFn: async (uuid: string) => {
      const response = await axios.delete(`/models/${uuid}/`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
};
