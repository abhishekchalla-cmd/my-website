import z from "zod/v4";
import { OfferingsSchema } from "@abhishekchalla/schema/offerings";
import { NotionRenderer } from "react-notion-x";
import { resolveNotionDBPageMediaUrl } from "@abhishekchalla/services/utils/notion";
import { notionXClient } from "@abhishekchalla/notion/client";

export type OfferingListItemProps = {
  offering: z.infer<typeof OfferingsSchema.base>;
  offeringPageData: Awaited<ReturnType<typeof notionXClient.getPage>>;
};

export const OfferingListItem = (props: OfferingListItemProps) => {
  const { offering, offeringPageData } = props;

  return (
    <div className="flex flex-col gap-y-5">
      <h2>{offering.title}</h2>
      <NotionRenderer
        recordMap={offeringPageData}
        fullPage={false}
        mapImageUrl={resolveNotionDBPageMediaUrl}
        className="notion-no-margins"
      />
    </div>
  );
};
