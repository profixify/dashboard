import useAxios from "@/core/libs/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateCompanyInputs,
  EditCompanyInputs,
} from "@/pages/Settings/Company/types.ts";

export const useCompanies = () => {
  const axios = useAxios();
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await axios.get("/companies/");
      return response.data;
    },
  });
};

export const useCreateCompany = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createCompany"],
    mutationFn: async (data: CreateCompanyInputs) => {
      const response = await axios.post("/companies/", data);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};

export const useEditCompany = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editCompany"],
    mutationFn: async (data: EditCompanyInputs) => {
      console.log("mutaiton", data);
      const response = await axios.patch(`/companies/${data.uuid}/`, data);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};

export const useDeleteCompany = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteCompany"],
    mutationFn: async (uuid: string) => {
      const response = await axios.delete(`/companies/${uuid}/`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};
