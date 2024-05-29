import {
  CustomerColumn,
  EmptyColumn,
  RepairCodeColumn,
  ShowDetailButton,
  SparePartColumn,
} from "@/components/Table/TableColumns";
import { URLS } from "@/core/consts/urls.ts";
import Content from "@/core/layouts/Content.tsx";
import { useLoading, useModal } from "@/hooks";
import type { CustomerType } from "@/pages/Customer/types.ts";
import type { RepairTableType } from "@/pages/Repair/types.ts";
import type { SparePartType } from "@/pages/SparePart/types.ts";
import { useRepairs } from "@/services/Repair";
import { Table } from "antd";
import AddRepairModal from "./components/AddRepairModal";

const Repair = () => {
  const { data: repairs, refetch: refetchRepairs } = useRepairs();
  const { closeModal, isOpen, openModal } = useModal();
  const { isLoading, toggleLoading } = useLoading();

  const columns: RepairTableType = [
    {
      key: "customer",
      dataIndex: "customer",
      title: "Customer",
      render: (value: CustomerType) => <CustomerColumn {...value} isLinked />,
    },
    {
      key: "code",
      dataIndex: "code",
      title: "Repair Code",
      render: (value) => <RepairCodeColumn code={value} />,
    },
    {
      key: "sparePart",
      dataIndex: "sparePart",
      title: "Spare Part",
      render: (value: SparePartType) => <SparePartColumn {...value} isLinked />,
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
    },
    {
      dataIndex: "uuid",
      render: (value: string) => (
        <ShowDetailButton url={URLS.REPAIR} uuid={value} />
      ),
    },
  ];

  return (
    <Content
      title="Repair"
      addAction={{ title: "Add Repair", onClick: openModal }}
    >
      <Table columns={columns} dataSource={repairs} rowKey="uuid" />
      <AddRepairModal
        toggleLoading={toggleLoading}
        isLoading={isLoading}
        open={isOpen}
        onCancel={async () => {
          closeModal();
          await refetchRepairs();
        }}
        title="Add Customer"
      />
    </Content>
  );
};

export default Repair;
