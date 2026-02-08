import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-16 flex flex-col items-center py-6 gap-6 border-r border-[--color-border-muted] bg-[--color-surface] h-full shrink-0 z-20">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-lg bg-[--color-primary-muted] text-[--color-primary] transition-colors" title="Playbook">
          <span className="material-symbols-outlined">menu_book</span>
        </Link>
        <Link href="/tasks" className="w-10 h-10 flex items-center justify-center rounded-lg text-[--color-text-muted] hover:bg-[--color-surface-raised] hover:text-[--color-text-secondary] transition-colors" title="Tasks">
          <span className="material-symbols-outlined">check_circle</span>
        </Link>
        <Link href="/timeline" className="w-10 h-10 flex items-center justify-center rounded-lg text-[--color-text-muted] hover:bg-[--color-surface-raised] hover:text-[--color-text-secondary] transition-colors" title="Activity">
          <span className="material-symbols-outlined">pulse_alert</span>
        </Link>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg text-[--color-text-muted] hover:bg-[--color-surface-raised] hover:text-[--color-text-secondary] transition-colors" title="Settings">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </nav>
      <div className="mt-auto">
        <button className="w-10 h-10 flex items-center justify-center rounded-lg text-[--color-text-muted] hover:bg-[--color-surface-raised] hover:text-[--color-text-secondary] transition-colors">
          <span className="material-symbols-outlined">help_outline</span>
        </button>
      </div>
    </aside>
  );
}
