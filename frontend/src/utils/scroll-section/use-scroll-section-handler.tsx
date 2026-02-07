import { useEffect, useState } from "react";
import { ScrollSection } from ".";
import { useContextSelector } from "use-context-selector";
import { ScrollSectionHandlerContext } from "@/contexts/scroll-section-handler";

export const useScrollSectionHandler = (section: ScrollSection) => {
  const [sectionScrollLength, setSectionScrollLength] = useState(0);
  const maxScrollY = useContextSelector(
    ScrollSectionHandlerContext,
    (state) => state.maxScrollY
  );

  useEffect(() => {
    setSectionScrollLength(section.totalScrollLength);
  }, []);

  return { sectionScrollLength };
};
