import Content from "@/core/layouts/Content.tsx";
import { Tabs } from "antd";
import Brand from "@/pages/Settings/Brand";
import MainSettings from "@/pages/Settings/MainSettings.tsx";
import Model from "@/pages/Settings/Model";
import Company from "@/pages/Settings/Company";

const Settings = () => {
  const tabItems = [
    { label: "Main Settings", key: "mainSettings", children: <MainSettings /> },
    { label: "Company", key: "company", children: <Company /> },
    { label: "Brand", key: "brand", children: <Brand /> },
    { label: "Model", key: "model", children: <Model /> },
  ];
  return (
    <Content title="Settings">
      <Tabs defaultActiveKey="company" items={tabItems} />
    </Content>
  );
};

export default Settings;
