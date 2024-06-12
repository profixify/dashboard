import { BaseModel } from "@/core/types/base.ts";

export interface BaseCompany extends BaseModel {
  name: string;
  address: string;
  taxNumber: string;
}
