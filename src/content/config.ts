import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
	schema: z.object({
		slug: z.string(),
		title: z.string(),
		createdAt: z.coerce.date(),
		updatedAt: z.coerce.date().optional(),
		tags: z.array(z.string()),
		summary: z.string(),
		/*
			green: ai/ml
			blue: poem
			gray: web development
			beige: life
			brown: others
		*/
		theme: z.enum(["green", "blue", "gray", "beige", "brown"]),
	}),
});

const talk = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/talk" }),
	schema: z.object({
		slug: z.string(),
		title: z.string(),
		createdAt: z.coerce.date(),
		updatedAt: z.coerce.date().optional(),
		summary: z.string(),
		tags: z.array(z.string()),
		speakerDeckId: z.string(),
	}),
});

const product = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/product" }),
	schema: z.object({
		slug: z.string(),
		title: z.string(),
		description: z.string(),
		link: z.string().url().optional(),
		image: z.string(),
	}),
});

export const collections = {
	blog,
	talk,
	product,
};
