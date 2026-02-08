import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { GitHubService } from "@/lib/github";

export async function GET() {
  const session = await getServerSession();

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const github = new GitHubService(session.accessToken as string);
    const repos = await github.getRepos();

    // Sort: playbooks first, then by updated
    repos.sort((a, b) => {
      if (a.hasPlaybook && !b.hasPlaybook) return -1;
      if (!a.hasPlaybook && b.hasPlaybook) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return NextResponse.json(repos);
  } catch (error) {
    console.error("Failed to fetch repos:", error);
    return NextResponse.json({ error: "Failed to fetch repos" }, { status: 500 });
  }
}
