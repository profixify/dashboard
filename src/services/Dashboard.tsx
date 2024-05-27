import useAxios from "@/core/libs/http";
import { useQuery } from "@tanstack/react-query";
import { BaseDashboardCounts } from "@/core/types";

export const useDashboard = () => {
  const axios = useAxios();
  const dashboard = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await axios.get("/dashboard/");
      return response.data;
    },
  });
  return dashboard;
};

export const useDashboardCounts = () => {
  const axios = useAxios();
  const dashboardCounts = useQuery<BaseDashboardCounts>({
    queryKey: ["dashboardCounts"],
    queryFn: async () => {
      const response = await axios.get("/dashboard-counts/");
      return response.data;
    },
  });
  return dashboardCounts;
};
