"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-4">
      <TextField.Root>
        <TextField.Input placeholder="Enter your issue title" />
      </TextField.Root>
      <TextArea placeholder="Enter your issue description" />
      <Button>Submit new issue</Button>
    </div>
  );
};

export default NewIssuePage;
