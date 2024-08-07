"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { useForm, Controller, set } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import z from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>; // IssueForm

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setIsSubmitting(false);
      setError("An error occurred while submitting the issue");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <TextField.Root>
          <TextField.Input
            placeholder="Enter your issue title"
            {...register("title")}
            defaultValue={issue?.title}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Enter your issue description" {...field} />
          )}
          defaultValue={issue?.description}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>
          {issue ? "Update Issue" : "Submit new issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
