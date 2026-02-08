"use client";

import { useEffect } from "react";
import gsap from "gsap";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TaskModal({ isOpen, onClose }: TaskModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(".modal-content", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="modal-content relative w-full max-w-5xl bg-white dark:bg-card-dark rounded-xl shadow-2xl border border-slate-200 dark:border-border-dark flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-border-dark shrink-0">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary">task_alt</span>
            <h1 className="text-xl font-bold tracking-tight">Reskin the Website</h1>
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              In Progress
              <span className="material-symbols-outlined text-[16px] ml-1">expand_more</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Column: Description & Activity */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            {/* Description */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Description</h2>
                <button className="text-xs text-primary font-medium hover:underline">Edit</button>
              </div>
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                <p>This task involves updating the primary design system to reflect the new brand guidelines. Key areas include the landing page, dashboard, and settings components.</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Update color variables in <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-primary">tailwind.config.js</code></li>
                  <li>Replace legacy logos with SVG assets</li>
                  <li>Refactor button component variants</li>
                </ul>
              </div>
            </section>
            <hr className="border-slate-200 dark:border-border-dark" />

            {/* Activity Feed */}
            <section className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Activity History</h2>
              <div className="relative space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200 dark:before:bg-border-dark">
                {/* Activity Item 1 */}
                <div className="relative flex gap-4">
                  <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-[0_0_10px_rgba(43,108,238,0.15)]">
                    <span className="material-symbols-outlined">smart_toy</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm">
                      <span className="font-bold">Sudo</span>
                      <span className="text-slate-500 dark:text-slate-400 mx-1">created this task via</span>
                      <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-border-dark text-[11px] font-mono">MCP Protocol</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                  </div>
                </div>
                {/* Activity Item 2 */}
                <div className="relative flex gap-4">
                  <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white overflow-hidden">
                     {/* Placeholder Avatar */}
                     <span className="material-symbols-outlined text-white">person</span>
                  </div>
                  <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-border-dark">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold">MK</span>
                      <span className="text-xs text-slate-500">1 hour ago</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      I&apos;ve uploaded the new brand assets. @sudo, can you please start updating the configuration files?
                    </p>
                  </div>
                </div>
                {/* Activity Item 3 */}
                <div className="relative flex gap-4">
                  <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-[0_0_10px_rgba(43,108,238,0.15)]">
                    <span className="material-symbols-outlined">smart_toy</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">Sudo</span>
                      <span className="text-[10px] bg-primary/20 text-primary px-1.5 rounded-full font-bold uppercase tracking-tighter">Agent</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                      Updated <code className="text-primary">tailwind.config.js</code> with 12 new hex codes.
                    </p>
                    <div className="mt-3 bg-black rounded p-3 font-mono text-xs text-green-400 border border-slate-700">
                      <div className="flex gap-2">
                        <span className="text-slate-500">$</span>
                        <span>git commit -m &quot;feat: sync brand colors via MCP&quot;</span>
                      </div>
                      <div className="text-slate-400 mt-1">[main 4f2a1e] 1 file changed, 24 insertions(+)</div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">45 minutes ago</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar: Metadata */}
          <aside className="w-72 border-l border-slate-200 dark:border-border-dark p-6 space-y-6 bg-slate-50/50 dark:bg-black/20 shrink-0 hidden md:block overflow-y-auto custom-scrollbar">
             <div className="space-y-4">
               {/* Assignee */}
               <div className="space-y-2">
                 <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Assignee</label>
                 <div className="flex items-center gap-2 group cursor-pointer">
                   <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center overflow-hidden">
                     <span className="material-symbols-outlined text-[14px] text-white">smart_toy</span>
                   </div>
                   <span className="text-sm font-medium">Sudo (Agent)</span>
                 </div>
               </div>
               {/* Status */}
               <div className="space-y-2">
                 <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Priority</label>
                 <div className="flex items-center gap-2 text-rose-500 group cursor-pointer">
                   <span className="material-symbols-outlined text-[18px]">priority_high</span>
                   <span className="text-sm font-medium">High</span>
                 </div>
               </div>
               {/* Created By */}
               <div className="space-y-2">
                 <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Created By</label>
                 <div className="flex items-center gap-2">
                   <span className="text-sm text-slate-700 dark:text-slate-300">via MCP - Sudo</span>
                 </div>
               </div>
               {/* Due Date */}
               <div className="space-y-2">
                 <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Due Date</label>
                 <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                   <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                   <span className="text-sm">Oct 24, 2023</span>
                 </div>
               </div>
               {/* Labels */}
               <div className="space-y-2">
                 <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Labels</label>
                 <div className="flex flex-wrap gap-2">
                   <span className="px-2 py-0.5 rounded-full border border-primary/40 text-primary text-[11px] font-bold">Design</span>
                   <span className="px-2 py-0.5 rounded-full border border-purple-500/40 text-purple-500 text-[11px] font-bold">Brand</span>
                   <button className="w-6 h-6 flex items-center justify-center rounded-full border border-dashed border-slate-400 dark:border-slate-600 text-slate-400">
                     <span className="material-symbols-outlined text-[14px]">add</span>
                   </button>
                 </div>
               </div>
             </div>
             <div className="pt-6 border-t border-slate-200 dark:border-border-dark">
               <button className="w-full flex items-center justify-between text-xs text-slate-500 hover:text-primary transition-colors">
                 <span>Subscribe to updates</span>
                 <span className="material-symbols-outlined text-[16px]">notifications</span>
               </button>
             </div>
          </aside>
        </div>

        {/* Footer Comment Box */}
        <footer className="p-4 border-t border-slate-200 dark:border-border-dark bg-white dark:bg-card-dark shrink-0">
          <div className="flex flex-col gap-3">
            <div className="relative">
              <textarea className="w-full min-h-[80px] bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none" placeholder="Leave a comment or prompt Sudo..."></textarea>
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <span className="material-symbols-outlined text-[18px]">sentiment_satisfied</span>
                </button>
                <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <span className="material-symbols-outlined text-[18px]">attach_file</span>
                </button>
              </div>
              <div className="absolute bottom-3 right-3 text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">markdown</span>
                Markdown supported
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                Close Task
              </button>
              <button className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                Comment
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
