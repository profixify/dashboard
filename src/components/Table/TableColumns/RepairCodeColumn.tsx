import { useNotification } from "@/hooks";
import { RepairType } from "@/pages/Repair/types.ts";
import { Tooltip } from "antd";

import { FC } from "react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
export interface RepairCodeColumnProps extends Pick<RepairType, "code"> {}

export const RepairCodeColumn: FC<RepairCodeColumnProps> = ({ code }) => {
  const { toast } = useNotification();
  const copyAction = (repairCode: string) => {
    navigator.clipboard.writeText(repairCode);
    toast.success(`${repairCode} copied`);
  };
  return (
    <div className="flex items-center gap-1 hover:cursor-pointer">
      <span onClick={() => copyAction(code)}>{code}</span>
      <Tooltip title="Click to copy service code">
        <HiOutlineQuestionMarkCircle onClick={() => copyAction(code)} />
      </Tooltip>
    </div>
  );
};
