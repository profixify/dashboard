import { FormButton } from "@/components/Form/FormButton";
import { FormInput } from "@/components/Form/FormInput";
import FormPhoneInput from "@/components/Form/FormPhoneInput.tsx";
import Modal, { type ModalProps } from "@/components/Modal";
import { getPhoneCodeByCountryName } from "@/core/libs/utils";
import { useNotification } from "@/hooks";
import type {
  CreateCustomerFormType,
  CreateCustomerType,
} from "@/pages/Customer/types.ts";
import { useCreateCustomer } from "@/services/Customer";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CustomerModalProps extends ModalProps {
  toggleLoading: () => void;
}

const CustomerModal: FC<CustomerModalProps> = ({
  isLoading,
  open,
  onCancel,
  title,
  toggleLoading,
}) => {
  const { toast } = useNotification();
  const schema = z.object({
    name: z.string(),
    surname: z.string(),
    identityNumber: z.string().min(11).max(11),
    countryCode: z.string({ message: "Please select country" }),
    phoneNumber: z
      .string({ message: "Please enter phone number" })
      .min(10)
      .max(10),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCustomerFormType>({ resolver: zodResolver(schema) });
  const { error, mutateAsync } = useCreateCustomer({
    onMutate: () => toggleLoading(),
    onError: () => {
      toast.error("Something went wrong");
      console.error(error);
    },
    onSuccess: () => {
      toast.success("The customer created");
      toggleLoading();
      onCancel();
    },
  });
  const submitAction = async (data: CreateCustomerFormType) => {
    const dialCode = getPhoneCodeByCountryName(data.countryCode);
    const newData: CreateCustomerType = {
      name: data.name,
      surname: data.surname,
      identityNumber: data.identityNumber,
      phoneNumber: `${dialCode}${data.phoneNumber}`,
    };
    await mutateAsync(newData);
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
        <div className="w-1/2">
          <FormInput
            label="Identity Number"
            name="identityNumber"
            control={control}
            error={errors.identityNumber}
          />
        </div>

        <FormPhoneInput
          errors={{
            phoneNumber: errors.phoneNumber,
            countryCode: errors.countryCode,
          }}
          label="Phone Number"
          name={{ phoneNumber: "phoneNumber", countryCode: "countryCode" }}
          control={control}
        />

        <FormButton errors={errors}>Save Customer</FormButton>
      </form>
    </Modal>
  );
};

export default CustomerModal;
