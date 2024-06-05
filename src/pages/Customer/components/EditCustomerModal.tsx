import { FormButton } from "@/components/Form/FormButton";
import { FormInput } from "@/components/Form/FormInput";
import Modal, { type ModalProps } from "@/components/Modal";
import { useNotification } from "@/hooks";
import type {
  EditCustomerFormType,
  EditCustomerType,
} from "@/pages/Customer/types.ts";
import { useEditCustomer } from "@/services/Customer";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface EditCustomerModalProps extends ModalProps {
  toggleLoading: () => void;
  data: EditCustomerType;
  uuid?: string;
}

const EditCustomerModal: FC<EditCustomerModalProps> = ({
  isLoading,
  open,
  onCancel,
  title,
  toggleLoading,
  data,
  uuid,
}) => {
  const { toast } = useNotification();
  const schema = z.object({
    name: z.string(),
    surname: z.string(),
    identityNumber: z.string().min(11).max(11),
    phoneNumber: z
      .string({ message: "Please enter phone number" })
      .min(13)
      .max(13),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCustomerFormType>({
    resolver: zodResolver(schema),
    defaultValues: data,
  });
  const { mutateAsync } = useEditCustomer({
    uuid,
    onMutate: () => toggleLoading(),
    onError: () => {
      toast.error("Something went wrong");
    },
    onSuccess: () => {
      toast.success("The customer created");
      toggleLoading();
      onCancel();
    },
  });
  const submitAction = async (data: EditCustomerFormType) => {
    await mutateAsync(data);
  };
  return (
    <Modal isLoading={isLoading} open={open} onCancel={onCancel} title={title}>
      <form onSubmit={handleSubmit(submitAction)}>
        <div className="flex items-center gap-2">
          <FormInput
            label="Name"
            name="name"
            control={control}
            error={errors.name}
          />
          <FormInput
            label="Surname"
            name="surname"
            control={control}
            error={errors.surname}
          />
        </div>
        <div className="flex items-center gap-2">
          <FormInput
            label="Identity Number"
            name="identityNumber"
            control={control}
            error={errors.identityNumber}
          />
          <FormInput
            name="phoneNumber"
            error={errors.phoneNumber}
            label="Phone Number"
            control={control}
          />
        </div>
        <FormButton errors={errors}>Save Customer</FormButton>
      </form>
    </Modal>
  );
};

export default EditCustomerModal;
