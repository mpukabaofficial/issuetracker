import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueActions = () => {
  return (
    <div className="mb-4">
      <Button>
        <Link href="/issues/new">Add new issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
