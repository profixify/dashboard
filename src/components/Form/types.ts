import { FieldError } from "react-hook-form";

export interface BaseFormInput {
  label: string;
  control: any;
  placeholder?: string;
  inputType?: "text" | "password" | "number" | "textarea";
}

export interface FormInputProps extends BaseFormInput {
  name: string;
  error: FieldError | undefined;
}

export interface FormPhoneInputProps extends BaseFormInput {
  errors: {
    countryCode: FieldError | undefined;
    phoneNumber: FieldError | undefined;
  };
  name: {
    countryCode: string;
    phoneNumber: string;
  };
}
