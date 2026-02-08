"use client";

import { useState, useRef, useEffect } from "react";
import TaskModal from "./TaskModal";
import gsap from "gsap";
import AppLayout from "@/components/layout/AppLayout";

export default function KanbanBoard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".kanban-column", {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out"
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <AppLayout disableScroll>
      <div ref={containerRef} className="flex flex-col h-full overflow-hidden relative">
        <TaskModal isOpen={isModalOpen} onClose={closeModal} />

        {/* Sub-Header / Controls */}
        <div className="px-6 py-6 w-full shrink-0">
          <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">Tasks</h1>
              <p className="text-[--color-text-muted] dark:text-[--color-text-secondary] text-sm">Human & AI collaborative workflow</p>
            </div>
            <div className="flex items-center gap-2 p-1 bg-[--color-surface] dark:bg-card-dark rounded-xl border border-[--color-border] border-[--color-border]">
              <button className="px-4 py-1.5 rounded-lg bg-[--color-card] bg-[--color-surface] shadow-sm text-slate-900 dark:text-white text-sm font-semibold flex items-center gap-2 border border-[--color-border] border-[--color-border]">
                <span className="material-symbols-outlined text-[18px]">view_kanban</span> Board
              </button>
              <button className="px-4 py-1.5 rounded-lg text-[--color-text-muted] dark:text-[--color-text-secondary] text-sm font-medium hover:text-slate-700 dark:hover:text-white flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-[18px]">list</span> List
              </button>
              <button className="px-4 py-1.5 rounded-lg text-[--color-text-muted] dark:text-[--color-text-secondary] text-sm font-medium hover:text-slate-700 dark:hover:text-white flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-[18px]">event_note</span> Timeline
              </button>
            </div>
          </div>
        </div>

        {/* Kanban Board Area */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden px-6 pb-6 custom-scrollbar">
          <div className="flex gap-6 h-full min-w-max">
              {/* Column: Backlog */}
              <div className="kanban-column w-[300px] flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between px-2 shrink-0">
                      <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                          <h3 className="text-[--color-text-muted] dark:text-[--color-text-secondary] text-sm font-bold uppercase tracking-wider">Backlog</h3>
                          <span className="bg-slate-200 dark:bg-slate-800 text-[--color-text-muted] dark:text-[--color-text-secondary] text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
                      </div>
                      <button className="text-[--color-text-secondary] hover:text-white transition-colors">
                          <span className="material-symbols-outlined text-[20px]">add</span>
                      </button>
                  </div>
                  <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-2">
                      {/* Task Card 1 */}
                      <div onClick={openModal} className="bg-[--color-card] dark:bg-card-dark p-4 rounded-xl border border-[--color-border] border-[--color-border] shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                          <div className="flex justify-between items-start mb-2">
                              <span className="bg-[--color-surface] bg-[--color-surface] text-[--color-text-muted] text-[10px] font-bold px-2 py-0.5 rounded uppercase">via App</span>
                              <div className="w-6 h-6 bg-[--color-surface] bg-[--color-surface] rounded-full flex items-center justify-center">
                                  <span className="material-symbols-outlined text-[14px] text-[--color-text-muted]">more_horiz</span>
                              </div>
                          </div>
                          <h4 className="text-slate-900 dark:text-slate-100 font-bold text-sm mb-1 leading-snug">Research competitor tools</h4>
                          <p className="text-[--color-text-muted] text-xs mb-4 line-clamp-2">Analyze feature sets of linear and trello for integration points.</p>
                          <div className="flex items-center justify-between">
                              <div className="flex -space-x-2">
                                  <div className="w-7 h-7 rounded-full border-2 border-white dark:border-card-dark bg-slate-200 flex items-center justify-center overflow-hidden">
                                      <span className="material-symbols-outlined text-[16px] text-[--color-text-secondary]">person</span>
                                  </div>
                              </div>
                              <div className="flex items-center gap-1 text-[--color-text-secondary]">
                                  <span className="material-symbols-outlined text-[14px]">chat_bubble</span>
                                  <span className="text-[10px] font-bold">2</span>
                              </div>
                          </div>
                      </div>
                       {/* Task Card 2 */}
                      <div onClick={openModal} className="bg-[--color-card] dark:bg-card-dark p-4 rounded-xl border border-[--color-border] border-[--color-border] shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                           <div className="flex justify-between items-start mb-2">
                              <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[12px]">bolt</span> via Agent
                              </span>
                          </div>
                          <h4 className="text-slate-900 dark:text-slate-100 font-bold text-sm mb-1 leading-snug">Draft release notes v2.4</h4>
                          <p className="text-[--color-text-muted] text-xs mb-4 line-clamp-2">Summarizing all changes from the last sprint for the public changelog.</p>
                          <div className="flex items-center justify-between">
                              <div className="flex -space-x-2">
                                  <div className="w-7 h-7 rounded-full border-2 border-white dark:border-card-dark bg-primary flex items-center justify-center text-[10px] text-white font-bold">
                                      <span className="material-symbols-outlined text-[14px]">smart_toy</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

               {/* Column: In Progress */}
               <div className="kanban-column w-[300px] flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between px-2 shrink-0">
                      <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <h3 className="text-primary text-sm font-bold uppercase tracking-wider">In Progress</h3>
                          <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">2</span>
                      </div>
                      <button className="text-[--color-text-secondary] hover:text-white transition-colors">
                          <span className="material-symbols-outlined text-[20px]">add</span>
                      </button>
                  </div>
                  <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-2">
                      {/* Task Card 1 */}
                      <div onClick={openModal} className="bg-[--color-card] dark:bg-card-dark p-4 rounded-xl border-l-4 border-l-primary border border-[--color-border] border-[--color-border] shadow-md hover:shadow-lg transition-shadow group cursor-pointer">
                          <div className="flex justify-between items-start mb-2">
                               <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[12px]">bolt</span> via Agent
                              </span>
                          </div>
                          <h4 className="text-slate-900 dark:text-slate-100 font-bold text-sm mb-1 leading-snug">Debug dashboard lag issues</h4>
                          <p className="text-[--color-text-muted] text-xs mb-4 line-clamp-2">Investigating performance bottlenecks in the task rendering engine.</p>
                          <div className="flex items-center justify-between">
                              <div className="flex -space-x-2">
                                  <div className="w-7 h-7 rounded-full border-2 border-white dark:border-card-dark bg-primary flex items-center justify-center text-[10px] text-white font-bold">
                                      <span className="material-symbols-outlined text-[14px]">smart_toy</span>
                                  </div>
                                  <div className="w-7 h-7 rounded-full border-2 border-white dark:border-card-dark bg-slate-200 flex items-center justify-center overflow-hidden">
                                       <span className="material-symbols-outlined text-[16px] text-[--color-text-secondary]">person</span>
                                  </div>
                              </div>
                              <div className="flex items-center gap-1 text-[--color-text-secondary]">
                                  <span className="material-symbols-outlined text-[14px]">attach_file</span>
                                  <span className="text-[10px] font-bold">4</span>
                              </div>
                          </div>
                      </div>
                       {/* Task Card 2 */}
                      <div onClick={openModal} className="bg-[--color-card] dark:bg-card-dark p-4 rounded-xl border border-[--color-border] border-[--color-border] shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                           <div className="flex justify-between items-start mb-2">
                              <span className="bg-[--color-surface] bg-[--color-surface] text-[--color-text-muted] text-[10px] font-bold px-2 py-0.5 rounded uppercase">via App</span>
                          </div>
                          <h4 className="text-slate-900 dark:text-slate-100 font-bold text-sm mb-1 leading-snug">Update brand guidelines</h4>
                          <p className="text-[--color-text-muted] text-xs mb-4 line-clamp-2">Revise color palette for accessibility and dark mode support.</p>
                          <div className="flex items-center justify-between">
                               <div className="flex -space-x-2">
                                  <div className="w-7 h-7 rounded-full border-2 border-white dark:border-card-dark bg-slate-200 flex items-center justify-center overflow-hidden">
                                       <span className="material-symbols-outlined text-[16px] text-[--color-text-secondary]">person</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Column: Review */}
              <div className="kanban-column w-[300px] flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between px-2 shrink-0">
                      <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                          <h3 className="text-amber-500 text-sm font-bold uppercase tracking-wider">Review</h3>
                          <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 text-[10px] font-bold px-2 py-0.5 rounded-full">1</span>
                      </div>
                       <button className="text-[--color-text-secondary] hover:text-white transition-colors">
                          <span className="material-symbols-outlined text-[20px]">add</span>
                      </button>
                  </div>
                  <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-2">
                       {/* Task Card 1 */}
                       <div onClick={openModal} className="bg-[--color-card] dark:bg-card-dark p-4 rounded-xl border-l-4 border-l-amber-400 border border-[--color-border] border-[--color-border] shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                          <div className="flex justify-between items-start mb-2">
                               <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[12px]">bolt</span> via Agent
                              </span>
                              <span className="text-amber-500 text-[10px] font-black uppercase tracking-tighter">Needs Human</span>
                          </div>
                          <h4 className="text-slate-900 dark:text-slate-100 font-bold text-sm mb-1 leading-snug">Finalize Q4 goals</h4>
                          <p className="text-[--color-text-muted] text-xs mb-4 line-clamp-2">Agent suggested goals based on last 6 months velocity. Needs final approval.</p>
                          <div className="flex items-center justify-between">
                              <div className="flex -space-x-2">
                                  <div className="w-7 h-7 rounded-full border-2 border-white dark:border-card-dark bg-primary flex items-center justify-center text-[10px] text-white font-bold">
                                      <span className="material-symbols-outlined text-[14px]">smart_toy</span>
                                  </div>
                                  <div className="w-7 h-7 rounded-full border-2 border-white dark:border-card-dark bg-slate-200 flex items-center justify-center overflow-hidden">
                                       <span className="material-symbols-outlined text-[16px] text-[--color-text-secondary]">person</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

               {/* Column: Done */}
               <div className="kanban-column w-[300px] flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between px-2 shrink-0">
                      <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <h3 className="text-emerald-500 text-sm font-bold uppercase tracking-wider">Done</h3>
                          <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded-full">12</span>
                      </div>
                       <button className="text-[--color-text-secondary] hover:text-white transition-colors">
                          <span className="material-symbols-outlined text-[20px]">add</span>
                      </button>
                  </div>
                   <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-2 opacity-75">
                       {/* Task Card 1 */}
                       <div className="bg-[--color-card] dark:bg-card-dark p-4 rounded-xl border border-[--color-border] border-[--color-border] shadow-sm hover:shadow-md transition-shadow group cursor-pointer line-through decoration-slate-300 dark:decoration-slate-600">
                          <div className="flex justify-between items-start mb-2">
                              <span className="bg-[--color-surface] bg-[--color-surface] text-[--color-text-secondary] text-[10px] font-bold px-2 py-0.5 rounded uppercase">via App</span>
                               <span className="material-symbols-outlined text-emerald-500 text-[18px]">check_circle</span>
                          </div>
                          <h4 className="text-[--color-text-secondary] font-bold text-sm mb-1 leading-snug">Onboard new team members</h4>
                           <div className="flex items-center justify-between mt-4">
                              <div className="flex -space-x-2">
                                  <div className="w-7 h-7 rounded-full border-2 border-white dark:border-card-dark bg-slate-200 flex items-center justify-center overflow-hidden">
                                       <span className="material-symbols-outlined text-[16px] text-[--color-text-secondary]">person</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                       {/* Task Card 2 */}
                       <div className="bg-[--color-card] dark:bg-card-dark p-4 rounded-xl border border-[--color-border] border-[--color-border] shadow-sm hover:shadow-md transition-shadow group cursor-pointer line-through decoration-slate-300 dark:decoration-slate-600">
                           <div className="flex justify-between items-start mb-2">
                              <span className="bg-primary/10 text-primary/60 text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[12px]">bolt</span> via Agent
                              </span>
                               <span className="material-symbols-outlined text-emerald-500 text-[18px]">check_circle</span>
                          </div>
                          <h4 className="text-[--color-text-secondary] font-bold text-sm mb-1 leading-snug">Security audit</h4>
                           <div className="flex items-center justify-between mt-4">
                              <div className="flex -space-x-2">
                                  <div className="w-7 h-7 rounded-full border-2 border-white dark:border-card-dark bg-primary/60 flex items-center justify-center text-[10px] text-white font-bold">
                                      <span className="material-symbols-outlined text-[14px]">smart_toy</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                   </div>
               </div>
          </div>
        </div>

         {/* Floating AI Prompt */}
        <div className="fixed bottom-6 right-6 z-40">
          <button className="bg-primary hover:bg-blue-600 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 group">
            <span className="material-symbols-outlined text-[28px] group-hover:rotate-12 transition-transform">auto_fix_high</span>
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
