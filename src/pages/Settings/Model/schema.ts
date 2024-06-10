import { z } from "zod";

export const createModelSchema = z.object({
  name: z.string(),
  brand: z.string(),
});

export const editModelSchema = createModelSchema.extend({
  uuid: z.string(),
});
