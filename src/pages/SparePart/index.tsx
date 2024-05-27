import { IconButton } from "@/components/Button";
import Content from "@/core/layouts/Content.tsx";
import { useLoading, useModal } from "@/hooks";
import AddSparePartModal from "@/pages/SparePart/components/AddSparePartModal.tsx";
import { useSpareParts } from "@/services/SparePart";
import { Table } from "antd";
import { FaRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import type { SparePartTableType } from "./types";

const SparePart = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { isLoading, toggleLoading } = useLoading();
  const { data: spareParts, refetch: refetchSpareParts } = useSpareParts();

  const columns: SparePartTableType = [
    { key: "name", dataIndex: "name", title: "Name" },
    {
      key: "priceWithCurrency",
      dataIndex: "priceWithCurrency",
      title: "Price",
    },
    { key: "amount", dataIndex: "amount", title: "Amount" },
    { key: "leftAmount", dataIndex: "leftAmount", title: "Left Amount" },
    {
      render: (_, record) => (
        <Link to={`/spare-parts/${record.uuid}`}>
          <IconButton shape="circle" icon={<FaRightLong />} />
        </Link>
      ),
    },
  ];

  return (
    <Content
      title="Spare Parts"
      addAction={{ title: "Spare Part", onClick: openModal }}
    >
      <Table columns={columns} dataSource={spareParts} rowKey="uuid" />
      <AddSparePartModal
        open={isOpen}
        onCancel={async () => {
          closeModal();
          await refetchSpareParts();
        }}
        title="Add Spare Part"
        isLoading={isLoading}
        toggleLoading={toggleLoading}
      />
    </Content>
  );
};

export default SparePart;
