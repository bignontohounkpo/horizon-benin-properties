import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().trim().email("Adresse email invalide").max(255),
  phone: z.string().trim().min(8, "Numéro de téléphone invalide").max(20),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères").max(1000),
  honeypot: z.string().max(0).optional(),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Adresse email invalide").max(255),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
