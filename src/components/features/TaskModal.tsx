"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

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

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
  onSave: (task: any) => void;
  onDelete?: (taskId: string) => void;
}

export default function TaskModal({ isOpen, onClose, task, onSave, onDelete }: TaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    assigneeType: "human" as TaskAssignee,
    status: "todo" as TaskStatus,
    priority: "medium" as TaskPriority,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        assignee: task.assignee,
        assigneeType: task.assigneeType,
        status: task.status,
        priority: task.priority,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        assignee: "",
        assigneeType: "human",
        status: "todo",
        priority: "medium",
      });
    }
  }, [task, isOpen]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.assignee.trim()) {
      alert("Please fill in title and assignee");
      return;
    }
    
    if (task) {
      onSave({ ...formData, id: task.id });
    } else {
      onSave(formData);
    }
  };

  const handleDelete = () => {
    if (task && onDelete && confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id);
    }
  };

  if (!isOpen) return null;

  const statusOptions: { value: TaskStatus; label: string; color: string }[] = [
    { value: "todo", label: "To Do", color: "text-slate-500" },
    { value: "in-progress", label: "In Progress", color: "text-primary" },
    { value: "review", label: "Review", color: "text-amber-500" },
    { value: "done", label: "Done", color: "text-green-500" },
  ];

  const priorityOptions: { value: TaskPriority; label: string; color: string }[] = [
    { value: "low", label: "Low", color: "text-slate-500" },
    { value: "medium", label: "Medium", color: "text-blue-500" },
    { value: "high", label: "High", color: "text-rose-500" },
  ];

  const assigneeOptions = [
    { name: "Sarah Jenkins", type: "human" as TaskAssignee },
    { name: "Alex Chen", type: "human" as TaskAssignee },
    { name: "MK", type: "human" as TaskAssignee },
    { name: "Sudo", type: "agent" as TaskAssignee },
    { name: "Alpha", type: "agent" as TaskAssignee },
    { name: "Sigma", type: "agent" as TaskAssignee },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="modal-content relative w-full max-w-3xl bg-[--color-card] dark:bg-card-dark rounded-xl shadow-2xl border border-[--color-border] border-[--color-border] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-[--color-border] border-[--color-border] shrink-0">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">task_alt</span>
            <h1 className="text-xl font-bold tracking-tight">
              {task ? "Edit Task" : "Create New Task"}
            </h1>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[--color-surface] dark:hover:bg-slate-800 rounded-lg transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[--color-text-primary]">
              Task Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title..."
              className="w-full px-4 py-3 bg-[--color-surface] border border-[--color-border] rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[--color-text-primary]">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the task..."
              rows={4}
              className="w-full px-4 py-3 bg-[--color-surface] border border-[--color-border] rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none transition-all"
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Assignee */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[--color-text-primary]">
                Assignee <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.assignee}
                onChange={(e) => {
                  const selected = assigneeOptions.find(a => a.name === e.target.value);
                  setFormData({
                    ...formData,
                    assignee: e.target.value,
                    assigneeType: selected?.type || "human",
                  });
                }}
                className="w-full px-4 py-3 bg-[--color-surface] border border-[--color-border] rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                required
              >
                <option value="">Select assignee...</option>
                <optgroup label="Humans">
                  {assigneeOptions.filter(a => a.type === "human").map(a => (
                    <option key={a.name} value={a.name}>{a.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Agents">
                  {assigneeOptions.filter(a => a.type === "agent").map(a => (
                    <option key={a.name} value={a.name}>{a.name} (AI)</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[--color-text-primary]">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
                className="w-full px-4 py-3 bg-[--color-surface] border border-[--color-border] rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[--color-text-primary]">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
                className="w-full px-4 py-3 bg-[--color-surface] border border-[--color-border] rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              >
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Assignee Type Indicator */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[--color-text-primary]">
                Assignee Type
              </label>
              <div className="px-4 py-3 bg-[--color-surface] border border-[--color-border] rounded-lg flex items-center gap-2">
                {formData.assigneeType === "agent" ? (
                  <>
                    <span className="material-symbols-outlined text-primary text-[20px]">smart_toy</span>
                    <span className="text-sm font-medium text-primary">AI Agent</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-orange-500 text-[20px]">person</span>
                    <span className="text-sm font-medium text-orange-500">Human</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-[--color-border] border-[--color-border] bg-[--color-card] dark:bg-card-dark shrink-0 flex justify-between items-center">
          <div>
            {task && onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
              >
                Delete Task
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-[--color-text-secondary] hover:bg-[--color-surface] dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              {task ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
