import Modal, { ModalProps } from "@/components/Modal";
import { FC } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSelect from "@/components/Form/FormSelect.tsx";
import { FormButton } from "@/components/Form/FormButton.tsx";
import { repairStatusOptions } from "@/core/consts/currency.ts";
import { UpdateRepairStatusFormInputs } from "@/pages/Repair/types.ts";
import { useUpdateRepairStatus } from "@/services/Repair.ts";
import { useParams } from "react-router-dom";
import { useNotification } from "@/hooks";

interface UpdateRepairStatusModalProps extends ModalProps {
  toggleLoading: () => void;
}

const UpdateRepairStatusModal: FC<UpdateRepairStatusModalProps> = ({
  isLoading,
  open,
  onCancel,
  title,
  toggleLoading,
}) => {
  const { uuid } = useParams();
  const { toast } = useNotification();
  const { mutateAsync, error } = useUpdateRepairStatus({
    uuid,
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
  const schema = z.object({
    status: z.string(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateRepairStatusFormInputs>({
    resolver: zodResolver(schema),
  });
  const submitAction = async (data: UpdateRepairStatusFormInputs) => {
    await mutateAsync(data);
  };
  return (
    <Modal isLoading={isLoading} open={open} onCancel={onCancel} title={title}>
      <form onSubmit={handleSubmit(submitAction)}>
        <FormSelect
          name="status"
          control={control}
          label="Repair Status"
          selectValues={repairStatusOptions}
          error={errors.status}
        />
        <FormButton errors={errors}>Save</FormButton>
      </form>
    </Modal>
  );
};

export default UpdateRepairStatusModal;
