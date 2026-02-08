import Link from "next/link";

export default function Header() {
  return (
    <header className="h-14 border-b border-[--color-border-muted] flex items-center justify-between px-6 bg-[--color-surface] z-20 shrink-0">
      <Link href="/" className="flex items-center gap-3">
        <div className="bg-[--color-primary] p-1.5 rounded-lg">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
          </svg>
        </div>
        <h2 className="text-lg font-bold tracking-tight text-[--color-text-primary]">162 Playbook</h2>
        <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-[--color-primary-muted] border border-[--color-primary]/30 text-[--color-primary]">Beta</span>
      </Link>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-[--color-surface-raised] rounded-lg text-[--color-text-muted] hover:text-[--color-text-secondary] transition-colors">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>
        <div className="h-8 w-[1px] bg-[--color-border-muted] mx-1"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold leading-none text-[--color-text-primary]">Alex Rivera</p>
            <p className="text-xs text-[--color-text-muted] leading-none mt-1">Product Lead</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-[--color-surface-raised] border border-[--color-border] overflow-hidden flex items-center justify-center">
            <span className="material-symbols-outlined text-[--color-text-muted] text-lg">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
