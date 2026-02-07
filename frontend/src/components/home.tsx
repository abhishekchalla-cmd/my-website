import {
  createScrollSection,
  ScrollSectionComponent,
} from "@/utils/scroll-section";
import Intro from "@/components/sections/intro";
import Offerings from "@/components/sections/offerings";
import { useScrollSectionHandler } from "@/utils/scroll-section/use-scroll-section-handler";

const Home: ScrollSectionComponent = ({ section }) => {
  const { sectionScrollLength } = useScrollSectionHandler(section);

  return (
    <div>
      {section.children.map((section) => (
        <div style={{ position: "fixed", height: "100vh", width: "100%" }}>
          <section.section.component
            key={section.instanceId}
            section={section.section}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;

createScrollSection(Home, [Intro, Offerings], undefined, "home");
