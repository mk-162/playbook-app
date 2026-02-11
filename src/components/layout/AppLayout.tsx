"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ChatPanel } from "@/components/chat";
import Lenis from "lenis";

export default function AppLayout({ children, disableScroll = false }: { children: React.ReactNode, disableScroll?: boolean }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (disableScroll || !scrollContainerRef.current) return;

    const lenis = new Lenis({
      wrapper: scrollContainerRef.current,
      content: scrollContainerRef.current.firstElementChild as HTMLElement, // usually the direct child
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [disableScroll]);

  const mainClass = disableScroll
    ? "flex-1 relative overflow-hidden flex flex-col"
    : "flex-1 overflow-y-auto custom-scrollbar relative flex flex-col";

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          isChatOpen={isChatOpen} 
          onChatToggle={() => setIsChatOpen(!isChatOpen)} 
        />
        <div className="flex flex-1 overflow-hidden">
          <main
            ref={scrollContainerRef}
            className={mainClass}
          >
            {children}
          </main>
          <ChatPanel 
            isOpen={isChatOpen} 
            onClose={() => setIsChatOpen(false)} 
          />
        </div>
      </div>
    </div>
  );
}
