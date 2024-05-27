interface BaseModel {
  uuid: string;
}
export interface BaseCustomer extends BaseModel {
  name: string;
  surname: string;
  fullName?: string;
  identityNumber: string;
  phoneNumber: string;
}

export interface BaseSparePart extends BaseModel {
  name: string;
  priceWithCurrency: string;
  amount: number;
  leftAmount: number;
}

export interface BaseRepair extends BaseModel {
  customer: BaseCustomer;
  code: string;
  sparePart: BaseSparePart;
  simLockPassword: string;
  phoneLockPassword: string;
  status?: "WAITING_REPAIR" | "REPAIRING" | "REPAIRED";
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
  WAITING_REPAIRING: "WAITING_REPAIRING",
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
