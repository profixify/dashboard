import useAxios from "@/core/libs/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EditCompanyInputs } from "@/pages/Settings/Company/types.ts";

export const useCompany = () => {
  const axios = useAxios();
  return useQuery({
    queryKey: ["company"],
    queryFn: async () => {
      const response = await axios.get("/settings/");
      return response.data.company;
    },
  });
};

export const useEditCompany = () => {
  const axios = useAxios();
  return useMutation({
    mutationKey: ["editCompany"],
    mutationFn: async (data: EditCompanyInputs) => {
      const response = await axios.patch("/settings/", { company: data });
      return response.data;
    },
  });
};
