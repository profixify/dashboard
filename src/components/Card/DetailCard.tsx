import { Card, CardProps } from "antd";
import { cn } from "@/core/libs/utils";

interface DetailCardProps extends CardProps {}

export const DetailCard: React.FC<DetailCardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <Card className={cn("[&>.ant-card-head]:min-h-10", className)} {...props}>
      {children}
    </Card>
  );
};
