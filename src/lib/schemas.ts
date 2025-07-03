import { z } from "zod";

export const contactFormSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.min(2, "Name must be at least 2 characters")
		.max(100, "Name must be less than 100 characters")
		.trim(),

	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address")
		.max(255, "Email must be less than 255 characters")
		.trim()
		.toLowerCase(),

	subject: z
		.string()
		.min(1, "Subject is required")
		.min(3, "Subject must be at least 3 characters")
		.max(200, "Subject must be less than 200 characters")
		.trim(),

	message: z
		.string()
		.min(1, "Message is required")
		.min(10, "Message must be at least 10 characters")
		.max(2000, "Message must be less than 2000 characters")
		.trim(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Success response schema
export const contactResponseSchema = z.object({
	success: z.boolean(),
	message: z.string(),
	data: z.optional(z.record(z.any())),
});

export type ContactResponse = z.infer<typeof contactResponseSchema>;
