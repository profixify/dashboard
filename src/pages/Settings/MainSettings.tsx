import type { BaseSettings } from "@/core/types";
import { useNotification } from "@/hooks";
import { useSettings, useUpdateSettings } from "@/services/Settings.ts";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSelect from "@/components/Form/FormSelect.tsx";
import { defaultCurrencyOptions } from "@/core/consts/currency.ts";
import { FormButton } from "@/components/Form/FormButton.tsx";
import { useCompanies } from "@/services/Company.ts";
import { BaseCompany } from "@/core/types/Company.ts";

interface SettingsFormInputs extends BaseSettings {}

const MainSettings = () => {
  const { toast } = useNotification();
  const { data: settings, refetch: refetchSettings } = useSettings();
  const { data: companies } = useCompanies();
  const { mutateAsync: updateSettings, error } = useUpdateSettings({
    onError: () => {
      toast.error("Something went wrong");
      console.error(error);
    },
    onSuccess: () => {
      toast.success("The default currency changed successfully.");
    },
  });
  const schema = z.object({
    defaultCurrency: z.string(),
    company: z.string(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormInputs>({
    resolver: zodResolver(schema),
  });
  const submitAction = async (data: Partial<SettingsFormInputs>) => {
    const response = await updateSettings(data);
    if (response.status === 200) await refetchSettings();
  };
  return (
    <div className="w-1/3">
      {settings && (
        <form onSubmit={handleSubmit(submitAction)}>
          <FormSelect
            name="defaultCurrency"
            control={control}
            label="MainSettings"
            selectValues={defaultCurrencyOptions}
            defaultValue={settings?.defaultCurrency}
            error={errors.defaultCurrency}
          />
          <FormSelect
            name="company"
            control={control}
            label="Company"
            selectValues={companies?.map((company: BaseCompany) => ({
              label: company.name,
              value: company.uuid,
            }))}
            defaultValue={settings?.company}
            error={errors.company}
          />
          <FormButton errors={errors}>Save</FormButton>
        </form>
      )}
    </div>
  );
};

export default MainSettings;
