import Content from "@/core/layouts/Content.tsx";
import { useLoading, useModal } from "@/hooks";
import type {
  CustomerTableType,
  CustomerType,
} from "@/pages/Customer/types.ts";
import { useCustomers } from "@/services/Customer.ts";
// import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import AddCustomerModal from "./components/AddCustomerModal.tsx";
import { URLS } from "@/core/consts/urls.ts";
import { ShowDetailButton } from "@/components/Table/TableColumns";
import Table from "@/components/Table";

const Customer = () => {
  const { data: customers, refetch: refetchCustomers } = useCustomers();
  const { closeModal, openModal, isOpen } = useModal();
  const { isLoading, toggleLoading } = useLoading();

  const columns: ColumnsType<CustomerTableType> = [
    { key: "fullName", dataIndex: "fullName", title: "Full Name" },
    {
      key: "identityNumber",
      dataIndex: "identityNumber",
      title: "Identity Number",
    },
    { key: "phoneNumber", dataIndex: "phoneNumber", title: "Phone Number" },
    {
      dataIndex: "uuid",
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
      />
      <AddCustomerModal
        toggleLoading={toggleLoading}
        isLoading={isLoading}
        open={isOpen}
        onCancel={async () => {
          closeModal();
          await refetchCustomers();
        }}
        title="Add Customer"
      />
    </Content>
  );
};

export default Customer;
