import { FormButton } from "@/components/Form/FormButton.tsx";
import { FormInput } from "@/components/Form/FormInput.tsx";
import Modal, { type ModalProps } from "@/components/Modal";
import { useNotification } from "@/hooks";
import { useEditSparePart } from "@/services/SparePart";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { AddSparePartFormInputs, EditSparePartFormInputs } from "../types";

interface EditSparePartModalProps extends ModalProps {
  toggleLoading: () => void;
  uuid?: string;
  data: EditSparePartFormInputs;
}

const EditSparePartModal: FC<EditSparePartModalProps> = ({
  open,
  onCancel,
  title,
  isLoading,
  toggleLoading,
  uuid,
  data,
}) => {
  console.log(data);
  const { toast } = useNotification();
  const schema = z.object({
    name: z.string(),
    price: z.number(),
    amount: z.number(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSparePartFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: data,
  });
  const { mutateAsync, error } = useEditSparePart({
    uuid,
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
  // const { mutateAsync, error } = useCreateSparePart({
  //   onError: () => {
  //     toast.error("Something went wrong");
  //     console.error("[MUTATE]", error);
  //   },
  //   onMutate: () => toggleLoading(),
  //   onSuccess: () => {
  //     toast.success("Spare part created");
  //     toggleLoading();
  //     onCancel();
  //   },
  // });

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
          <FormInput
            label="Price"
            name="price"
            control={control}
            error={errors.priceWithCurrency}
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

export default EditSparePartModal;
