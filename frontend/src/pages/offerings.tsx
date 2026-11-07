import BaseLayout from "@abhishekchalla/frontend/components/layouts/base";
import {
  OfferingListItem,
  OfferingListItemProps,
} from "@abhishekchalla/frontend/components/OfferingListItem";

export const OfferingsPage = () => {
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
          <OfferingListItem {...o} key={o.title} />
        ))}
      </div>
    </BaseLayout>
  );
};

const offerings: OfferingListItemProps[] = [
  {
    title: "MVP (Minimum Viable Product) Development",
    imageProps: { src: "", alt: "" },
    body: [
      {
        type: "text",
        text: {
          content:
            "Got a big idea? I specialize in rapid prototyping to bring your concepts to market quickly without sacrificing quality. Whether you need to test a new product with early adopters or lay a scalable foundation that can eventually support millions of users, I build robust, high-performance MVPs that help you hit the ground running.",
          link: null,
        },
        plain_text: "",
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: "",
        },
        href: null,
      },
    ],
  },
  {
    title: "Workflow Automation & AI Integration",
    imageProps: { src: "", alt: "" },
    body: [
      {
        type: "text",
        text: {
          content:
            "Stop losing time to manual tasks. I help businesses operate smarter by designing end-to-end workflow automations that connect your favorite apps and services seamlessly. I also specialize in integrating cutting-edge Generative AI directly into your systems—like automated messaging or media generation—making your technology do the heavy lifting while optimizing your operational costs.",
          link: null,
        },
        plain_text: "",
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: "",
        },
        href: null,
      },
    ],
  },
];

export default OfferingsPage;
