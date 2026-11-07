import Image, { ImageProps } from "next/image";
import { NotionRichTextPropertySchema } from "@abhishekchalla/notion/schema/properties";
import { NotionRichText } from "@abhishekchalla/notion/ui/rich-text";
import z from "zod/v4";

export type OfferingListItemProps = {
  title: string;
  imageProps: ImageProps;
  body: z.infer<typeof NotionRichTextPropertySchema>["rich_text"];
};

export const OfferingListItem = (props: OfferingListItemProps) => {
  return (
    <div className="flex flex-col gap-y-5">
      <h2>{props.title}</h2>
      <Image {...props.imageProps} alt={props.title} />
      <NotionRichText value={props.body} />
    </div>
  );
};
