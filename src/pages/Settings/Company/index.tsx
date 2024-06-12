import { useDrawer } from "@/hooks";
import {
  CompanyTableType,
  CreateCompanyInputs,
  EditCompanyInputs,
} from "@/pages/Settings/Company/types.ts";
import {
  useCompanies,
  useCreateCompany,
  useDeleteCompany,
  useEditCompany,
} from "@/services/Company.ts";
import Table from "@/components/Table";
import { Collapse, Drawer } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCompanySchema,
  editCompanySchema,
} from "@/pages/Settings/Company/schema.ts";
import { ActionColumn } from "@/components/Table/TableColumns";
import { FormInput } from "@/components/Form/FormInput.tsx";
import { FormButton } from "@/components/Form/FormButton.tsx";
import { useEffect } from "react";
import { BaseCompany } from "@/core/types/Company.ts";

const Company = () => {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  const { data: companies } = useCompanies();
  const { mutateAsync: createCompany, isSuccess: isCreateSuccess } =
    useCreateCompany();
  const { mutateAsync: editCompany, isSuccess: isEditSuccess } =
    useEditCompany();
  const { mutateAsync: deleteCompany } = useDeleteCompany();
  const createForm = useForm<CreateCompanyInputs>({
    resolver: zodResolver(createCompanySchema),
  });
  const editForm = useForm<EditCompanyInputs>({
    resolver: zodResolver(editCompanySchema),
  });

  const companyColumns: CompanyTableType = [
    { key: "name", dataIndex: "name", title: "Name" },
    { key: "address", dataIndex: "address", title: "Address" },
    { key: "taxNumber", dataIndex: "taxNumber", title: "Tax Number" },
    {
      key: "uuid",
      width: "10px",
      render: (_, record) => (
        <ActionColumn
          uuid={record.uuid}
          openDrawer={() => {
            openDrawer();
            Object.entries(record).forEach(([name, value]) => {
              console.log("111", name, value);
              editForm.setValue(name as keyof BaseCompany, value);
            });
            console.log("values", editForm.getValues());
          }}
          onDelete={() => deleteCompany(record.uuid)}
        />
      ),
    },
  ];
  const AddCompanyForm = () => (
    <form onSubmit={createForm.handleSubmit((data) => createCompany(data))}>
      <FormInput
        name="name"
        error={createForm.formState.errors.name}
        label="Name"
        control={createForm.control}
      />
      <FormInput
        name="address"
        error={createForm.formState.errors.address}
        label="Address"
        control={createForm.control}
      />
      <FormInput
        name="taxNumber"
        error={createForm.formState.errors.taxNumber}
        label="Tax Number"
        control={createForm.control}
      />
      <FormButton errors={createForm.formState.errors}>Save</FormButton>
    </form>
  );

  const EditCompanyForm = () => (
    <form onSubmit={editForm.handleSubmit((data) => editCompany(data))}>
      <FormInput
        name="name"
        error={editForm.formState.errors.name}
        label="Name"
        control={editForm.control}
      />
      <FormInput
        name="address"
        error={editForm.formState.errors.address}
        label="Address"
        control={editForm.control}
      />
      <FormInput
        name="taxNumber"
        error={editForm.formState.errors.taxNumber}
        label="Tax Number"
        control={editForm.control}
      />
      {JSON.stringify(editForm.getValues(), null, 2)}
      <FormButton errors={editForm.formState.errors}>Save</FormButton>
    </form>
  );

  useEffect(() => {
    if (isCreateSuccess) createForm.reset();
  }, [isCreateSuccess]);

  useEffect(() => {
    if (isEditSuccess) {
      closeDrawer();
      editForm.reset();
    }
  }, [isEditSuccess]);

  return (
    <div className="flex gap-5 xs:flex-col md:flex-row">
      <Table
        className="xs:w-full md:w-2/3 xs:order-2 md:order-1"
        columns={companyColumns}
        rowKey="uuid"
        dataSource={companies}
        bordered
      />
      <Collapse
        className="xs:w-full md:w-1/3 h-min xs:order-1"
        items={[
          {
            key: "1",
            label: "Add Company",
            children: <AddCompanyForm />,
          },
        ]}
      />
      <Drawer
        title="Edit Company"
        placement="right"
        closable={false}
        onClose={closeDrawer}
        open={isOpen}
        key="editBrand"
      >
        <EditCompanyForm />
      </Drawer>
    </div>
  );
};

export default Company;
