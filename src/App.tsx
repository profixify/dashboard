import Navbar from "@/core/layouts/Navbar.tsx";
import Customer from "@/pages/Customer";
import Dashboard from "@/pages/Dashboard.tsx";
import Login from "@/pages/Login";
import { Layout } from "antd";
import { FC } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  RouteObject,
  Routes,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useJwt } from "@/hooks";
import CustomerDetail from "@/pages/Customer/CustomerDetail.tsx";
import SparePart from "@/pages/SparePart";
import SparePartDetail from "@/pages/SparePart/SparePartDetail.tsx";
import Repair from "@/pages/Repair";
import RepairDetail from "@/pages/Repair/RepairDetail.tsx";
import Settings from "@/pages/Settings";
import { StyleProvider } from "@ant-design/cssinjs";

type RouterProviderProps = FC;
type RouterType = Pick<RouteObject, "path"> & {
  Component: FC;
  isProtected?: boolean;
};
const ProtectedRoute = () => {
  const { isExpired, accessToken } = useJwt();
  return isExpired && !accessToken ? (
    <Navigate to="/login" />
  ) : (
    <Layout className="h-screen">
      <Navbar />
      <Layout.Content className="min-h-full">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};
const RouterProvider: RouterProviderProps = () => {
  const routes: RouterType[] = [
    { path: "/login", Component: Login },
    { path: "/", Component: Dashboard, isProtected: true },
    { path: "/customers", Component: Customer, isProtected: true },
    { path: "/customers/:uuid", Component: CustomerDetail, isProtected: true },
    { path: "/repairs", Component: Repair, isProtected: true },
    { path: "/repairs/:uuid", Component: RepairDetail, isProtected: true },
    { path: "/spare-parts", Component: SparePart, isProtected: true },
    {
      path: "/spare-parts/:uuid",
      Component: SparePartDetail,
      isProtected: true,
    },
    { path: "/settings", Component: Settings, isProtected: true },
  ];
  const protectedRoutes = routes.filter(({ isProtected }) => isProtected);
  const publicRoutes = routes.filter(({ isProtected }) => !isProtected);
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        {protectedRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};
function App() {
  const queryClient = new QueryClient();
  return (
    <StyleProvider layer>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={import.meta.env.PROD ? "/dashboard" : ""}>
          <RouterProvider />
        </BrowserRouter>
      </QueryClientProvider>
    </StyleProvider>
  );
}

export default App;
