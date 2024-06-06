import type { BaseRepair, BaseRepairStatus } from "@/core/types";
import type { ColumnsType } from "antd/es/table";

export type RepairType = BaseRepair;
export type RepairTableType = ColumnsType<BaseRepair>;

export type UpdateRepairStatusFormInputs = Omit<
  BaseRepairStatus,
  "uuid" | "createdAt"
>;

export type RepairStatusTableType = ColumnsType<BaseRepairStatus>;
