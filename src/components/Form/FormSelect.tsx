import { cn } from "@/core/libs/utils";
import { Select, type SelectProps } from "antd";
import type { FC } from "react";
import { Controller, type FieldError } from "react-hook-form";

export interface SelectValueType {
  label: React.ReactNode;
  value: string | number;
}

export interface FormSelectProps extends SelectProps {
  name: string;
  control: any;
  label: string;
  selectValues: SelectValueType[];
  error: FieldError | undefined;
}

const FormSelect: FC<FormSelectProps> = ({
  label,
  name,
  control,
  error,
  selectValues,
  defaultValue,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className={cn(error ? "text-red-500" : undefined)} htmlFor={name}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            status={error ? "error" : undefined}
            id={name}
            options={selectValues}
            defaultValue={defaultValue}
            {...field}
          />
        )}
      />
      <span className="text-xs text-red-500">{error?.message}</span>
    </div>
  );
};

export default FormSelect;
