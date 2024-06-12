import { BaseCompany } from "@/core/types/Company.ts";
import { ColumnsType } from "antd/es/table";

export type CompanyType = BaseCompany;
export type CompanyTableType = ColumnsType<CompanyType>;
export type CreateCompanyInputs = Omit<CompanyType, "uuid">;
export type EditCompanyInputs = CompanyType;
