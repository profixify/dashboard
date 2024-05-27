import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import countries from "@/core/consts/countries.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPhoneCodeByCountryName = (countryCode: string) => {
  const country = countries.find((country) => countryCode === country.code);
  return country?.dialCode;
};
