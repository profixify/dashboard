import { CardRow } from "@/components/Card";
import { EmptyColumn } from "@/components/Table/TableColumns";
import Content from "@/core/layouts/Content";
import type { BaseSparePart } from "@/core/types";
import type { CustomerRepairTableType } from "@/pages/Customer/types.ts";
import { useCustomer, useCustomerRepairs } from "@/services/Customer.ts";
import { Card, Table } from "antd";
import { useParams } from "react-router-dom";

const CustomerDetail = () => {
  const { uuid } = useParams();
  const columns: CustomerRepairTableType = [
    { key: "code", dataIndex: "code", title: "Code" },
    {
      key: "sparePart",
      dataIndex: "sparePart",
      title: "Spare Part",
      render: (value: BaseSparePart) => value.name,
    },
    {
      key: "simLockPassword",
      dataIndex: "simLockPassword",
      title: "Sim Lock Password",
      render: EmptyColumn,
    },
    {
      key: "phoneLockPassword",
      dataIndex: "phoneLockPassword",
      title: "Phone Lock Password",
      render: EmptyColumn,
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Status",
      render: EmptyColumn,
    },
  ];

  const { data: customer } = useCustomer({ uuid });
  const { data: customerRepairs } = useCustomerRepairs({ uuid });

  return (
    <Content title="Customer Detail" backButtonUrl="/customers/">
      <div className="flex flex-col gap-2">
        <Card className="w-1/4" title={customer?.fullName}>
          <CardRow label="Identity Number" value={customer?.identityNumber} />
          <CardRow label="Phone Number" value={customer?.phoneNumber} />
        </Card>
        <Table bordered columns={columns} dataSource={customerRepairs} />
      </div>
    </Content>
  );
};

export default CustomerDetail;
