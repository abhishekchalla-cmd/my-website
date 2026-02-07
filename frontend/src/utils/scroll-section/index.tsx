/*

A scroll section is a section in the page whose entry is triggered when the users scrolls to a certain threshold.
Requirements to define a scroll section:
  - Scroll threshold
  - Component

On load, the application computes the tree of these sections to compnute the total height of the page.

*/

import { v4 } from "uuid";

export type ScrollLengthDef = {
  value: number;
  unit: "px" | "vh" | "dvh" | "vh" | "dvh";
};

export type ScrollSectionChild = {
  instanceId: string;
  section: ScrollSection;
};

export type ScrollSection = {
  sectionId: string;
  component: ScrollSectionComponent;
  ownScrollLength: ScrollLengthDef;
  children: ScrollSectionChild[];
  totalScrollLength: number;
};

export const sectionGenerators: Map<
  ScrollSectionComponent,
  (...args: any[]) => ScrollSection
> = new Map();

export const generatedSections: Map<ScrollSectionComponent, ScrollSection> =
  new Map();

export const getSection = (sectionComponent: ScrollSectionComponent) => {
  if (generatedSections.has(sectionComponent)) {
    return generatedSections.get(sectionComponent)!;
  } else {
    const newSection = sectionGenerators.get(sectionComponent)!();
    generatedSections.set(sectionComponent, newSection);
    return newSection;
  }
};

export const createScrollSection = (
  component: ScrollSectionComponent,
  children: ScrollSectionComponent[] = [],
  ownScrollLength: ScrollLengthDef = { value: 0, unit: "px" },
  sectionId: string = v4()
) => {
  sectionGenerators.set(component, () => {
    // Creating new section
    const newSection = {
      sectionId,
      component,
      children: children.map((child) => ({
        instanceId: v4(),
        section: getSection(child),
      })),
      ownScrollLength,
      totalScrollLength: 0,
    };

    newSection.totalScrollLength = getSectionScrollLength({
      ...newSection,
      totalScrollLength: 0,
    });

    return newSection;
  });
};

export const getSectionScrollLength = (
  section: ScrollSection,
  forceCalculate: boolean = false
): number => {
  if (section.totalScrollLength && !forceCalculate)
    return section.totalScrollLength;

  const sectionOwnHeight = convertScrollLengthDefToPixel(
    section.ownScrollLength
  );

  if (!section.children.length) return sectionOwnHeight;
  return (
    sectionOwnHeight +
    section.children.reduce((total, cur) => {
      return total + getSectionScrollLength(cur.section, forceCalculate);
    }, 0)
  );
};

export type ScrollSectionComponent = React.FC<{
  section: ScrollSection;
}>;

const convertScrollLengthDefToPixel = (
  scrollLength: ScrollLengthDef
): number => {
  return (
    scrollLength.value *
    (scrollLength.unit === "px"
      ? 1
      : scrollLength.unit === "vh"
      ? window.innerHeight
      : window.innerHeight * 0.01)
  );
};

export const recalculateScrollLengths = (
  section: ScrollSection
): ScrollSection => {
  const newChildren = section.children.map((child) => ({
    ...child,
    section: recalculateScrollLengths(child.section),
  }));

  const newSection = {
    ...section,
    children: newChildren,
    totalScrollLength: 0, // Temporary value that will be recalculated
  };

  newSection.totalScrollLength = getSectionScrollLength(newSection);

  return newSection;
};

export const computeActiveSectionsPath = (
  scrollY: number,
  indexSection: ScrollSection,
  viewportHeight: number
) => {
  const activeSectionsPath: ScrollSection[] = [indexSection];
  let traversedScrollLength = 0;
  for (const child of indexSection.children) {
    if (scrollY > child.section.totalScrollLength + traversedScrollLength) {
      traversedScrollLength += child.section.totalScrollLength;
      continue;
    }
    activeSectionsPath.push(
      ...computeActiveSectionsPath(
        scrollY - traversedScrollLength,
        child.section,
        viewportHeight
      )
    );
    break;
  }
  return activeSectionsPath;
};
