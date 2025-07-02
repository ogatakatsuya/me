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
		theme: z
			.enum(["green", "blue", "gray", "beige", "brown"])
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
	}),
});

export const collections = {
	blog,
	talk,
};
