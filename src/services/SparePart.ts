import useAxios from "@/core/libs/http";
import type { CreateMutationAction } from "@/core/types";
import type { AddSparePartFormInputs } from "@/pages/SparePart/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSpareParts = () => {
  const axios = useAxios();
  const spareParts = useQuery({
    queryKey: ["spareParts"],
    queryFn: async () => {
      const response = await axios.get("/spare-parts/");
      return response.data;
    },
  });
  return spareParts;
};

export const useSparePart = ({ uuid }: { uuid?: string }) => {
  const axios = useAxios();
  const sparePart = useQuery({
    queryKey: ["sparePart"],
    queryFn: async () => {
      const response = await axios.get(`/spare-parts/${uuid}/`);
      return response.data;
    },
  });
  return sparePart;
};

export const useCreateSparePart = ({
  onError,
  onMutate,
  onSuccess,
}: CreateMutationAction) => {
  const axios = useAxios();
  const createSparePart = useMutation({
    mutationKey: ["createSparePart"],
    mutationFn: async (data: AddSparePartFormInputs) => {
      const response = await axios.post("/spare-parts/", data);
      return response.data;
    },
    onError,
    onMutate,
    onSuccess,
  });
  return createSparePart;
};
