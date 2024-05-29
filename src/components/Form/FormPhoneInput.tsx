import { FormPhoneInputProps } from "@/components/Form/types.ts";
import countries from "@/core/consts/countries.json";
import { Input, Select } from "antd";
import type { DefaultOptionType } from "rc-select/lib/Select";
import { FC } from "react";
import { Controller } from "react-hook-form";

interface Country {
  name: string;
  flag: string;
  code: string;
  dialCode: string;
}
type OptionType = DefaultOptionType & Country;

const _countries: Array<OptionType> = countries.map((country) => ({
  label: (
    <div className="flex gap-2 items-center" key={country.dialCode}>
      <span className="text-lg">{country.flag}</span>
      <span>{country.name}</span>
    </div>
  ),
  value: country.code,
  ...country,
}));

const FormPhoneInput: FC<FormPhoneInputProps> = ({
  label,
  name,
  control,
  errors,
  placeholder,
}) => {
  return (
    <div className="flex flex-col">
      <label
        className={
          errors.phoneNumber || errors.countryCode ? "text-red-600" : undefined
        }
      >
        {label}
      </label>
      <div className="flex gap-2">
        <div className="flex flex-col w-full">
          <Controller
            name={name.countryCode}
            control={control}
            render={({ field }) => {
              return (
                <Select
                  className="w-full"
                  options={_countries}
                  filterOption={(inputValue, option?: OptionType) => {
                    return (
                      (option?.name ?? "")
                        .toLowerCase()
                        .includes(inputValue.toLowerCase()) ||
                      (option?.code.toLowerCase() ?? "") ===
                        inputValue.toLowerCase() ||
                      (option?.dialCode ?? "").includes(inputValue)
                    );
                  }}
                  showSearch
                  status={errors.countryCode?.message ? "error" : undefined}
                  onChange={field.onChange}
                />
              );
            }}
          />
          <span className={errors.countryCode ? "text-red-600" : undefined}>
            {errors.countryCode?.message}
          </span>
        </div>
        <div className="flex flex-col w-full">
          <Controller
            name={name.phoneNumber}
            control={control}
            render={({ field }) => {
              return (
                <Input
                  placeholder={placeholder ?? label}
                  className="w-full"
                  status={errors.phoneNumber ? "error" : undefined}
                  {...field}
                />
              );
            }}
          />
          <span className={errors.phoneNumber ? "text-red-600" : undefined}>
            {errors.phoneNumber?.message}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FormPhoneInput;
