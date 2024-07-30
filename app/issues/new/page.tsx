"use client";
import { Button, TextField } from "@radix-ui/themes";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-4">
      <TextField.Root>
        <TextField.Input placeholder="Enter your issue title" />
      </TextField.Root>
      <SimpleMDE placeholder="Enter your issue description" />
      <Button>Submit new issue</Button>
    </div>
  );
};

export default NewIssuePage;
