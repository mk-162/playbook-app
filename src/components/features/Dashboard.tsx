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
        <div className="dashboard-header px-4 sm:px-8 pt-6 sm:pt-8 pb-4 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Workspace Overview</h1>
            <p className="text-[--color-text-muted] mt-1">Welcome back. 12 updates since your last session.</p>
          </div>
          <button 
            onClick={openNewTaskModal}
            className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/10 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Task
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="flex-1 px-4 sm:px-8 py-4 overflow-y-auto">
          <div className="max-w-2xl mx-auto w-full">
            {/* Active Tasks - Full Width for MVP */}
            <div className="flex flex-col gap-6">
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
{/* System Health removed for MVP */}
            </div>
          </div>
        </div>

        {/* Agent Activity Ticker - hidden on mobile */}
        <footer className="hidden sm:flex h-12 border-t border-[--color-border] border-[--color-border] bg-[--color-card] bg-[--color-surface] items-center px-6 overflow-hidden whitespace-nowrap z-10 sticky bottom-0">
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
