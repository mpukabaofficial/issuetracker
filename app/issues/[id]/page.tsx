import prisma from "@/prisma/client";
import { Grid } from "@radix-ui/themes";

import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
  params: {
    id: string;
  };
}

const DetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    notFound(); // return is never so you should not return this
  }

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <IssueDetails issue={issue} />
      <EditIssueButton issueId={issue.id} />
    </Grid>
  );
};

export default DetailPage;
