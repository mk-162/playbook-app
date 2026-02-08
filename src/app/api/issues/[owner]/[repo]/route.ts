import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { GitHubService } from "@/lib/github";

interface RouteParams {
  params: Promise<{
    owner: string;
    repo: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const session = await getServerSession();

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { owner, repo } = await params;

  try {
    const github = new GitHubService(session.accessToken as string);
    const issues = await github.getIssues(owner, repo);

    return NextResponse.json(issues);
  } catch (error) {
    console.error("Failed to fetch issues:", error);
    return NextResponse.json({ error: "Failed to fetch issues" }, { status: 500 });
  }
}
