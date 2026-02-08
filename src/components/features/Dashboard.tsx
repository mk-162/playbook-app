"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import AppLayout from "@/components/layout/AppLayout";
import TaskModal from "./TaskModal";

type TaskStatus = "todo" | "in-progress" | "review" | "done";
type TaskPriority = "low" | "medium" | "high";
type TaskAssignee = "human" | "agent";

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  assigneeType: TaskAssignee;
  status: TaskStatus;
  priority: TaskPriority;
}

export default function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterType, setFilterType] = useState<"all" | "agent" | "human">("all");
  
  // Sample tasks with mix of agents and humans
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Update Brand Guidelines",
      description: "Refresh brand documentation with new color palette and typography standards",
      assignee: "Sudo",
      assigneeType: "agent",
      status: "in-progress",
      priority: "high",
    },
    {
      id: "2",
      title: "Approve Newsletter Draft",
      description: "Review and approve the monthly newsletter before publishing",
      assignee: "Sarah Jenkins",
      assigneeType: "human",
      status: "review",
      priority: "high",
    },
    {
      id: "3",
      title: "Refactor Onboarding Flow",
      description: "Improve user onboarding experience with clearer steps and better visuals",
      assignee: "Alex Chen",
      assigneeType: "human",
      status: "todo",
      priority: "medium",
    },
  ]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dashboard-card", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

       gsap.from(".dashboard-header", {
        y: -10,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleAddTask = (task: Omit<Task, "id">) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
    };
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId 
        ? { ...t, status: t.status === "done" ? "todo" : "done" as TaskStatus }
        : t
    ));
  };

  const openTaskModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const openNewTaskModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const filteredTasks = tasks.filter(task => {
    if (filterType === "all") return true;
    return task.assigneeType === filterType;
  });

  const getStatusBadge = (status: TaskStatus) => {
    const styles = {
      todo: "bg-slate-500/10 text-slate-500 border-slate-500/30",
      "in-progress": "bg-primary/20 text-primary border-primary/30",
      review: "bg-amber-500/20 text-amber-500 border-amber-500/30",
      done: "bg-green-500/20 text-green-500 border-green-500/30",
    };
    const labels = {
      todo: "TODO",
      "in-progress": "IN PROGRESS",
      review: "REVIEW",
      done: "DONE",
    };
    return { style: styles[status], label: labels[status] };
  };

  return (
    <AppLayout>
      <div ref={containerRef} className="flex flex-col min-h-full">
        {/* Content Header */}
        <div className="dashboard-header px-8 pt-8 pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Workspace Overview</h1>
            <p className="text-[--color-text-muted] mt-1">Welcome back. 12 updates since your last session.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-[--color-surface] bg-[--color-card] text-sm font-medium rounded-lg border border-[--color-border] border-[--color-border] hover:bg-slate-200 hover:bg-[--color-surface-raised] transition-colors">
              Invite Agent
            </button>
            <button 
              onClick={openNewTaskModal}
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/10 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add Task
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="flex-1 px-8 py-4">
          <div className="grid grid-cols-12 gap-8 h-full">
            {/* Left Column: Recent Updates (60%) */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[--color-text-secondary] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">history</span>
                  Recent Updates
                </h2>
                <div className="space-y-3">
                  {/* Update Card 1 */}
                  <div className="dashboard-card p-4 rounded-xl border border-[--color-border] border-[--color-border] bg-[--color-card] bg-[--color-card] hover:border-primary/50 transition-all group cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[--color-surface] bg-[--color-surface] flex items-center justify-center">
                          <span className="material-symbols-outlined text-[--color-text-secondary]">description</span>
                        </div>
                        <div>
                          <h3 className="font-medium group-hover:text-primary transition-colors">Q4 Marketing Strategy</h3>
                          <p className="text-xs text-[--color-text-muted] mt-1">Edited by <span className="text-[--color-text-primary]">Sarah Jenkins</span> • 2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] rounded bg-blue-500/10 text-blue-500 font-bold uppercase tracking-tighter">Draft</span>
                        <span className="material-symbols-outlined text-[--color-text-muted] text-[18px]">more_horiz</span>
                      </div>
                    </div>
                  </div>
                   {/* Update Card 2 */}
                  <div className="dashboard-card p-4 rounded-xl border border-[--color-border] border-[--color-border] bg-[--color-card] bg-[--color-card] hover:border-primary/50 transition-all group cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[--color-surface] bg-[--color-surface] flex items-center justify-center">
                          <span className="material-symbols-outlined text-[--color-text-secondary]">api</span>
                        </div>
                        <div>
                          <h3 className="font-medium group-hover:text-primary transition-colors">API Integration Guide</h3>
                          <p className="text-xs text-[--color-text-muted] mt-1">Generated by <span className="text-primary/80">AI Agent Beta</span> • Yesterday</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] rounded bg-green-500/10 text-green-500 font-bold uppercase tracking-tighter">Published</span>
                        <span className="material-symbols-outlined text-[--color-text-muted] text-[18px]">more_horiz</span>
                      </div>
                    </div>
                  </div>
                   {/* Update Card 3 */}
                  <div className="dashboard-card p-4 rounded-xl border border-[--color-border] border-[--color-border] bg-[--color-card] bg-[--color-card] hover:border-primary/50 transition-all group cursor-pointer">
                    <div className="flex justify-between items-start">
                       <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[--color-surface] bg-[--color-surface] flex items-center justify-center">
                          <span className="material-symbols-outlined text-[--color-text-secondary]">security</span>
                        </div>
                        <div>
                          <h3 className="font-medium group-hover:text-primary transition-colors">Compliance Protocol v2</h3>
                          <p className="text-xs text-[--color-text-muted] mt-1">Verified by <span className="text-[--color-text-primary]">System Admin</span> • 2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] rounded bg-slate-500/10 text-[--color-text-muted] font-bold uppercase tracking-tighter">Archived</span>
                        <span className="material-symbols-outlined text-[--color-text-muted] text-[18px]">more_horiz</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
               {/* Secondary Widget Area */}
              <div className="grid grid-cols-2 gap-4">
                <div className="dashboard-card p-4 rounded-xl border border-dashed border-slate-300 border-[--color-border] flex flex-col items-center justify-center text-center py-8 hover:bg-[--color-surface] hover:bg-[--color-surface-raised]/50 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[--color-text-muted] mb-2">add_circle</span>
                  <p className="text-xs font-medium text-[--color-text-secondary]">Pin new document</p>
                </div>
                <div className="dashboard-card p-4 rounded-xl border border-dashed border-slate-300 border-[--color-border] flex flex-col items-center justify-center text-center py-8 hover:bg-[--color-surface] hover:bg-[--color-surface-raised]/50 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[--color-text-muted] mb-2">auto_awesome</span>
                  <p className="text-xs font-medium text-[--color-text-secondary]">Request AI Summary</p>
                </div>
              </div>
            </div>

             {/* Right Column: Active Tasks (40%) */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-[--color-text-secondary] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">checklist</span>
                    Active Tasks
                    <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full ml-2">
                      {Math.round((tasks.filter(t => t.status === "done").length / tasks.length) * 100)}% Done
                    </span>
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilterType("all")}
                      className={`px-3 py-1 text-xs font-medium rounded-lg border transition-colors ${
                        filterType === "all"
                          ? "bg-primary text-white border-primary"
                          : "bg-[--color-surface] text-[--color-text-secondary] border-[--color-border] hover:bg-[--color-surface-raised]"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterType("agent")}
                      className={`px-3 py-1 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1 ${
                        filterType === "agent"
                          ? "bg-primary text-white border-primary"
                          : "bg-[--color-surface] text-[--color-text-secondary] border-[--color-border] hover:bg-[--color-surface-raised]"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">smart_toy</span>
                      Agents
                    </button>
                    <button
                      onClick={() => setFilterType("human")}
                      className={`px-3 py-1 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1 ${
                        filterType === "human"
                          ? "bg-primary text-white border-primary"
                          : "bg-[--color-surface] text-[--color-text-secondary] border-[--color-border] hover:bg-[--color-surface-raised]"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">person</span>
                      Human
                    </button>
                  </div>
                </div>
                <div className="dashboard-card bg-[--color-card] bg-[--color-card] border border-[--color-border] border-[--color-border] rounded-xl overflow-hidden">
                  {filteredTasks.length === 0 ? (
                    <div className="p-8 text-center text-[--color-text-muted]">
                      <span className="material-symbols-outlined text-4xl mb-2">task_alt</span>
                      <p className="text-sm">No tasks found</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-[--color-border-muted] divide-[--color-border-muted]">
                      {filteredTasks.map((task) => {
                        const badge = getStatusBadge(task.status);
                        return (
                          <div
                            key={task.id}
                            onClick={() => openTaskModal(task)}
                            className="p-4 flex items-center justify-between hover:bg-[--color-surface] hover:bg-[--color-surface] transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleComplete(task.id);
                                }}
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
                                  task.status === "done"
                                    ? "border-green-500 bg-green-500"
                                    : task.priority === "high"
                                    ? "border-amber-500/40"
                                    : "border-primary/40"
                                }`}
                              >
                                {task.status === "done" ? (
                                  <span className="material-symbols-outlined text-[14px] text-white">check</span>
                                ) : task.priority === "high" ? (
                                  <span className="material-symbols-outlined text-[14px] text-amber-500">priority_high</span>
                                ) : null}
                              </div>
                              <span className={`text-sm font-medium ${task.status === "done" ? "line-through text-[--color-text-muted]" : ""}`}>
                                {task.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className={`px-2 py-1 text-[9px] rounded-full font-bold border ${badge.style}`}>
                                {badge.label}
                              </span>
                              <div className="flex items-center gap-2">
                                {task.assigneeType === "agent" ? (
                                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[14px] text-white">smart_toy</span>
                                  </div>
                                ) : (
                                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[14px] text-white">person</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="bg-[--color-surface] bg-[--color-surface]/30 p-3 text-center">
                    <button 
                      onClick={openNewTaskModal}
                      className="text-[11px] font-bold text-[--color-text-muted] hover:text-primary uppercase tracking-widest transition-colors"
                    >
                      + Add New Task
                    </button>
                  </div>
                </div>
              </div>
               {/* Quick Stats */}
              <div className="dashboard-card bg-primary/5 border border-primary/20 rounded-xl p-6">
                <p className="text-[10px] font-bold text-primary uppercase mb-2">System Health</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-bold">98.2%</p>
                    <p className="text-[10px] text-[--color-text-muted]">Agent sync accuracy</p>
                  </div>
                  <div className="h-10 w-24 flex items-end gap-1">
                    <div className="flex-1 bg-primary/20 h-[40%] rounded-t-sm"></div>
                    <div className="flex-1 bg-primary/40 h-[60%] rounded-t-sm"></div>
                    <div className="flex-1 bg-primary/30 h-[50%] rounded-t-sm"></div>
                    <div className="flex-1 bg-primary/60 h-[80%] rounded-t-sm"></div>
                    <div className="flex-1 bg-primary h-[100%] rounded-t-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Activity Ticker (Bottom Fixed -> Sticky) */}
        <footer className="h-12 border-t border-[--color-border] border-[--color-border] bg-[--color-card] bg-[--color-surface] flex items-center px-6 overflow-hidden whitespace-nowrap z-10 sticky bottom-0">
          <div className="flex items-center gap-2 mr-6 text-primary shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Live Activity</span>
          </div>
          <div className="flex items-center gap-12 text-xs font-medium text-[--color-text-muted] overflow-hidden">
               {/* Ticker Content */}
             <div className="flex gap-12">
                <div className="flex items-center gap-2">
                  <span className="text-[--color-text-primary] font-semibold uppercase text-[9px] bg-[--color-surface-raised] px-1.5 py-0.5 rounded">Alpha</span>
                  <span>Agent Alpha optimized 14 knowledge nodes</span>
                  <span className="text-[10px] opacity-50">2m ago</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-[--color-border]"></div>
                <div className="flex items-center gap-2">
                  <span className="text-[--color-text-primary] font-semibold uppercase text-[9px] bg-[--color-surface-raised] px-1.5 py-0.5 rounded">Sigma</span>
                  <span>Agent Sigma summarized &quot;Weekly Sync&quot; meeting notes</span>
                  <span className="text-[10px] opacity-50">14m ago</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-[--color-border]"></div>
                <div className="flex items-center gap-2">
                  <span className="text-[--color-text-primary] font-semibold uppercase text-[9px] bg-[--color-surface-raised] px-1.5 py-0.5 rounded">SYS</span>
                  <span>Vector database indexing complete (4.2 GB)</span>
                  <span className="text-[10px] opacity-50">32m ago</span>
                </div>
             </div>
          </div>
        </footer>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        onSave={selectedTask ? handleEditTask : handleAddTask}
        onDelete={handleDeleteTask}
      />
    </AppLayout>
  );
}
