import { FormButton } from "@/components/Form/FormButton";
import { FormInput } from "@/components/Form/FormInput";
import FormSelect from "@/components/Form/FormSelect";
import type { ModalProps } from "@/components/Modal";
import Modal from "@/components/Modal";
import { useNotification } from "@/hooks";
import type { CustomerType } from "@/pages/Customer/types";
import type { SparePartType } from "@/pages/SparePart/types";
import { useCustomers } from "@/services/Customer";
import { useCreateRepair } from "@/services/Repair";
import { useSpareParts } from "@/services/SparePart";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddRepairModalProps extends ModalProps {
  toggleLoading: () => void;
}

interface AddRepairFormInputs {
  customer: string;
  sparePart: string;
  simLockPassword: string;
  phoneLockPassword: string;
}

const AddRepairModal: FC<AddRepairModalProps> = ({
  isLoading,
  open,
  onCancel,
  title,
  toggleLoading,
}) => {
  const { toast } = useNotification();
  const schema = z.object({
    customer: z.string(),
    sparePart: z.string(),
    simLockPassword: z.string().optional(),
    phoneLockPassword: z.string().optional(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddRepairFormInputs>({
    resolver: zodResolver(schema),
  });

  const { data: customers } = useCustomers();
  const { data: spareParts } = useSpareParts();
  const { mutateAsync, error } = useCreateRepair({
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

  const submitAction = async (data: AddRepairFormInputs) => {
    await mutateAsync(data);
  };

  return (
    <Modal isLoading={isLoading} open={open} onCancel={onCancel} title={title}>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(submitAction)}
      >
        <FormSelect
          label="Customer"
          name="customer"
          control={control}
          selectValues={customers?.map((customer: CustomerType) => ({
            label: customer.fullName,
            value: customer.uuid,
          }))}
          error={errors.customer}
          showSearch
          filterOption={(inputValue, option) => {
            return (option?.label ?? "")
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase());
          }}
        />
        <FormSelect
          label="Spare Part"
          name="sparePart"
          control={control}
          selectValues={spareParts?.map((sparePart: SparePartType) => ({
            label: `${sparePart.name} (${sparePart.leftAmount})`,
            value: sparePart.uuid,
          }))}
          error={errors.sparePart}
          showSearch
          filterOption={(inputValue, option) => {
            return (option?.label ?? "")
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase());
          }}
        />
        <div className="flex items-center gap-2">
          <FormInput
            name="phoneLockPassword"
            error={errors.phoneLockPassword}
            label="Phone Lock Password"
            control={control}
          />
          <FormInput
            name="simLockPassword"
            error={errors.simLockPassword}
            label="Sim Lock Password"
            control={control}
          />
        </div>

        <FormButton errors={errors}>Save</FormButton>
      </form>
    </Modal>
  );
};

export default AddRepairModal;
