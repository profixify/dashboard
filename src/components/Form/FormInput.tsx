import * as Antd from "antd";
import { FC } from "react";
import { Controller } from "react-hook-form";
import { FormInputProps } from "@/components/Form/types.ts";

export const FormInput: FC<FormInputProps> = ({
  label,
  name,
  control,
  error,
  placeholder,
  inputType = "text",
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className={error ? "text-red-600" : undefined} htmlFor="">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          if (inputType === "password") {
            return (
              <Antd.Input.Password
                status={error ? "error" : undefined}
                placeholder={placeholder ?? label}
                {...field}
              />
            );
          } else if (inputType === "number") {
            return (
              <Antd.InputNumber
                className="w-full"
                status={error ? "error" : undefined}
                placeholder={placeholder ?? label}
                {...field}
              />
            );
          }
          return (
            <Antd.Input
              status={error ? "error" : undefined}
              placeholder={placeholder ?? label}
              {...field}
            />
          );
        }}
      />
      <span className={error ? "text-red-600" : undefined}>
        {error?.message}
      </span>
    </div>
  );
};
