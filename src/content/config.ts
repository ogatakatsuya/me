import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
	schema: z.object({
		fileName: z.string(),
		title: z.string(),
		date: z.coerce.date(),
		tags: z.array(z.string()),
		summary: z.string(),
		theme: z
			.enum(["tech", "idea", "diary", "info", "default"])
			.default("default"),
	}),
});

const talk = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/talk" }),
	schema: z.object({
		fileName: z.string(),
		title: z.string(),
		date: z.coerce.date(),
		summary: z.string(),
		tags: z.array(z.string()),
	}),
});

export const collections = {
	blog,
	talk,
};
