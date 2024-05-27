import { FC } from "react";
import { RepairType } from "@/pages/Repair/types.ts";
import { Button } from "antd";
import { FaCopy } from "react-icons/fa6";

export interface RepairCodeColumnProps extends Pick<RepairType, "code"> {}

export const RepairCodeColumn: FC<RepairCodeColumnProps> = ({ code }) => {
  return (
    <div className="flex items-center gap-1">
      <span>{code}</span>
      <Button
        className="flex items-center text-xs"
        type="primary"
        icon={<FaCopy />}
      />
    </div>
  );
};
