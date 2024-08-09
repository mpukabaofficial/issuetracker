"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) {
    console.error("Failed to fetch users", error);
    return <div>Failed to load users</div>; // Basic error message
  }

  const handleAssingeeChange = (userId: string) => {
    axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId || null,
      })
      .catch((error) => {
        console.error("Failed to update assignee", error);
        toast.error("Failed to update assignee");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""} // Default value is the current assignee
        onValueChange={handleAssingeeChange}
      >
        <Select.Trigger placeholder="Assign user"></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="">Unassign</Select.Item>
            {users?.length ? (
              users.map((user) => (
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              ))
            ) : (
              <Select.Item disabled value="">
                No users available
              </Select.Item>
            )}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("/api/users");
      return response.data;
    },
    staleTime: 1000 * 60, // 1 minute
    retry: 3,
  });

export default AssigneeSelect;
