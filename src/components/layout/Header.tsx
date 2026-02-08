"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

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
        
        {/* User menu */}
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold leading-none text-[--color-text-primary]">
                {session?.user?.name || "User"}
              </p>
              <p className="text-xs text-[--color-text-muted] leading-none mt-1">
                @{(session?.user as { githubUsername?: string })?.githubUsername || "unknown"}
              </p>
            </div>
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                alt="Avatar"
                className="h-9 w-9 rounded-full border border-[--color-border]"
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-[--color-surface-raised] border border-[--color-border] overflow-hidden flex items-center justify-center">
                <span className="material-symbols-outlined text-[--color-text-muted] text-lg">person</span>
              </div>
            )}
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowDropdown(false)}
              />
              <div className="absolute right-0 top-12 w-48 bg-[--color-card] border border-[--color-border] rounded-xl shadow-xl z-20 overflow-hidden">
                <div className="p-3 border-b border-[--color-border-muted]">
                  <p className="text-sm font-medium text-[--color-text-primary]">{session?.user?.name}</p>
                  <p className="text-xs text-[--color-text-muted]">{session?.user?.email}</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                  className="w-full px-3 py-2.5 text-left text-sm text-[--color-text-secondary] hover:bg-[--color-surface-raised] hover:text-[--color-text-primary] transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
