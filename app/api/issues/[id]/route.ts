import authoptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Uncomment and configure session handling if needed
  // const session = await getServerSession(authoptions);
  // if (!session)
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  // Validate the request body
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const { title, description, assignedToUserId } = body as Issue;

  // Check if the assigned user exists
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  }

  // Check if the issue exists
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  // Update the issue
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  // Return the updated issue as a JSON response
  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authoptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    const deleted = await prisma.issue.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ message: "Issue deleted", data: deleted });
  } catch (error) {
    console.error("Error deleting issue:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
