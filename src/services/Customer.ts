import useAxios from "@/core/libs/http";
import type { CreateMutationAction } from "@/core/types";
import type { CreateCustomerType } from "@/pages/Customer/types.ts";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCustomers = () => {
  const axios = useAxios();
  const customers = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await axios.get("/customers/");
      return response.data;
    },
  });
  return customers;
};

export const useCustomer = ({ uuid }: { uuid?: string }) => {
  const axios = useAxios();
  const customer = useQuery({
    queryKey: ["customer"],
    queryFn: async () => {
      const response = await axios.get(`/customers/${uuid}/`);
      return response.data;
    },
  });
  return customer;
};

export const useCreateCustomer = ({
  onMutate,
  onError,
  onSuccess,
}: CreateMutationAction) => {
  const axios = useAxios();
  const createCustomer = useMutation({
    mutationKey: ["createCustomer"],
    mutationFn: async (data: CreateCustomerType) => {
      const response = await axios.post("/customers/", data);
      return response.data;
    },
    onMutate,
    onError,
    onSuccess,
  });
  return createCustomer;
};

export const useCustomerRepairs = ({ uuid }: { uuid?: string }) => {
  const axios = useAxios();
  const customerRepairs = useQuery({
    queryKey: ["customerRepairs"],
    queryFn: async () => {
      const response = await axios.get(`/customers/${uuid}/repairs/`);
      return response.data;
    },
  });
  return customerRepairs;
};
