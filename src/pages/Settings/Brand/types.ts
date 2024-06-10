import { BaseSparePartBrand } from "@/core/types";
import { ColumnsType } from "antd/es/table";

export type BrandType = BaseSparePartBrand;
export type BrandTableType = ColumnsType<BrandType>;
export type CreateBrandFormInputs = Omit<BrandType, "uuid">;
export type EditBrandFormInputs = BrandType;
