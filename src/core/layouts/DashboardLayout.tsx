import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import Wrapper from "@/core/layouts/Wrapper.tsx";

const DashboardLayout = () => {
  return (
    <Wrapper>
      <Layout className="h-screen">
        <Navbar />
        <Layout.Content className="min-h-full">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Wrapper>
  );
};

export default DashboardLayout;
