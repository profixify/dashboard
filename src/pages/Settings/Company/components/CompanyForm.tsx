import {
  CompanyType,
  EditCompanyInputs,
} from "@/pages/Settings/Company/types.ts";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCompanySchema } from "@/pages/Settings/Company/schema.ts";
import { FormInput } from "@/components/Form/FormInput.tsx";
import { FormButton } from "@/components/Form/FormButton.tsx";
import { useEditCompany } from "@/services/Company.ts";

interface CompanyFormType {
  data?: CompanyType;
}

type CompanyProps = FC<CompanyFormType>;

const CompanyForm: CompanyProps = ({ data }) => {
  const { mutateAsync } = useEditCompany();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCompanyInputs>({
    resolver: zodResolver(editCompanySchema),
    defaultValues: data,
  });
  const submitAction = async (data: EditCompanyInputs) => {
    await mutateAsync({ ...data, uuid: data.uuid });
  };
  return (
    <form className="w-1/4" onSubmit={handleSubmit(submitAction)}>
      <FormInput
        name="name"
        error={errors.name}
        label="Name"
        control={control}
      />
      <FormInput
        name="address"
        error={errors.address}
        label="Address"
        control={control}
        inputType="textarea"
      />
      <FormInput
        name="taxNumber"
        error={errors.taxNumber}
        label="Tax Number"
        control={control}
      />
      <FormButton errors={errors}>Save</FormButton>
    </form>
  );
};

export default CompanyForm;
