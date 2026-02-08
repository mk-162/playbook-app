import { Octokit } from "@octokit/rest";

export interface RepoInfo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  isPrivate: boolean;
  defaultBranch: string;
  updatedAt: string;
  hasPlaybook: boolean;
}

export interface PlaybookFile {
  name: string;
  path: string;
  type: "file" | "dir";
  size?: number;
  content?: string;
}

export interface PlaybookContext {
  section: string;
  content: string;
  path: string;
}

export interface PlaybookSOP {
  name: string;
  content: string;
  path: string;
}

export interface PlaybookSkill {
  name: string;
  content: string;
  path: string;
}

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  state: "open" | "closed";
  htmlUrl: string;
  createdAt: string;
  updatedAt: string;
  labels: {
    id: number;
    name: string;
    color: string;
  }[];
  user: {
    login: string;
    avatarUrl: string;
  };
}

export class GitHubService {
  private octokit: Octokit;

  constructor(accessToken: string) {
    this.octokit = new Octokit({ auth: accessToken });
  }

  /**
   * Get all repos the user has access to
   */
  async getRepos(): Promise<RepoInfo[]> {
    const { data } = await this.octokit.repos.listForAuthenticatedUser({
      sort: "updated",
      per_page: 100,
    });

    // Check each repo for a playbook structure
    const repos = await Promise.all(
      data.map(async (repo) => {
        const hasPlaybook = await this.checkForPlaybook(repo.owner.login, repo.name);
        return {
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          isPrivate: repo.private,
          defaultBranch: repo.default_branch,
          updatedAt: repo.updated_at || "",
          hasPlaybook,
        };
      })
    );

    return repos;
  }

  /**
   * Check if a repo has a playbook structure (context/, sops/, or skills/)
   */
  async checkForPlaybook(owner: string, repo: string): Promise<boolean> {
    try {
      const { data } = await this.octokit.repos.getContent({
        owner,
        repo,
        path: "",
      });

      if (!Array.isArray(data)) return false;

      const dirs = data.filter((item) => item.type === "dir").map((item) => item.name);
      return dirs.includes("context") || dirs.includes("sops") || dirs.includes("skills");
    } catch {
      return false;
    }
  }

  /**
   * Get the playbook structure for a repo
   */
  async getPlaybookStructure(owner: string, repo: string): Promise<PlaybookFile[]> {
    try {
      const { data } = await this.octokit.repos.getContent({
        owner,
        repo,
        path: "",
      });

      if (!Array.isArray(data)) return [];

      return data.map((item) => ({
        name: item.name,
        path: item.path,
        type: item.type as "file" | "dir",
        size: item.size,
      }));
    } catch {
      return [];
    }
  }

  /**
   * Get contents of a directory
   */
  async getDirectoryContents(owner: string, repo: string, path: string): Promise<PlaybookFile[]> {
    try {
      const { data } = await this.octokit.repos.getContent({
        owner,
        repo,
        path,
      });

      if (!Array.isArray(data)) return [];

      return data.map((item) => ({
        name: item.name,
        path: item.path,
        type: item.type as "file" | "dir",
        size: item.size,
      }));
    } catch {
      return [];
    }
  }

  /**
   * Get file content
   */
  async getFileContent(owner: string, repo: string, path: string): Promise<string | null> {
    try {
      const { data } = await this.octokit.repos.getContent({
        owner,
        repo,
        path,
      });

      if (Array.isArray(data) || data.type !== "file") return null;

      // Content is base64 encoded
      return Buffer.from(data.content, "base64").toString("utf-8");
    } catch {
      return null;
    }
  }

  /**
   * Get all context files
   */
  async getContextFiles(owner: string, repo: string): Promise<PlaybookContext[]> {
    const files = await this.getDirectoryContents(owner, repo, "context");
    const contexts: PlaybookContext[] = [];

    for (const file of files) {
      if (file.type === "file" && file.name.endsWith(".md")) {
        const content = await this.getFileContent(owner, repo, file.path);
        if (content) {
          contexts.push({
            section: file.name.replace(".md", ""),
            content,
            path: file.path,
          });
        }
      }
    }

    return contexts;
  }

  /**
   * Get all SOPs
   */
  async getSOPs(owner: string, repo: string): Promise<PlaybookSOP[]> {
    const files = await this.getDirectoryContents(owner, repo, "sops");
    const sops: PlaybookSOP[] = [];

    for (const file of files) {
      if (file.type === "file" && file.name.endsWith(".md")) {
        const content = await this.getFileContent(owner, repo, file.path);
        if (content) {
          sops.push({
            name: file.name.replace(".md", ""),
            content,
            path: file.path,
          });
        }
      }
    }

    return sops;
  }

  /**
   * Get all Skills
   */
  async getSkills(owner: string, repo: string): Promise<PlaybookSkill[]> {
    const files = await this.getDirectoryContents(owner, repo, "skills");
    const skills: PlaybookSkill[] = [];

    for (const file of files) {
      if (file.type === "dir") {
        // Skills are typically directories with SKILL.md
        const skillContent = await this.getFileContent(owner, repo, `${file.path}/SKILL.md`);
        if (skillContent) {
          skills.push({
            name: file.name,
            content: skillContent,
            path: file.path,
          });
        }
      } else if (file.name.endsWith(".md")) {
        const content = await this.getFileContent(owner, repo, file.path);
        if (content) {
          skills.push({
            name: file.name.replace(".md", ""),
            content,
            path: file.path,
          });
        }
      }
    }

    return skills;
  }

  /**
   * Get issues from a repository
   */
  async getIssues(owner: string, repo: string): Promise<GitHubIssue[]> {
    try {
      const { data } = await this.octokit.issues.listForRepo({
        owner,
        repo,
        state: "all",
        per_page: 100,
        sort: "updated",
      });

      return data.map((issue) => ({
        id: issue.id,
        number: issue.number,
        title: issue.title,
        state: issue.state as "open" | "closed",
        htmlUrl: issue.html_url,
        createdAt: issue.created_at,
        updatedAt: issue.updated_at,
        labels: issue.labels.map((label) => 
          typeof label === "string" 
            ? { id: 0, name: label, color: "000000" }
            : { id: label.id || 0, name: label.name || "", color: label.color || "000000" }
        ),
        user: {
          login: issue.user?.login || "unknown",
          avatarUrl: issue.user?.avatar_url || "",
        },
      }));
    } catch (error) {
      console.error("Error fetching issues:", error);
      return [];
    }
  }
}
