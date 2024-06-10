import { useDrawer } from "@/hooks";
import Table from "@/components/Table";
import { Collapse, Drawer } from "antd";
import { ActionColumn } from "@/components/Table/TableColumns";
import { useForm } from "react-hook-form";
import {
  CreateModelFormInputs,
  EditModelFormInputs,
  ModelTableType,
} from "@/pages/Settings/Model/types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createModelSchema,
  editModelSchema,
} from "@/pages/Settings/Model/schema.ts";
import { FormInput } from "@/components/Form/FormInput.tsx";
import { FormButton } from "@/components/Form/FormButton.tsx";
import FormSelect from "@/components/Form/FormSelect.tsx";
import { BaseSparePartBrand } from "@/core/types";
import { useEffect } from "react";
import { useBrands } from "@/services/Brand.ts";
import {
  useCreateModel,
  useDeleteModel,
  useEditModel,
  useModels,
} from "@/services/Model.ts";

const Model = () => {
  const brands = useBrands();
  const models = useModels();
  const createModel = useCreateModel();
  const editModel = useEditModel();
  const deleteModel = useDeleteModel();

  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  const createForm = useForm<CreateModelFormInputs>({
    resolver: zodResolver(createModelSchema),
  });
  const editForm = useForm<EditModelFormInputs>({
    resolver: zodResolver(editModelSchema),
  });

  const modelColumns: ModelTableType = [
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
    },
    {
      key: "brand",
      dataIndex: "brand",
      title: "Brand",
      render: (value: BaseSparePartBrand) => <span>{value.name}</span>,
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
            editForm.setValue(
              "brand",
              (record.brand as unknown as BaseSparePartBrand).name,
            );

            editForm.setValue("name", record.name);
          }}
          onDelete={() => deleteModel.mutateAsync(record.uuid)}
          confirmTitle="Delete Model"
          confirmDescription="Are you sure to delete this model"
        />
      ),
    },
  ];

  const AddModelForm = () => (
    <form
      onSubmit={createForm.handleSubmit((data) =>
        createModel.mutateAsync(data),
      )}
    >
      <FormSelect
        name="brand"
        control={createForm.control}
        label="Brand"
        placeholder="Brand"
        selectValues={brands.data.map((brand: BaseSparePartBrand) => ({
          label: brand.name,
          value: brand.uuid,
        }))}
        error={createForm.formState.errors.brand}
      />
      <FormInput
        name="name"
        error={createForm.formState.errors.name}
        label="Model Name"
        control={createForm.control}
      />

      <FormButton errors={createForm.formState.errors}>Save</FormButton>
    </form>
  );

  const EditModelForm = () => (
    <form
      onSubmit={editForm.handleSubmit((data) => editModel.mutateAsync(data))}
    >
      <FormSelect
        name="brand"
        control={editForm.control}
        label="Brand"
        placeholder="Brand"
        selectValues={brands.data.map((brand: BaseSparePartBrand) => ({
          label: brand.name,
          value: brand.uuid,
        }))}
        defaultValue={
          brands.data.find(
            (brand: BaseSparePartBrand) =>
              brand.name === editForm.getValues("brand"),
          )?.uuid
        }
        error={editForm.formState.errors.brand}
      />
      <FormInput
        name="name"
        error={editForm.formState.errors.name}
        label="Brand Name"
        control={editForm.control}
      />
      <FormButton errors={editForm.formState.errors}>Save</FormButton>
    </form>
  );

  useEffect(() => {
    closeDrawer();
  }, [editModel.isSuccess]);

  return (
    <div className="flex gap-5 xs:flex-col md:flex-row">
      <Table
        className="xs:w-full md:w-2/3 xs:order-2 md:order-1"
        columns={modelColumns}
        rowKey="uuid"
        dataSource={models.data}
        bordered
      />
      <Collapse
        className="xs:w-full md:w-1/3 h-min xs:order-1"
        items={[
          {
            key: "1",
            label: "Add Model",
            children: <AddModelForm />,
          },
        ]}
      />
      <Drawer
        title="Edit Model"
        placement="right"
        closable={false}
        onClose={closeDrawer}
        open={isOpen}
        key="editModel"
      >
        <EditModelForm />
      </Drawer>
    </div>
  );
};

export default Model;
