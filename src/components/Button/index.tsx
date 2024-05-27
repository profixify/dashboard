import { cn } from "@/core/libs/utils";
import { Button, ButtonProps } from "antd";
import { FC } from "react";

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
}

export const IconButton: FC<IconButtonProps> = ({
  children,
  icon,
  className,
  ...rest
}) => {
  return (
    <Button
      className={cn(className, "flex items-center")}
      icon={icon}
      {...rest}
    >
      {children}
    </Button>
  );
};
