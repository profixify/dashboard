import useAxios from "@/core/libs/http";
import { CreateMutationAction, UpdateMutationAction } from "@/core/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UpdateRepairStatusFormInputs } from "@/pages/Repair/types.ts";

export const useRepairs = () => {
  const axios = useAxios();
  const repairs = useQuery({
    queryKey: ["repairs"],
    queryFn: async () => {
      const response = await axios.get("/repairs/");
      return response.data;
    },
  });
  return repairs;
};

export const useRepair = ({ uuid }: { uuid?: string }) => {
  const axios = useAxios();
  const repair = useQuery({
    queryKey: ["repair"],
    queryFn: async () => {
      const response = await axios.get(`/repairs/${uuid}/`);
      return response.data;
    },
  });
  return repair;
};

export const useCreateRepair = ({
  onError,
  onMutate,
  onSuccess,
}: CreateMutationAction) => {
  const axios = useAxios();
  const createRepair = useMutation({
    mutationKey: ["createRepair"],
    mutationFn: async (data: any) => {
      const response = await axios.post("/repairs/", data);
      return response.data;
    },
    onError,
    onMutate,
    onSuccess,
  });
  return createRepair;
};

export const useUpdateRepairStatus = ({
  uuid,
  onError,
  onMutate,
  onSuccess,
}: UpdateMutationAction) => {
  const axios = useAxios();
  const updateRepair = useMutation({
    mutationKey: ["updateRepairStatus"],
    mutationFn: async (data: UpdateRepairStatusFormInputs) => {
      const response = await axios.patch(`/repairs/${uuid}/`, data);
      return response.data;
    },
    onError,
    onMutate,
    onSuccess,
  });
  return updateRepair;
};
