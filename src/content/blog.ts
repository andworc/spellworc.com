import { AstroError } from "astro/errors";
import {
  z,
  type ZodLiteral,
  type ZodNumber,
  type ZodObject,
  type ZodString,
  type ZodUnion,
} from "astro/zod";

export const blogAuthorSchema = z.object({
  name: z.string().min(1),
  title: z.string().optional(),
  picture: z.string().optional(),
  url: z.string().url().optional(),
});

export const blogEntrySchema = ({ image }: SchemaContext) =>
  z.object({
    authors: z
      .union([
        z.string(),
        blogAuthorSchema,
        z.array(z.union([z.string(), blogAuthorSchema])),
      ])
      .optional(),
    date: z.date(),
    excerpt: z.string().optional(),
    tags: z.string().array().optional(),
    cover: z
      .union([
        z.object({ alt: z.string(), image: image() }),
        z.object({ alt: z.string(), dark: image(), light: image() }),
      ])
      .optional(),
    featured: z.boolean().optional(),
  });

export function blogSchema(context: SchemaContext) {
  // Checking for `context` to provide a better migration error message.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!context) {
    throw new AstroError(
      "Missing blog schema validation context.",
      `You may need to update your content collections configuration in the \`src/content/config.ts\` file and pass the context to the \`blogSchema\` function:

\`docs: defineCollection({ schema: docsSchema({ extend: (context) => blogSchema(context) }) })\`

If you believe this is a bug, please file an issue at https://github.com/HiDeoo/starlight-blog/issues/new/choose`,
    );
  }

  return blogEntrySchema(context).partial();
}

export type StarlightBlogAuthor = z.infer<typeof blogAuthorSchema>;

interface SchemaContext {
  image: ImageFunction;
}

// https://github.com/withastro/astro/blob/7d597506615fa5a34327304e8321be7b9c4b799d/packages/astro/src/assets/types.ts#L34-L42
type ImageFunction = () => ZodObject<{
  src: ZodString;
  width: ZodNumber;
  height: ZodNumber;
  format: ZodUnion<
    [
      ZodLiteral<"png">,
      ZodLiteral<"jpg">,
      ZodLiteral<"jpeg">,
      ZodLiteral<"tiff">,
      ZodLiteral<"webp">,
      ZodLiteral<"gif">,
      ZodLiteral<"svg">,
      ZodLiteral<"avif">,
    ]
  >;
}>;
