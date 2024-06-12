import { z } from "zod";

export const editCompanySchema = z.object({
  uuid: z.string().optional(),
  name: z.string(),
  address: z.string(),
  taxNumber: z.string(),
});
