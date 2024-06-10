import Content from "@/core/layouts/Content.tsx";
import { Tabs } from "antd";
import Brand from "@/pages/Settings/Brand";
import Currency from "@/pages/Settings/Currency.tsx";
import Model from "@/pages/Settings/Model";

const Settings = () => {
  const tabItems = [
    { label: "Currency", key: "currency", children: <Currency /> },
    { label: "Brand", key: "brand", children: <Brand /> },
    { label: "Model", key: "model", children: <Model /> },
  ];
  return (
    <Content title="Settings">
      <Tabs defaultActiveKey="brand" items={tabItems} />
    </Content>
  );
};

export default Settings;
