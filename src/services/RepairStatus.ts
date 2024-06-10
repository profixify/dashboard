import useAxios from "@/core/libs/http";
import { useQuery } from "@tanstack/react-query";

export const useRepairStatus = ({ uuid }: { uuid?: string }) => {
  const axios = useAxios();
  return useQuery({
    queryKey: ["repairStatus"],
    queryFn: async () => {
      const response = await axios.get(`/repairs/${uuid}/statuses/`);
      return response.data;
    },
  });
};
