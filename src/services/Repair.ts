import useAxios from "@/core/libs/http";
import { CreateMutationAction, UpdateMutationAction } from "@/core/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UpdateRepairStatusFormInputs } from "@/pages/Repair/types.ts";

export const useRepairs = () => {
  const axios = useAxios();
  return useQuery({
    queryKey: ["repairs"],
    queryFn: async () => {
      const response = await axios.get("/repairs/");
      return response.data;
    },
  });
};

export const useRepair = ({ uuid }: { uuid?: string }) => {
  const axios = useAxios();
  return useQuery({
    queryKey: ["repair"],
    queryFn: async () => {
      const response = await axios.get(`/repairs/${uuid}/`);
      return response.data;
    },
  });
};

export const useCreateRepair = ({
  onError,
  onMutate,
  onSuccess,
}: CreateMutationAction) => {
  const axios = useAxios();
  return useMutation({
    mutationKey: ["createRepair"],
    mutationFn: async (data: any) => {
      const response = await axios.post("/repairs/", data);
      return response.data;
    },
    onError,
    onMutate,
    onSuccess,
    retry: true,
  });
};

export const useCreateRepairStatus = ({
  uuid,
  onError,
  onMutate,
  onSuccess,
}: UpdateMutationAction) => {
  const axios = useAxios();
  return useMutation({
    mutationKey: ["updateRepairStatus"],
    mutationFn: async (data: UpdateRepairStatusFormInputs) => {
      const response = await axios.post(`/repairs/${uuid}/statuses/`, data);
      return response.data;
    },
    onError,
    onMutate,
    onSuccess,
    retry: true,
  });
};
