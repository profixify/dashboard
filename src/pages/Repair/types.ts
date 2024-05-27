import type { BaseRepair } from "@/core/types";
import type { ColumnsType } from "antd/es/table";

export type RepairType = BaseRepair;
export type RepairTableType = ColumnsType<BaseRepair>;

export type UpdateRepairStatusFormInputs = Pick<BaseRepair, "status">;
