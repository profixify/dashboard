import { CardRow } from "@/components/Card";
import { EmptyColumn } from "@/components/Table/TableColumns";
import Content from "@/core/layouts/Content";
import type { BaseSparePart } from "@/core/types";
import type { CustomerRepairTableType } from "@/pages/Customer/types.ts";
import { useCustomer, useCustomerRepairs } from "@/services/Customer.ts";
import { Table } from "antd";
import { useParams } from "react-router-dom";
import EditCustomerModal from "@/pages/Customer/components/EditCustomerModal.tsx";
import { useLoading, useModal } from "@/hooks";
import { DetailCard } from "@/components/Card/DetailCard.tsx";

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
      key: "latestStatus",
      dataIndex: "latestStatus",
      title: "Status",
      render: EmptyColumn,
    },
  ];

  const { toggleLoading, isLoading } = useLoading();
  const { closeModal, openModal, isOpen } = useModal();

  const { data: customer } = useCustomer({ uuid });
  const { data: customerRepairs } = useCustomerRepairs({ uuid });

  return (
    <Content
      title="Customer Detail"
      backButtonUrl="/customers/"
      editAction={{ title: "Edit Customer", onClick: openModal }}
    >
      <div className="flex flex-col gap-2">
        <DetailCard className="w-1/3" title={customer?.fullName}>
          <CardRow label="Phone Number" value={customer?.phoneNumber} />
        </DetailCard>
        <Table
          bordered
          columns={columns}
          dataSource={customerRepairs}
          rowKey="uuid"
        />
      </div>
      {customer && uuid && (
        <EditCustomerModal
          toggleLoading={toggleLoading}
          uuid={uuid}
          isLoading={isLoading}
          data={customer}
          open={isOpen}
          onCancel={closeModal}
          title="Edit Customer"
        />
      )}
    </Content>
  );
};

export default CustomerDetail;
