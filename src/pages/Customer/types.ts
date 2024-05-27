import { BaseCustomer, BaseRepair } from "@/core/types";
import { ColumnsType } from "antd/es/table";

export type CustomerType = BaseCustomer;
export type CustomerTableType = BaseCustomer;
export type CustomerRepairType = Omit<BaseRepair, "customer">;
export type CustomerRepairTableType = ColumnsType<Omit<BaseRepair, "customer">>;

export type CreateCustomerType = Omit<BaseCustomer, "uuid" | "fullName">;
export type CreateCustomerFormType = CreateCustomerType & {
  countryCode: string;
};
