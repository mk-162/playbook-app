# MVP: Simple GitHub Issues List

## Summary
Replace dummy task cards with a real, simple list of GitHub Issues. No fancy cards, no animations — just working data.

## Issue Reference
https://github.com/mk-162/162-playbook/issues/48

## What to Build

### 1. Add `getIssues()` to `src/lib/github.ts`

```typescript
/**
 * Get issues from a repo
 */
async getIssues(owner: string, repo: string) {
  const { data } = await this.octokit.issues.listForRepo({
    owner,
    repo,
    state: "open",
    per_page: 50,
  });
  return data;
}
```

### 2. Create API route `src/app/api/issues/[owner]/[repo]/route.ts`

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { GitHubService } from "@/lib/github";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { owner: string; repo: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const github = new GitHubService(session.accessToken);
  const issues = await github.getIssues(params.owner, params.repo);
  return NextResponse.json(issues);
}
```

### 3. Simplify Dashboard to show real issues

Replace the complex card layout in `src/components/features/Dashboard.tsx` with:

```tsx
// Fetch issues from API
const [issues, setIssues] = useState([]);

useEffect(() => {
  fetch(`/api/issues/${owner}/${repo}`)
    .then(res => res.json())
    .then(setIssues);
}, [owner, repo]);

// Render simple list
<ul className="divide-y divide-[--color-border]">
  {issues.map(issue => (
    <li key={issue.id} className="py-3 px-4 flex justify-between items-center hover:bg-[--color-surface]">
      <a href={issue.html_url} target="_blank" rel="noopener" className="font-medium hover:text-primary">
        {issue.title}
      </a>
      <div className="flex gap-2">
        {issue.labels.map(label => (
          <span 
            key={label.id} 
            className="text-xs px-2 py-0.5 rounded"
            style={{backgroundColor: `#${label.color}20`, color: `#${label.color}`}}
          >
            {label.name}
          </span>
        ))}
      </div>
    </li>
  ))}
</ul>
```

### 4. Hide non-working pages

In `src/components/layout/Sidebar.tsx`, remove or comment out the Timeline link until it's functional.

## Acceptance Criteria
- [ ] Dashboard fetches real GitHub Issues from the connected repo
- [ ] Issues display as a simple list with title and labels
- [ ] Clicking an issue opens it on GitHub
- [ ] No dummy/hardcoded task data remains
- [ ] Works on mobile

## Notes
- The user already selects a repo after login — use that context
- `GitHubService` class exists, just add the method
- Keep styling minimal — match existing CSS variables
