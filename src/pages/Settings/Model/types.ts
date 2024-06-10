import { BaseSparePartModel } from "@/core/types";
import { ColumnsType } from "antd/es/table";

export type ModelType = BaseSparePartModel;
export type ModelTableType = ColumnsType<ModelType>;
export type CreateModelFormInputs = Omit<ModelType, "uuid">;
export type EditModelFormInputs = ModelType;
