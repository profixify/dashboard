import useAxios from "@/core/libs/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateBrandFormInputs,
  EditBrandFormInputs,
} from "@/pages/Settings/Brand/types.ts";

export const useBrands = () => {
  const axios = useAxios();
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await axios.get("/brands/");
      return response.data;
    },
  });
};

export const useCreateBrand = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createBrand"],
    mutationFn: async (data: CreateBrandFormInputs) => {
      const response = await axios.post("/brands/", data);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

export const useEditBrand = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editBrand"],
    mutationFn: async (data: EditBrandFormInputs) => {
      const response = await axios.put(`/brands/${data.uuid}/`, data);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

export const useDeleteBrand = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteBrand"],
    mutationFn: async (uuid: string) => {
      const response = await axios.delete(`/brands/${uuid}/`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

export const useBrandModels = ({ uuid }: { uuid?: string }) => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await axios.get(`/brands/${uuid}/models/`);
      return response.data;
    },
  });
};
