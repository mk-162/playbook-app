import Link from "next/link";

export default function Header() {
  return (
    <header className="h-14 border-b border-slate-200 dark:border-border-dark flex items-center justify-between px-6 bg-white dark:bg-background-dark z-20 shrink-0">
      <Link href="/" className="flex items-center gap-3">
        <div className="bg-primary p-1 rounded">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
          </svg>
        </div>
        <h2 className="text-lg font-bold tracking-tight">162</h2>
        <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-border-dark text-slate-500">v1.2 Beta</span>
      </Link>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-surface-dark rounded-lg text-slate-500 transition-colors">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 dark:bg-border-dark mx-1"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold leading-none">Alex Rivera</p>
            <p className="text-[10px] text-slate-500 leading-none mt-1">Product Lead</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-200 dark:border-border-dark overflow-hidden flex items-center justify-center">
            {/* Placeholder avatar */}
             <span className="material-symbols-outlined text-slate-400 text-lg">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
