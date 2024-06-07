import { FormButton } from "@/components/Form/FormButton.tsx";
import { FormInput } from "@/components/Form/FormInput.tsx";
import Modal, { type ModalProps } from "@/components/Modal";
import { useNotification } from "@/hooks";
import {
  useCreateSparePart,
  useSparePartBrand,
  useSparePartModel,
} from "@/services/SparePart";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { AddSparePartFormInputs } from "../types";
import FormSelect from "@/components/Form/FormSelect.tsx";
import { BaseSparePartBrand, BaseSparePartModel } from "@/core/types";

interface AddSparePartModalProps extends ModalProps {
  toggleLoading: () => void;
}

const AddSparePartModal: FC<AddSparePartModalProps> = ({
  open,
  onCancel,
  title,
  isLoading,
  toggleLoading,
}) => {
  const { toast } = useNotification();
  const schema = z.object({
    name: z.string(),
    brand: z.string(),
    model: z.string(),
    price: z.number(),
    amount: z.number(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AddSparePartFormInputs>({
    resolver: zodResolver(schema),
  });
  const brand = watch("brand");
  const { data: brands } = useSparePartBrand();
  const { data: models, refetch: refetchModels } = useSparePartModel({
    uuid: brand,
  });

  useEffect(() => {
    if (typeof brand !== "undefined") {
      refetchModels();
    }
  }, [brand]);

  const { mutateAsync, error } = useCreateSparePart({
    onError: () => {
      toast.error("Something went wrong");
      console.error("[MUTATE]", error);
    },
    onMutate: () => toggleLoading(),
    onSuccess: () => {
      toast.success("Spare part created");
      toggleLoading();
      onCancel();
    },
  });

  const submitAction = async (data: AddSparePartFormInputs) =>
    mutateAsync(data);

  return (
    <Modal isLoading={isLoading} open={open} onCancel={onCancel} title={title}>
      <form onSubmit={handleSubmit(submitAction)}>
        <FormInput
          label="Name"
          name="name"
          control={control}
          error={errors.name}
        />
        <div className="flex items-center gap-2">
          <FormSelect
            name="brand"
            control={control}
            label="Brand"
            selectValues={brands?.map((brand: BaseSparePartBrand) => ({
              label: ["Apple", "Huawei", "Samsung"].includes(brand.name)
                ? brand.name
                : `${brand.name} (Soon)`,
              value: brand.uuid,
              disabled: !["Apple", "Huawei", "Samsung"].includes(brand.name),
            }))}
            error={errors.brand}
            showSearch
            filterOption={(inputValue, option) => {
              return (option?.label ?? "")
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase());
            }}
          />
          {brand && (
            <FormSelect
              name="model"
              control={control}
              label="Model"
              selectValues={models?.map((model: BaseSparePartModel) => ({
                label: model.name,
                value: model.uuid,
              }))}
              showSearch
              error={errors.model}
              filterOption={(inputValue, option) => {
                return (option?.label ?? "")
                  .toString()
                  .toLowerCase()
                  .includes(inputValue.toLowerCase());
              }}
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          <FormInput
            label="Price"
            name="price"
            control={control}
            error={errors.price}
            inputType="number"
          />
          <FormInput
            label="Amount"
            name="amount"
            control={control}
            error={errors.amount}
            inputType="number"
          />
        </div>

        <FormButton errors={errors}>Save</FormButton>
      </form>
    </Modal>
  );
};

export default AddSparePartModal;
