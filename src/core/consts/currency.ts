import {
  CURRENCY,
  type FormSelectCurrencyOptionsType,
  type FormSelectRepairStatusOptionsType,
  REPAIR_STATUS,
} from "../types";

export const defaultCurrencyOptions: FormSelectCurrencyOptionsType[] = [
  { value: CURRENCY.DOLLAR, label: "$" },
  { value: CURRENCY.EURO, label: "€" },
  { value: CURRENCY.TURKISH_LIRA, label: "₺" },
];

export const repairStatusOptions: FormSelectRepairStatusOptionsType[] = [
  { value: REPAIR_STATUS.WAITING_REPAIRING, label: "Waiting Repair" },
  { value: REPAIR_STATUS.REPAIRING, label: "Repairing" },
  { value: REPAIR_STATUS.REPAIRED, label: "Repaired" },
];
