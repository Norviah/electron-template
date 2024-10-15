import { z } from 'zod';

export const Database = z.object({
  dimensions: z.object({
    width: z.number(),
    height: z.number(),
  }),
});

export type Database = z.infer<typeof Database>;
