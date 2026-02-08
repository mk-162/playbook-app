import Link from "next/link";

export default function BrowserReader() {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-background-dark">
      {/* Reader Header (Secondary Header) */}
      <header className="flex h-16 items-center justify-between border-b border-solid border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark px-6 py-3 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <span className="material-symbols-outlined !text-xl">auto_stories</span>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-tight hidden sm:block">Playbook Browser</h2>
          </div>
          <div className="h-4 w-px bg-slate-300 dark:bg-border-dark mx-2"></div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined !text-sm">terminal</span>
            <span className="font-mono">main</span>
          </div>
        </div>
        <div className="flex flex-1 justify-center max-w-xl mx-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 !text-xl">search</span>
            </div>
            <input className="block w-full pl-10 pr-3 py-2 bg-slate-100 dark:bg-background-dark border-none rounded-lg focus:ring-2 focus:ring-primary text-sm placeholder:text-slate-500 text-slate-900 dark:text-slate-100" placeholder="Search knowledge base..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-background-dark hover:bg-slate-200 dark:hover:bg-border-dark transition-colors text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined !text-base">code</span>
            <span>Edit in GitHub</span>
          </button>
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-border-dark overflow-hidden flex items-center justify-center">
             <span className="material-symbols-outlined text-slate-400">person</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (Reader Nav) */}
        <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark overflow-y-auto hidden lg:flex flex-col">
          <div className="p-4 space-y-6">
            <div>
              <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Organization</h3>
              <nav className="space-y-1">
                <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary group">
                  <span className="material-symbols-outlined !text-xl fill-current">home</span>
                  <span className="text-sm font-semibold">Start Here</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-background-dark group">
                  <span className="material-symbols-outlined !text-xl">info</span>
                  <span className="text-sm font-medium">Context</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-background-dark group">
                  <span className="material-symbols-outlined !text-xl">account_tree</span>
                  <span className="text-sm font-medium">Workflows</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-background-dark group">
                  <span className="material-symbols-outlined !text-xl">book</span>
                  <span className="text-sm font-medium">Library</span>
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Folders</h3>
              <div className="space-y-1">
                <details className="group" open>
                  <summary className="flex items-center justify-between px-3 py-2 cursor-pointer list-none text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined !text-lg">folder</span>
                      <span className="text-sm font-medium">Onboarding</span>
                    </div>
                    <span className="material-symbols-outlined !text-sm group-open:rotate-90 transition-transform">chevron_right</span>
                  </summary>
                  <div className="ml-6 mt-1 border-l border-slate-200 dark:border-border-dark space-y-1">
                    <Link href="#" className="block px-4 py-1.5 text-sm text-primary font-medium border-l-2 border-primary -ml-px">Welcome</Link>
                    <Link href="#" className="block px-4 py-1.5 text-sm text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200">System Setup</Link>
                    <Link href="#" className="block px-4 py-1.5 text-sm text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200">Team Rituals</Link>
                  </div>
                </details>
                <div className="flex items-center gap-2 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg cursor-pointer">
                  <span className="material-symbols-outlined !text-lg">folder</span>
                  <span className="text-sm font-medium">Architecture</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg cursor-pointer">
                  <span className="material-symbols-outlined !text-lg">folder</span>
                  <span className="text-sm font-medium">Design Systems</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto p-4">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
              <span className="material-symbols-outlined !text-lg">add</span>
              <span>New Page</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-white dark:bg-background-dark relative custom-scrollbar">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500 mb-8 font-medium">
              <Link href="#" className="hover:text-primary transition-colors">Library</Link>
              <span className="material-symbols-outlined !text-xs">chevron_right</span>
              <Link href="#" className="hover:text-primary transition-colors">Onboarding</Link>
              <span className="material-symbols-outlined !text-xs">chevron_right</span>
              <span className="text-slate-900 dark:text-slate-300">Welcome</span>
            </nav>
            {/* Article Header */}
            <header className="mb-12">
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">Welcome to the Playbook</h1>
              <div className="flex flex-wrap items-center gap-6 py-4 border-y border-slate-100 dark:border-border-dark">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined !text-sm text-primary">smart_toy</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">AI Verified Content</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-500 text-xs">
                  <span className="material-symbols-outlined !text-sm">schedule</span>
                  <span>Last updated 2 days ago</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-500 text-xs">
                  <span className="material-symbols-outlined !text-sm">auto_stories</span>
                  <span>5 min read</span>
                </div>
              </div>
            </header>
            {/* Rendered Markdown Body */}
            <article className="markdown-body font-serif text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
              <p className="text-lg">Welcome to our central knowledge base. This is a living document that serves as the &quot;source of truth&quot; for all team operations. Unlike traditional wikis, this browser pulls directly from our GitHub repository, enabling a <strong>Headless Knowledge Management</strong> workflow where non-technical teams and AI agents can collaborate seamlessly.</p>
              <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 italic bg-primary/5 rounded-r-lg text-slate-600 dark:text-slate-400">
                &quot;Our goal is to treat documentation with the same rigor we treat code: version-controlled, peer-reviewed, and universally accessible.&quot;
              </blockquote>
              <h2 className="text-2xl font-bold font-sans text-slate-900 dark:text-white mt-8 mb-4">Getting Started</h2>
              <p>If you&apos;re new here, we recommend starting with our team rituals. We use a combination of asynchronous updates and focused deep-work sessions. Every decision we make is documented here so that anyone, including our AI copilots, can understand the context of our work.</p>
              <h2 className="text-2xl font-bold font-sans text-slate-900 dark:text-white mt-8 mb-4">Collaborating with AI</h2>
              <p>You will notice various sections marked with the <span className="text-primary font-sans font-bold text-sm">AI Agent</span> badge. These are segments maintained by our internal task runners. If you find an error, simply click &apos;Edit&apos; to submit a change. The system will automatically trigger a pull request for review.</p>
              <div className="my-8 rounded-xl border border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-surface-dark overflow-hidden font-sans">
                <div className="px-6 py-4 bg-slate-100 dark:bg-border-dark/50 border-b border-slate-200 dark:border-border-dark flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-sans">Quick Links</span>
                  <span className="material-symbols-outlined text-slate-400 !text-sm">link</span>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                  <Link href="#" className="p-4 rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-border-dark hover:border-primary transition-all group">
                    <div className="text-primary font-bold mb-1">Standard Operating Procedures</div>
                    <div className="text-xs text-slate-500">Step-by-step guides for common tasks.</div>
                  </Link>
                  <Link href="#" className="p-4 rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-border-dark hover:border-primary transition-all group">
                    <div className="text-primary font-bold mb-1">Brand Identity Portal</div>
                    <div className="text-xs text-slate-500">Logos, fonts, and messaging guidelines.</div>
                  </Link>
                </div>
              </div>
              <h2 className="text-2xl font-bold font-sans text-slate-900 dark:text-white mt-8 mb-4">Maintenance Rituals</h2>
              <p>Every Friday, our agents scan the library for outdated information. If a page hasn&apos;t been touched in over 90 days, it will be flagged for review in the `#documentation` Slack channel. This ensures that the Playbook remains relevant and useful.</p>
              <p>Happy reading! If you have any questions, reach out to the Operations team.</p>
            </article>
            {/* Footer */}
            <footer className="mt-20 pt-8 border-t border-slate-100 dark:border-border-dark flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined !text-xl">thumb_up</span>
                  <span>Helpful</span>
                </button>
                <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined !text-xl">thumb_down</span>
                  <span>Needs improvement</span>
                </button>
              </div>
              <div className="text-xs text-slate-400 font-sans">
                ID: PKB-1002-ONB
              </div>
            </footer>
          </div>
        </main>

        {/* Right Sidebar: ToC */}
        <aside className="w-72 flex-shrink-0 border-l border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark overflow-y-auto hidden xl:flex flex-col p-6">
          <div className="sticky top-0">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">On this page</h3>
            <nav className="space-y-4">
              <div className="space-y-2">
                <Link href="#" className="block text-sm font-semibold text-primary border-l-2 border-primary pl-4 -ml-px">Introduction</Link>
                <Link href="#" className="block text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 pl-4 border-l-2 border-transparent transition-colors">Getting Started</Link>
                <Link href="#" className="block text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 pl-4 border-l-2 border-transparent transition-colors">Collaborating with AI</Link>
                <Link href="#" className="block text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 pl-4 border-l-2 border-transparent transition-colors">Maintenance Rituals</Link>
              </div>
            </nav>
            <div className="mt-12 p-5 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 text-primary mb-2">
                <span className="material-symbols-outlined !text-lg">lightbulb</span>
                <span className="text-xs font-bold uppercase tracking-wider">Pro Tip</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-border-dark text-slate-700 dark:text-slate-300 font-mono">Cmd</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-border-dark text-slate-700 dark:text-slate-300 font-mono">K</kbd> to quickly search for any workflow or page.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-border-dark">
              <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 uppercase tracking-wider">
                <span className="material-symbols-outlined !text-lg">share</span>
                <span>Share this page</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
