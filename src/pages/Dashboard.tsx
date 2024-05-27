import Content from "@/core/layouts/Content.tsx";
import { Table, Tabs, TabsProps } from "antd";
import { useDashboard, useDashboardCounts } from "@/services/Dashboard.tsx";
import { ColumnsType } from "antd/es/table";
import {
  CustomerColumn,
  RepairCodeColumn,
  SparePartColumn,
} from "@/components/Table/TableColumns";
import { RepairType } from "@/pages/Repair/types.ts";
import { Link } from "react-router-dom";
import { IconButton } from "@/components/Button";
import { FaRightLong } from "react-icons/fa6";

const Dashboard = () => {
  const { data } = useDashboard();
  const { data: counts } = useDashboardCounts();
  const columns: ColumnsType = [
    {
      key: "code",
      dataIndex: "code",
      title: "Code",
      render: (value) => <RepairCodeColumn code={value} />,
    },
    {
      key: "customer",
      dataIndex: "customer",
      title: "Customer",
      render: (value) => <CustomerColumn {...value} isLinked />,
    },
    {
      key: "sparePart",
      dataIndex: "sparePart",
      title: "Spare Part",
      render: (value) => <SparePartColumn {...value} isLinked />,
    },
    {
      dataIndex: "uuid",
      render: (value: string) => {
        return (
          <Link to={`/repairs/${value}`}>
            <IconButton shape="circle" icon={<FaRightLong />} />
          </Link>
        );
      },
    },
  ];
  if (data) {
    const tabItems: TabsProps["items"] = [
      {
        label: `Waited Repair (${counts?.waitingRepair})`,
        key: "WAITED_REPAIR",
        children: (
          <Table
            columns={columns}
            rowKey="uuid"
            dataSource={data?.filter(
              (item: RepairType) => item.status === "WAITING_REPAIR"
            )}
          />
        ),
      },
      {
        label: `Repairing (${counts?.repairing})`,
        key: "REPAIRING",
        children: (
          <Table
            columns={columns}
            rowKey="uuid"
            dataSource={data?.filter(
              (item: RepairType) => item.status === "REPAIRING"
            )}
          />
        ),
      },
      {
        label: `Repaired (${counts?.repaired})`,
        key: "REPAIRED",
        children: (
          <Table
            columns={columns}
            rowKey="uuid"
            dataSource={data?.filter(
              (item: RepairType) => item.status === "REPAIRED"
            )}
          />
        ),
      },
    ];

    return (
      <Content title="Dashboard">
        <div className="flex flex-col gap-2">
          <Tabs items={tabItems} defaultActiveKey="WAITED_REPAIR" type="card" />
        </div>
      </Content>
    );
  }
  return <Content>deneme</Content>;
};

export default Dashboard;
