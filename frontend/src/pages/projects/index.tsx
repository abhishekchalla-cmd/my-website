import BaseLayout from "@abhishekchalla/frontend/components/layouts/base";
import { orm } from "@abhishekchalla/services/orm";
import { GetStaticProps } from "next";
import ProjectListItem, {
  ProjectListItemProps,
} from "@abhishekchalla/frontend/components/ProjectListItem";

type ProjectsListingPageProps = {
  projects: ProjectListItemProps["project"][];
};

export default function ProjectsListingPage(
  props: Readonly<ProjectsListingPageProps>,
) {
  const { projects } = props;

  return (
    <BaseLayout title="My Portfolio">
      {projects.map((project, index) => (
        <ProjectListItem key={project.id} project={project} sNo={index + 1} />
      ))}
    </BaseLayout>
  );
}

export const getStaticProps: GetStaticProps<
  ProjectsListingPageProps
> = async () => {
  const projects = await orm.project.getAll({});

  return { props: { projects }, revalidate: false };
};
