import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string(),
  address: z.string(),
  taxNumber: z.string(),
});

export const editCompanySchema = createCompanySchema.extend({
  uuid: z.string(),
});
