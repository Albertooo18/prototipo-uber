import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(3, 'Ingresa tu email o telefono'),
  password: z
    .string()
    .min(6, 'La contrasena debe tener al menos 6 caracteres')
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, 'Ingresa tu nombre completo'),
    phone: z
      .string()
      .trim()
      .min(7, 'Ingresa un telefono valido'),
    email: z
      .string()
      .trim()
      .email('Ingresa un email valido'),
    password: z
      .string()
      .min(6, 'La contrasena debe tener al menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'Confirma tu contrasena')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contrasenas no coinciden',
    path: ['confirmPassword']
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
