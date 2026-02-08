"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import AppLayout from "@/components/layout/AppLayout";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".timeline-item", {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out"
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <AppLayout>
      <div ref={containerRef} className="flex flex-col min-h-full p-6">
         {/* Timeline Controls */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 shrink-0">
           <div className="flex flex-col gap-2">
             <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Full Activity Timeline</h1>
             <p className="text-slate-500 dark:text-slate-400 max-w-md">Real-time collaboration feed between your team and AI agents across all projects.</p>
           </div>
           <div className="flex flex-wrap items-center gap-3">
             <div className="bg-slate-100 dark:bg-card-dark p-1 rounded-lg flex items-center border border-slate-200 dark:border-border-dark">
               <button className="px-4 py-1.5 text-sm font-bold bg-white dark:bg-primary text-slate-900 dark:text-white rounded shadow-sm border border-slate-200 dark:border-transparent">All</button>
               <button className="px-4 py-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors">Agents</button>
               <button className="px-4 py-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors">Humans</button>
             </div>
             <button className="flex items-center gap-2 bg-slate-100 dark:bg-card-dark px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-border-dark hover:border-primary/50 transition-all">
               <span className="material-symbols-outlined text-lg">filter_list</span>
               Filter
             </button>
             <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
               <span className="material-symbols-outlined text-lg">download</span>
               Export
             </button>
           </div>
         </div>

         {/* Timeline View */}
         <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark overflow-hidden shadow-xl shadow-black/5 mb-12 shrink-0">
           {/* Live Indicator Bar */}
           <div className="bg-primary/5 dark:bg-primary/10 px-6 py-3 border-b border-slate-200 dark:border-border-dark flex items-center justify-between">
             <div className="flex items-center gap-3">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
               </span>
               <span className="text-xs font-bold uppercase tracking-wider text-primary">Live Activity Streaming</span>
             </div>
             <div className="flex items-center gap-4">
               <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                 <span className="material-symbols-outlined text-sm">schedule</span>
                 Last update: 2s ago
               </div>
               <button className="text-xs font-bold text-primary hover:underline">Mark all as read</button>
             </div>
           </div>

           <div className="flex flex-col divide-y divide-slate-100 dark:divide-border-dark/50 p-6 space-y-8">
              {/* Today Group */}
              <div className="relative group/day">
                  <div className="sticky top-0 bg-white dark:bg-card-dark z-10 py-2 mb-6">
                      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-4">
                          Today
                          <span className="h-px flex-1 bg-slate-100 dark:bg-border-dark"></span>
                      </h3>
                  </div>
                   {/* Timeline Item 1: Agent Summarizing */}
                  <div className="timeline-item flex gap-6 relative before:absolute before:left-[19px] before:top-10 before:bottom-[-20px] before:w-[2px] before:bg-slate-200 dark:before:bg-border-dark last:before:hidden">
                       <div className="flex-none relative w-10 h-10 z-10">
                          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white ring-2 ring-indigo-500/20 shadow-lg shadow-indigo-500/30">
                              <span className="material-symbols-outlined">smart_toy</span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 bg-background-dark text-[10px] px-1 rounded-sm border border-border-dark font-bold text-indigo-400">AI</div>
                      </div>
                      <div className="flex-1 pt-1 pb-8">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-bold text-slate-900 dark:text-white">AutoAgent Alpha</span>
                              <span className="text-slate-400 text-sm">summarized meeting notes for</span>
                              <a href="#" className="text-primary font-bold hover:underline">Project Phoenix</a>
                          </div>
                          <div className="bg-slate-50 dark:bg-background-dark/50 p-4 rounded-lg border border-slate-100 dark:border-border-dark mt-2">
                              <p className="text-sm text-slate-600 dark:text-slate-300 italic">&quot;Based on the transcript from 10:00 AM, key action items include fixing the CI/CD pipeline and updating documentation for v2.4 launch...&quot;</p>
                              <div className="mt-3 flex items-center gap-4">
                                  <button className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded hover:bg-primary/20 transition-colors">
                                      <span className="material-symbols-outlined text-sm">description</span>
                                      View Summary.docx
                                  </button>
                                  <div className="flex -space-x-2">
                                       <div className="w-6 h-6 rounded-full border-2 border-white dark:border-card-dark overflow-hidden bg-slate-200 flex items-center justify-center">
                                           <span className="material-symbols-outlined text-[14px] text-slate-500">person</span>
                                      </div>
                                      <div className="w-6 h-6 rounded-full border-2 border-white dark:border-card-dark flex items-center justify-center bg-slate-100 text-[10px] text-slate-500 font-bold">+2</div>
                                  </div>
                              </div>
                          </div>
                          <div className="mt-2 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">11:42 AM • Completed in 1.4s</div>
                      </div>
                  </div>
                   {/* Timeline Item 2: Human Action */}
                  <div className="timeline-item flex gap-6 relative before:absolute before:left-[19px] before:top-10 before:bottom-[-20px] before:w-[2px] before:bg-slate-200 dark:before:bg-border-dark last:before:hidden">
                      <div className="flex-none w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20 z-10 bg-slate-200 flex items-center justify-center">
                           <span className="material-symbols-outlined text-slate-500">person</span>
                      </div>
                      <div className="flex-1 pt-1 pb-8">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-bold text-slate-900 dark:text-white">Marcus Chen</span>
                              <span className="text-slate-400 text-sm">moved</span>
                              <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-[10px] font-black rounded uppercase">Task #142</span>
                              <span className="text-slate-400 text-sm">to</span>
                              <span className="px-2 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-black rounded uppercase">Ready for Review</span>
                          </div>
                          <div className="mt-2 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">10:15 AM</div>
                      </div>
                  </div>
                   {/* Timeline Item 3: System Event */}
                  <div className="timeline-item flex gap-6 relative before:absolute before:left-[19px] before:top-10 before:bottom-[-20px] before:w-[2px] before:bg-slate-200 dark:before:bg-border-dark last:before:hidden">
                      <div className="flex-none w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-background-dark border-2 border-slate-200 dark:border-border-dark z-10">
                          <span className="material-symbols-outlined text-slate-400">settings_suggest</span>
                      </div>
                      <div className="flex-1 pt-1 pb-8">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-bold text-slate-900 dark:text-white">KnowledgeBase Engine</span>
                              <span className="text-slate-400 text-sm">automatically indexed 4 new documents from</span>
                              <span className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-200">
                                  <span className="material-symbols-outlined text-sm">folder</span> Shared/Marketing
                              </span>
                          </div>
                          <div className="mt-2 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">09:30 AM</div>
                      </div>
                  </div>
              </div>

              {/* Yesterday Group */}
               <div className="relative group/day">
                  <div className="sticky top-0 bg-white dark:bg-card-dark z-10 py-2 mb-6">
                      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-4">
                          Yesterday
                          <span className="h-px flex-1 bg-slate-100 dark:bg-border-dark"></span>
                      </h3>
                  </div>
                   {/* Timeline Item 4: Agent Task */}
                   <div className="timeline-item flex gap-6 relative before:absolute before:left-[19px] before:top-10 before:bottom-[-20px] before:w-[2px] before:bg-slate-200 dark:before:bg-border-dark last:before:hidden">
                      <div className="flex-none relative w-10 h-10 z-10">
                          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-500/30">
                              <span className="material-symbols-outlined">code</span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 bg-background-dark text-[10px] px-1 rounded-sm border border-border-dark font-bold text-emerald-400">AI</div>
                      </div>
                      <div className="flex-1 pt-1 pb-8">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-bold text-slate-900 dark:text-white">DevBot Pro</span>
                              <span className="text-slate-400 text-sm">generated unit tests for</span>
                              <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-background-dark text-slate-700 dark:text-slate-300 rounded text-xs">AuthService.ts</code>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                              <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                              <span className="text-xs text-slate-500 font-medium">12 tests passed successfully</span>
                              <a href="#" className="text-xs font-bold text-primary hover:underline ml-2">View Pull Request #89</a>
                          </div>
                          <div className="mt-2 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">4:50 PM</div>
                      </div>
                  </div>
                   {/* Timeline Item 5: Human Comment */}
                   <div className="timeline-item flex gap-6 relative before:absolute before:left-[19px] before:top-10 before:bottom-[-20px] before:w-[2px] before:bg-slate-200 dark:before:bg-border-dark last:before:hidden">
                      <div className="flex-none w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500/20 z-10 bg-slate-200 flex items-center justify-center">
                           <span className="material-symbols-outlined text-slate-500">person</span>
                      </div>
                      <div className="flex-1 pt-1 pb-4">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-bold text-slate-900 dark:text-white">Elena Rodriguez</span>
                              <span className="text-slate-400 text-sm">left a comment on</span>
                              <a href="#" className="text-primary font-bold hover:underline">Compliance-Checklist.v2</a>
                          </div>
                          <div className="relative pl-4 mt-2 border-l-2 border-slate-200 dark:border-border-dark">
                              <p className="text-sm text-slate-600 dark:text-slate-300">&quot;This looks great, but we should double check the GDPR section before finalizing.&quot;</p>
                          </div>
                          <div className="mt-2 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">2:10 PM</div>
                      </div>
                  </div>
               </div>
           </div>
           {/* Load More */}
           <div className="p-6 border-t border-slate-100 dark:border-border-dark flex justify-center">
              <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors group">
                  <span className="material-symbols-outlined transition-transform group-hover:translate-y-1">expand_more</span>
                  Load previous activity
              </button>
           </div>
         </div>

         {/* Dashboard Stats Bar */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 shrink-0">
           <div className="bg-white dark:bg-card-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
             <div className="flex items-center justify-between mb-4">
               <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                 <span className="material-symbols-outlined text-primary">analytics</span>
               </div>
               <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">+12%</span>
             </div>
             <div className="text-2xl font-black text-slate-900 dark:text-white">1,284</div>
             <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Total Actions</div>
           </div>
           <div className="bg-white dark:bg-card-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
             <div className="flex items-center justify-between mb-4">
               <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                 <span className="material-symbols-outlined text-indigo-500">smart_toy</span>
               </div>
               <span className="text-xs font-bold text-slate-400 bg-slate-400/10 px-2 py-1 rounded">Stable</span>
             </div>
             <div className="text-2xl font-black text-slate-900 dark:text-white">842</div>
             <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Agent Tasks</div>
           </div>
           <div className="bg-white dark:bg-card-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
             <div className="flex items-center justify-between mb-4">
               <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                 <span className="material-symbols-outlined text-orange-500">person</span>
               </div>
               <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">-2%</span>
             </div>
             <div className="text-2xl font-black text-slate-900 dark:text-white">442</div>
             <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Human Actions</div>
           </div>
           <div className="bg-white dark:bg-card-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
             <div className="flex items-center justify-between mb-4">
               <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                 <span className="material-symbols-outlined text-emerald-500">task_alt</span>
               </div>
               <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">Active</span>
             </div>
             <div className="text-2xl font-black text-slate-900 dark:text-white">99.8%</div>
             <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Success Rate</div>
           </div>
         </div>

         {/* Footer / Feedback */}
         <footer className="mt-auto border-t border-slate-200 dark:border-border-dark py-6 px-6 bg-white dark:bg-background-dark -mx-6 -mb-6">
           <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
             <div className="flex items-center gap-6">
               <span className="text-xs text-slate-500 font-bold">© 2024 KnowledgeBase AI</span>
               <a href="#" className="text-xs text-slate-500 hover:text-primary font-bold">Privacy</a>
               <a href="#" className="text-xs text-slate-500 hover:text-primary font-bold">API Docs</a>
             </div>
             <div className="flex items-center gap-4">
               <span className="text-xs text-slate-500 font-bold">Platform Status:</span>
               <span className="flex items-center gap-1.5 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                 Operational
               </span>
             </div>
           </div>
         </footer>
      </div>
    </AppLayout>
  );
}
