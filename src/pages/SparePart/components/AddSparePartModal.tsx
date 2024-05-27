import { FormButton } from "@/components/Form/FormButton.tsx";
import { FormInput } from "@/components/Form/FormInput.tsx";
import Modal, { type ModalProps } from "@/components/Modal";
import { useNotification } from "@/hooks";
import { useCreateSparePart } from "@/services/SparePart";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { AddSparePartFormInputs } from "../types";

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
    price: z.number(),
    amount: z.number(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSparePartFormInputs>({
    resolver: zodResolver(schema),
  });
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
        <FormButton errors={errors}>Save</FormButton>
      </form>
    </Modal>
  );
};

export default AddSparePartModal;
