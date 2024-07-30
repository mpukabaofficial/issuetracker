import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

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
    <div>
      <Heading>{issue.title}</Heading>
      <IssueStatusBadge status={issue.status} />
      <Flex gap="4">
        <Text>{issue.createdAt.toDateString()}</Text>
        <Text>{issue.description}</Text>
      </Flex>
      <Card>
        <Text>{issue.description}</Text>
      </Card>
    </div>
  );
};

export default DetailPage;
