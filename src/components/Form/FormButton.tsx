import * as Antd from "antd";
import type { FC } from "react";
import type { FieldErrors } from "react-hook-form";

interface FormButtonProps extends Antd.ButtonProps {
  errors: FieldErrors;
}

export const FormButton: FC<FormButtonProps> = ({ errors, children }) => {
  return (
    <Antd.Button
      className="mt-3"
      disabled={Object.keys(errors).length > 0}
      type="primary"
      htmlType="submit"
    >
      {children}
    </Antd.Button>
  );
};
