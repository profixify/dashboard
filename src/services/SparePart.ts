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
    retry: true,
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
    retry: true,
  });
};

// export const useSparePartBrands = () => {
//   const axios = useAxios();
//   return useQuery({
//     queryKey: ["brands"],
//     queryFn: async () => {
//       const response = await axios.get("/brands/");
//       return response.data;
//     },
//   });
// };
//
// export const useCreateSparePartBrand = () => {
//   const axios = useAxios();
//   const { toast } = useNotification();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationKey: ["createBrand"],
//     mutationFn: async (data: SparePartBrandFormInputs) => {
//       const response = await axios.post("/brands/", data);
//       return response.data;
//     },
//     onSuccess: async () => {
//       toast.success("Created succesfully");
//       await queryClient.invalidateQueries({ queryKey: ["brands"] });
//     },
//     onError: async (error: AxiosError) => {
//       if (
//         error.response?.status === 400 &&
//         error.response?.data?.name[0].includes(
//           "brand with this name already exists.",
//         )
//       ) {
//         console.error("Name field is unique. Please enter different name");
//         toast.error("Name field is unique. Please enter different name");
//       }
//     },
//     retry: (failureCount, error) => {
//       const MAX_RETRY_COUNT = 5;
//       return error.response?.status === 401 && failureCount < MAX_RETRY_COUNT;
//     },
//   });
// };
//
// export const useUpdateSparePartBrand = () => {
//   const axios = useAxios();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationKey: ["updateSparePartBrand"],
//     mutationFn: async (data: EditBrandFormInputs) => {
//       const response = await axios.put(`/brands/${data.uuid}/`, data);
//       return response.data;
//     },
//     onSuccess: async () => {
//       await queryClient.invalidateQueries({ queryKey: ["brands"] });
//     },
//   });
// };
//
// export const useDeleteSparePartBrand = () => {
//   const axios = useAxios();
//   const { toast } = useNotification();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationKey: ["deleteSparePart"],
//     mutationFn: async (uuid: string) => {
//       const response = await axios.delete(`/brands/${uuid}/`);
//       return response.data;
//     },
//     onSuccess: async () => {
//       toast.success("Deleted succesfully");
//       await queryClient.invalidateQueries({ queryKey: ["brands"] });
//     },
//   });
// };
//
// export const useSparePartModelByBrand = ({ uuid }: { uuid?: string }) => {
//   const axios = useAxios();
//   return useQuery({
//     queryKey: ["sparePartModel"],
//     queryFn: async () => {
//       const response = await axios.get(`/brands/${uuid}/models/`);
//       return response.data;
//     },
//     enabled: false,
//   });
// };

export const useSparePartModels = () => {
  const axios = useAxios();
  return useQuery({
    queryKey: ["sparePartModels"],
    queryFn: async () => {
      const response = await axios.get(`/models/`);
      return response.data;
    },
  });
};
