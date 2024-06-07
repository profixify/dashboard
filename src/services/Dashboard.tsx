import useAxios from "@/core/libs/http";
import { useQuery } from "@tanstack/react-query";
import { BaseDashboardCounts } from "@/core/types";

export const useDashboard = () => {
  const axios = useAxios();
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await axios.get("/dashboard/");
      return response.data;
    },
  });
};

export const useDashboardCounts = () => {
  const axios = useAxios();
  return useQuery<BaseDashboardCounts>({
    queryKey: ["dashboardCounts"],
    queryFn: async () => {
      const response = await axios.get("/dashboard-counts/");
      return response.data;
    },
  });
};
