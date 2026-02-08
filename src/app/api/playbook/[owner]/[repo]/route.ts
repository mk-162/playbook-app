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
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section"); // context, sops, skills, or null for structure

  try {
    const github = new GitHubService(session.accessToken as string);

    if (section === "context") {
      const contexts = await github.getContextFiles(owner, repo);
      return NextResponse.json(contexts);
    }

    if (section === "sops") {
      const sops = await github.getSOPs(owner, repo);
      return NextResponse.json(sops);
    }

    if (section === "skills") {
      const skills = await github.getSkills(owner, repo);
      return NextResponse.json(skills);
    }

    // Default: return structure
    const structure = await github.getPlaybookStructure(owner, repo);
    return NextResponse.json(structure);
  } catch (error) {
    console.error("Failed to fetch playbook:", error);
    return NextResponse.json({ error: "Failed to fetch playbook" }, { status: 500 });
  }
}
