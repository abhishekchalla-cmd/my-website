import {
  ScrollSectionComponent,
  createScrollSection,
} from "@/utils/scroll-section";

const OfferingsMVP: ScrollSectionComponent = ({ section }) => {
  return <div>MVP</div>;
};

export default OfferingsMVP;

createScrollSection(
  OfferingsMVP,
  [],
  {
    value: 100,
    unit: "dvh",
  },
  "offerings-mvp"
);
