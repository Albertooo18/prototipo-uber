import { z } from 'zod';

export const requestServiceSchema = z
  .object({
    originLabel: z
      .string()
      .trim()
      .min(3, 'Indica el origen del servicio'),
    destinationLabel: z
      .string()
      .trim()
      .min(3, 'Indica el destino del servicio')
  })
  .refine(
    (data) => data.originLabel.trim().toLowerCase() !== data.destinationLabel.trim().toLowerCase(),
    {
      message: 'El origen y el destino deben ser diferentes',
      path: ['destinationLabel']
    }
  );

export type RequestServiceFormValues = z.infer<typeof requestServiceSchema>;
