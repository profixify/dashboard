import { z } from "zod";

export const createBrandSchema = z.object({
  name: z.string(),
});
export const editBrandSchema = createBrandSchema.extend({
  uuid: z.string(),
});
