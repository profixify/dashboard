import DashboardLayout from "@/core/layouts/DashboardLayout";
import Customer from "@/pages/Customer";
import Repair from "@/pages/Repair";
import SparePart from "@/pages/SparePart";
import { Navigate } from "react-router-dom";
import CustomerDetail from "./pages/Customer/CustomerDetail";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SparePartDetail from "@/pages/SparePart/SparePartDetail.tsx";
import RepairDetail from "@/pages/Repair/RepairDetail.tsx";

interface IPublicRoutes {
  accessToken: string | undefined;
}
const publicRoutes = ({ accessToken }: IPublicRoutes) => {
  return accessToken
    ? [
        {
          path: "*",
          element: <Navigate to="/" />,
        },
      ]
    : [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "*",
          element: <Navigate to="/login" replace />,
        },
      ];
};

const privateRoutes = () => {
  return {
    element: <DashboardLayout />,
    path: "",
    children: [
      { path: "", element: <Dashboard /> },
      { path: "customers", element: <Customer /> },
      { path: "customers/:uuid", element: <CustomerDetail /> },
      { path: "repairs", element: <Repair /> },
      { path: "repairs/:uuid", element: <RepairDetail /> },
      { path: "spare_parts", element: <SparePart /> },
      { path: "spare_parts/:uuid", element: <SparePartDetail /> },
    ],
  };
};

export { privateRoutes, publicRoutes };
