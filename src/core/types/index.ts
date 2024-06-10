interface BaseModel {
  uuid: string;
}
export interface BaseCustomer extends BaseModel {
  firstName: string;
  lastName: string;
  fullName?: string;
  phoneNumber: string;
}

export interface BaseSparePartBrand extends BaseModel {
  name: string;
}

export interface BaseSparePartModel extends BaseModel {
  name: string;
  brand: string;
}

export interface BaseSparePart extends BaseModel {
  name: string;
  brand: string;
  model: string;
  price: string;
  priceWithCurrency: string;
  amount: number;
  leftAmount: number;
  tempAmount: number;
}

export interface BaseRepair extends BaseModel {
  customer: BaseCustomer;
  code: string;
  sparePart: BaseSparePart;
  simLockPassword: string;
  phoneLockPassword: string;
  latestStatus?: "WAITING_REPAIR" | "REPAIRING" | "REPAIRED";
}

export interface BaseRepairStatus extends BaseModel {
  title: string;
  note: string;
  status: string;
  createdAt: string;
}

export interface BaseSparePartBrand extends BaseModel {
  name: string;
}

export interface BaseSparePartModel extends BaseModel {
  name: string;
}

export interface BaseSettings {
  defaultCurrency: string;
}

export interface BaseDashboardCounts {
  waitingRepair: number;
  repairing: number;
  repaired: number;
}

export interface CreateMutationAction {
  onMutate?: () => void;
  onError?: () => void;
  onSuccess?: () => void;
}

export interface UpdateMutationAction extends CreateMutationAction {
  uuid?: string;
}

export const CURRENCY = {
  DOLLAR: "DOLLAR",
  EURO: "EURO",
  TURKISH_LIRA: "TURKISH_LIRA",
} as const;

export const REPAIR_STATUS = {
  WAITING_REPAIR: "WAITING_REPAIR",
  REPAIRING: "REPAIRING",
  REPAIRED: "REPAIRED",
} as const;

export interface FormSelectCurrencyOptionsType {
  value: keyof typeof CURRENCY;
  label: string;
}

export interface FormSelectRepairStatusOptionsType {
  value: keyof typeof REPAIR_STATUS;
  label: string;
}
