import useAxios from "@/core/libs/http";
import type { CreateMutationAction, UpdateMutationAction } from "@/core/types";
import type {
  CreateCustomerType,
  EditCustomerType,
} from "@/pages/Customer/types.ts";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCustomers = () => {
  const axios = useAxios();
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await axios.get("/customers/");
      return response.data;
    },
  });
};

export const useCustomer = ({ uuid }: { uuid?: string }) => {
  const axios = useAxios();
  return useQuery({
    queryKey: ["customer"],
    queryFn: async () => {
      const response = await axios.get(`/customers/${uuid}/`);
      return response.data;
    },
  });
};

export const useCreateCustomer = ({
  onMutate,
  onError,
  onSuccess,
}: CreateMutationAction) => {
  const axios = useAxios();
  return useMutation({
    mutationKey: ["createCustomer"],
    mutationFn: async (data: CreateCustomerType) => {
      const response = await axios.post("/customers/", data);
      return response.data;
    },
    onMutate,
    onError,
    onSuccess,
    retry: true,
  });
};

export const useCustomerRepairs = ({ uuid }: { uuid?: string }) => {
  const axios = useAxios();
  return useQuery({
    queryKey: ["customerRepairs"],
    queryFn: async () => {
      const response = await axios.get(`/customers/${uuid}/repairs/`);
      return response.data;
    },
  });
};

export const useEditCustomer = ({
  uuid,
  onSuccess,
  onError,
  onMutate,
}: UpdateMutationAction) => {
  const axios = useAxios();
  return useMutation({
    mutationKey: ["editCustomer"],
    mutationFn: async (data: EditCustomerType) => {
      const response = await axios.put(`/customers/${uuid}/`, data);
      return response.data;
    },
    onMutate,
    onError,
    onSuccess,
    retry: true,
  });
};
