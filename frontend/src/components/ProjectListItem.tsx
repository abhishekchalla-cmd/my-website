import { ProjectSchema } from "@abhishekchalla/schema/project";
import { z } from "zod/v4";

export type ProjectListItemProps = {
  project: z.infer<typeof ProjectSchema.base>;
  sNo: number;
};

export default function ProjectListItem(props: ProjectListItemProps) {
  const {
    sNo,
    project: { name },
  } = props;

  return (
    <div>
      <h2>
        {sNo}. {name}
      </h2>
    </div>
  );
}
