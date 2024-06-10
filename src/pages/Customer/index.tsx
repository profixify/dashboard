import Content from "@/core/layouts/Content.tsx";
import { useLoading, useModal } from "@/hooks";
import type {
  CustomerTableType,
  CustomerType,
} from "@/pages/Customer/types.ts";
import type { ColumnsType } from "antd/es/table";
import AddCustomerModal from "./components/AddCustomerModal.tsx";
import { URLS } from "@/core/consts/urls.ts";
import { ShowDetailButton } from "@/components/Table/TableColumns";
import Table from "@/components/Table";
import { useCustomers } from "@/services/Customer.ts";

const Customer = () => {
  const { data: customers, refetch: refetchCustomers } = useCustomers();
  const { closeModal, openModal, isOpen } = useModal();
  const { isLoading, toggleLoading } = useLoading();

  const handleCloseModal = async () => {
    closeModal();
    await refetchCustomers();
  };

  const columns: ColumnsType<CustomerTableType> = [
    { key: "fullName", dataIndex: "fullName", title: "Full Name" },
    { key: "phoneNumber", dataIndex: "phoneNumber", title: "Phone Number" },
    {
      dataIndex: "uuid",
      width: "10px",
      render: (value: string) => (
        <ShowDetailButton url={URLS.CUSTOMER} uuid={value} />
      ),
    },
  ];

  return (
    <Content
      title="Customers"
      addAction={{
        title: "Customer",
        onClick: openModal,
        disabled: !customers,
      }}
    >
      <Table
        columns={columns}
        dataSource={customers as CustomerType[]}
        rowKey="uuid"
        bordered
      />
      <AddCustomerModal
        toggleLoading={toggleLoading}
        isLoading={isLoading}
        open={isOpen}
        onCancel={handleCloseModal}
        title="Add Customer"
      />
    </Content>
  );
};

export default Customer;
