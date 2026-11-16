import BaseLayout from "@abhishekchalla/frontend/components/layouts/base";
import {
  OfferingListItem,
  OfferingListItemProps,
} from "@abhishekchalla/frontend/components/OfferingListItem";
import { getBlockRecordMap } from "@abhishekchalla/notion/index";
import { orm } from "@abhishekchalla/services/orm";
import { GetStaticProps } from "next";

type OfferingsPageProps = {
  offerings: OfferingListItemProps[];
};

export const OfferingsPage = ({ offerings }: OfferingsPageProps) => {
  return (
    <BaseLayout title="Offerings">
      <p className="mb-20">
        As a Senior Software Developer with over four years of experience, I
        specialize in turning complex technical challenges into scalable,
        intuitive digital solutions that help businesses innovate faster. From
        building high-performance architectures that support millions of users
        to integrating cutting-edge Generative AI and workflow automation, my
        focus is on delivering technology that drives real business value.
        Whether you are looking to launch a Minimum Viable Product quickly,
        streamline your daily operations, or architect a robust backend from
        scratch, I bring the technical clarity and hands-on execution needed to
        bring your vision to life.
      </p>

      <div className="flex flex-col gap-y-10">
        {offerings.map((o) => (
          <OfferingListItem {...o} key={o.offering.id} />
        ))}
      </div>
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps<OfferingsPageProps> = async () => {
  const offeringsRes = await orm.offerings.getAll({});
  const offerings = await Promise.all(
    offeringsRes
      .toSorted((a, b) => (b.order || 0) - (a.order || 0))
      .map(async (offering) => ({
        offering,
        offeringPageData: await getBlockRecordMap(offering.id),
      })),
  );

  console.log(JSON.stringify(offerings, null, 2));

  return {
    props: { offerings },
    revalidate: 600,
  };
};

export default OfferingsPage;
