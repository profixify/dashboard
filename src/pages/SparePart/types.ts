import type { BaseSparePart } from "@/core/types";
import type { ColumnsType } from "antd/es/table";

export type SparePartType = BaseSparePart;
export type SparePartTableType = ColumnsType<BaseSparePart>;

export type AddSparePartFormInputs = Omit<BaseSparePart, "leftAmount" | "uuid">;
