import Content from "@/core/layouts/Content.tsx";
import { Tabs } from "antd";
import Brand from "@/pages/Settings/Brand";
import Currency from "@/pages/Settings/Currency.tsx";
import Model from "@/pages/Settings/Model";
import Company from "@/pages/Settings/Company";

const Settings = () => {
  const tabItems = [
    { label: "Currency", key: "currency", children: <Currency /> },
    { label: "Company", key: "company", children: <Company /> },
    { label: "Brand", key: "brand", children: <Brand /> },
    { label: "Model", key: "model", children: <Model /> },
  ];
  return (
    <Content title="Settings">
      <Tabs defaultActiveKey="currency" items={tabItems} />
    </Content>
  );
};

export default Settings;
