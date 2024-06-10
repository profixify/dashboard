import Table from "@/components/Table";
import { Collapse, Drawer } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/Form/FormInput.tsx";
import { FormButton } from "@/components/Form/FormButton.tsx";
import { useEffect } from "react";
import { useDrawer } from "@/hooks";
import {
  createBrandSchema,
  editBrandSchema,
} from "@/pages/Settings/Brand/schema.ts";
import { ActionColumn } from "@/components/Table/TableColumns";
import {
  useBrands,
  useCreateBrand,
  useDeleteBrand,
  useEditBrand,
} from "@/services/Brand.ts";
import {
  BrandTableType,
  CreateBrandFormInputs,
  EditBrandFormInputs,
} from "@/pages/Settings/Brand/types.ts";

const SparePartBrand = () => {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  const { mutateAsync: deleteSparePartBrand } = useDeleteBrand();
  const deleteBrand = async (brandUUID: string) => {
    await deleteSparePartBrand(brandUUID);
  };

  const brandColumns: BrandTableType = [
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
    },
    {
      key: "uuid",
      width: "10px",
      render: (_, record) => (
        <ActionColumn
          uuid={record.uuid}
          openDrawer={() => {
            openDrawer();
            editForm.setValue("uuid", record.uuid);
            editForm.setValue("name", record.name);
          }}
          onDelete={deleteBrand}
        />
      ),
    },
  ];
  const { data: brands } = useBrands();
  const { mutateAsync, isSuccess } = useCreateBrand();
  const { mutateAsync: editBrandMutate, isSuccess: isSuccessEditBrand } =
    useEditBrand();

  const createForm = useForm<CreateBrandFormInputs>({
    resolver: zodResolver(createBrandSchema),
  });

  const editForm = useForm<EditBrandFormInputs>({
    resolver: zodResolver(editBrandSchema),
  });

  useEffect(() => {
    if (isSuccess) createForm.reset();
  }, [isSuccess, createForm.reset]);

  useEffect(() => {
    closeDrawer();
  }, [isSuccessEditBrand]);

  const AddBrandForm = () => (
    <form onSubmit={createForm.handleSubmit((data) => mutateAsync(data))}>
      <FormInput
        name="name"
        error={createForm.formState.errors.name}
        label="Brand Name"
        control={createForm.control}
      />
      <FormButton errors={createForm.formState.errors}>Save</FormButton>
    </form>
  );

  const EditBrandForm = () => (
    <form onSubmit={editForm.handleSubmit((data) => editBrandMutate(data))}>
      <FormInput
        name="name"
        error={editForm.formState.errors.name}
        label="Brand Name"
        control={editForm.control}
      />
      <FormButton errors={editForm.formState.errors}>Save</FormButton>
    </form>
  );

  return (
    <div className="flex gap-5 xs:flex-col md:flex-row">
      <Table
        className="xs:w-full md:w-2/3 xs:order-2 md:order-1"
        columns={brandColumns}
        rowKey="uuid"
        dataSource={brands}
        bordered
      />
      <Collapse
        className="xs:w-full md:w-1/3 h-min xs:order-1"
        items={[
          {
            key: "1",
            label: "Add Brand",
            children: <AddBrandForm />,
          },
        ]}
      />
      <Drawer
        title="Edit Brand"
        placement="right"
        closable={false}
        onClose={closeDrawer}
        open={isOpen}
        key="editBrand"
      >
        <EditBrandForm />
      </Drawer>
    </div>
  );
};

export default SparePartBrand;
