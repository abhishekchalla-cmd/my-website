import {
  computeActiveSectionsPath,
  getSection,
  ScrollSection,
  ScrollSectionComponent,
} from "@/utils/scroll-section";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createContext } from "use-context-selector";
import { useEventListener } from "usehooks-ts";

export const ScrollSectionHandlerContext = createContext({
  maxScrollY: 0,
});

export const ScrollSectionHandlerContextProvider = ({
  indexSectionComponent,
  children,
}: {
  indexSectionComponent: ScrollSectionComponent;
  children: ({
    body,
    maxScrollY,
  }: {
    body: React.ReactNode;
    maxScrollY: number;
  }) => React.ReactNode;
}) => {
  /*



  Initial State



  */
  const [indexSection, setIndexSection] = useState<ScrollSection | null>(null);
  useEffect(() => {
    setIndexSection(getSection(indexSectionComponent));
  }, [indexSectionComponent]);

  const [maxScrollY, setMaxScrollY] = useState(0);
  useEffect(() => {
    // Wrapped this logic in useEffect so that window object is available
    if (indexSection) {
      setMaxScrollY(indexSection.totalScrollLength);
      computeAndSetActiveSectionsPath(window.scrollY, window.innerHeight);
    }
  }, [indexSection]);

  /*



  Scroll variable state



  */
  const [activeSectionsPath, setActiveSectionsPath] = useState<ScrollSection[]>(
    []
  );
  const computeAndSetActiveSectionsPath = useCallback(
    (scrollY: number, viewportHeight: number) => {
      if (indexSection) {
        setActiveSectionsPath(
          computeActiveSectionsPath(scrollY, indexSection, viewportHeight)
        );
      }
    },
    [indexSection]
  );

  useEventListener("scroll", (event) => {
    computeAndSetActiveSectionsPath(window.scrollY, window.innerHeight);
  });

  useEffect(() => {
    console.log(activeSectionsPath);
  }, [activeSectionsPath]);

  /*



  Render body



  */

  const body = useMemo(
    () => indexSection && <indexSection.component section={indexSection!} />,
    [indexSection]
  );

  return (
    <ScrollSectionHandlerContext.Provider value={{ maxScrollY }}>
      {children({ body, maxScrollY })}
    </ScrollSectionHandlerContext.Provider>
  );
};
