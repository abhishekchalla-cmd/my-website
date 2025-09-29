/*

A scroll section is a section in the page whose entry is triggered when the users scrolls to a certain threshold.
Requirements to define a scroll section:
  - Scroll threshold
  - Component

On load, the application computes the tree of these sections to compnute the total height of the page.

*/

import { v4 } from "uuid";

export type ScrollSection = {
  sectionId: string;
  parentId: string | null;
  threshold: number;
  component: ScrollSectionComponent;

  parent: ScrollSection | null;
  children: {
    [sectionId: string]: ScrollSection;
  };
};

export function initialiseScrollSectionsHandler() {
  const sections: {
    [sectionId: string]: ScrollSection;
  } = {
    root: {
      sectionId: "root",
      parentId: null,
      parent: null,
      threshold: 0,
      component: () => null,
      children: {},
    },
  };

  const getSectionById = (sectionId: string = "root") => {
    return sections[sectionId];
  };

  const registerSection = (
    threshold: number,
    component: ScrollSectionComponent,
    parentId: string = "root"
  ) => {
    if (parentId && !getSectionById(parentId)) {
      throw new Error(`Parent section ${parentId} not found`);
    }

    // Creating new section
    const newSection = {
      sectionId: v4(),
      parentId,
      parent: parentId ? getSectionById(parentId) : null,
      threshold,
      component,
      children: {},
    };

    // Registering child to parent node
    getSectionById(parentId).children[newSection.sectionId] = newSection;

    return {
      section: newSection,
      registerChildSection: (
        threshold: number,
        component: ScrollSectionComponent
      ) => registerSection(threshold, component, newSection.sectionId),
    };
  };

  return {
    sections,
    registerSection,
    getSectionById,
  };
}

export type ScrollSectionComponent = React.FC<{
  section: ScrollSection;
}>;
