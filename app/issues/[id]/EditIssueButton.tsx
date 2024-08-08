import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  issueId: number;
}

const EditIssueButton = ({ issueId }: Props) => {
  return (
    <Button className="">
      <Pencil2Icon /> <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
