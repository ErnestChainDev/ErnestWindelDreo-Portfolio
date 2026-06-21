// src/components/AIAgent/AIAgent.jsx
import { useState, useCallback, useRef, useEffect } from "react";
import AIWidgetButton from "./AIWidgetButton";
import AIChatWindow from "./AIChatWindow";
import { useAI } from "../../hooks/useAI";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const WIDGET_SIZE_DESKTOP = 60;
const WIDGET_SIZE_MOBILE = 48;
const DEFAULT_OFFSET = { x: 20, y: 20 };

// Initial position always uses desktop size (it’ll shift a tiny bit on mobile,
// but that’s fine — we’ll clamp during rendering)
const getInitialPosition = () => {
  if (typeof window !== "undefined") {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      x: vw - DEFAULT_OFFSET.x - WIDGET_SIZE_DESKTOP,
      y: vh - DEFAULT_OFFSET.y - WIDGET_SIZE_DESKTOP,
    };
  }
  return { x: 0, y: 0 };
};

export default function AIAgent() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const widgetSize = isMobile ? WIDGET_SIZE_MOBILE : WIDGET_SIZE_DESKTOP;

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(getInitialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const widgetRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  const { chatHistory, isLoading, sendMessage } = useAI();

  // Clamp position to viewport based on current widget size (without effect)
  const clampedPosition = {
    x: Math.max(0, Math.min(position.x, window.innerWidth - widgetSize)),
    y: Math.max(0, Math.min(position.y, window.innerHeight - widgetSize)),
  };

  // --- Drag handlers (unchanged) ---
  const handleMouseDown = useCallback(
    (e) => {
      if (e.target === widgetRef.current || widgetRef.current?.contains(e.target)) {
        e.preventDefault();
        setIsDragging(true);
        dragStart.current = {
          x: e.clientX,
          y: e.clientY,
          posX: position.x,
          posY: position.y,
        };
      }
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      let newX = dragStart.current.posX + dx;
      let newY = dragStart.current.posY + dy;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      newX = Math.max(0, Math.min(newX, vw - widgetSize));
      newY = Math.max(0, Math.min(newY, vh - widgetSize));
      setPosition({ x: newX, y: newY });
    },
    [isDragging, widgetSize]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) setIsDragging(false);
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const toggleChat = useCallback(() => {
    if (!isDragging) setIsOpen((prev) => !prev);
  }, [isDragging]);

  return (
    <>
      <div
        ref={widgetRef}
        onMouseDown={handleMouseDown}
        style={{
          position: "fixed",
          left: clampedPosition.x,   // 👈 use clamped coordinates
          top: clampedPosition.y,
          zIndex: 1000,
          width: widgetSize,
          height: widgetSize,
          touchAction: "none",
        }}
      >
        <AIWidgetButton
          onClick={toggleChat}
          isOpen={isOpen}
          isDragging={isDragging}
          size={widgetSize}
        />
      </div>

      {isOpen && (
        <AIChatWindow
          chatHistory={chatHistory}
          isLoading={isLoading}
          onSendMessage={sendMessage}
          onClose={() => setIsOpen(false)}
          isMobile={isMobile}
        />
      )}
    </>
  );
}