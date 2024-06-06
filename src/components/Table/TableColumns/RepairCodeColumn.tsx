import { useNotification } from "@/hooks";
import { RepairType } from "@/pages/Repair/types.ts";
import { Tooltip } from "antd";

import { FC } from "react";
import { PiQuestionDuotone } from "react-icons/pi";
export interface RepairCodeColumnProps extends Pick<RepairType, "code"> {}

export const RepairCodeColumn: FC<RepairCodeColumnProps> = ({ code }) => {
  const { toast } = useNotification();
  const copyAction = async (repairCode: string) => {
    await navigator.clipboard.writeText(repairCode);
    toast.success(`${repairCode} copied`);
  };
  return (
    <div className="flex items-center gap-1 hover:cursor-pointer">
      <span onClick={() => copyAction(code)}>{code}</span>
      <Tooltip title="Click to copy service code" color="blue">
        <PiQuestionDuotone
          className="text-xl hover:text-blue-600"
          onClick={() => copyAction(code)}
        />
      </Tooltip>
    </div>
  );
};
