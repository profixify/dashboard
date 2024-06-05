import useAxios from "@/core/libs/http";
import type { CreateMutationAction, UpdateMutationAction } from "@/core/types";
import {
  AddSparePartFormInputs,
  EditSparePartFormInputs,
} from "@/pages/SparePart/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSpareParts = () => {
  const axios = useAxios();
  return useQuery({
    queryKey: ["spareParts"],
    queryFn: async () => {
      const response = await axios.get("/spare-parts/");
      return response.data;
    },
  });
};

export const useSparePart = ({ uuid }: { uuid?: string }) => {
  const axios = useAxios();
  return useQuery({
    queryKey: ["sparePart"],
    queryFn: async () => {
      const response = await axios.get(`/spare-parts/${uuid}/`);
      return response.data;
    },
  });
};

export const useCreateSparePart = ({
  onError,
  onMutate,
  onSuccess,
}: CreateMutationAction) => {
  const axios = useAxios();
  return useMutation({
    mutationKey: ["createSparePart"],
    mutationFn: async (data: AddSparePartFormInputs) => {
      const response = await axios.post("/spare-parts/", data);
      return response.data;
    },
    onError,
    onMutate,
    onSuccess,
  });
};

export const useEditSparePart = ({
  uuid,
  onError,
  onMutate,
  onSuccess,
}: UpdateMutationAction) => {
  const axios = useAxios();
  return useMutation({
    mutationKey: ["updateSparePart"],
    mutationFn: async (data: EditSparePartFormInputs) => {
      const response = await axios.put(`/spare-parts/${uuid}/`, data);
      return response.data;
    },
    onError,
    onMutate,
    onSuccess,
  });
};
