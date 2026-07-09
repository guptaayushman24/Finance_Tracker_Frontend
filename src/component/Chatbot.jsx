import React, { useState, useRef, useEffect } from "react";
import { FiMessageSquare, FiX, FiSend } from "react-icons/fi";
import axiosInstance from "../util/AxiosInstance";
import { CHATBOT_BASE_URL } from "../config/api";
import "../css/Chatbot.css";

// ─── Replace this function with your real API call ───────────────────────────
async function sendMessage(userText) {
  const response = await axiosInstance.post(`${CHATBOT_BASE_URL}/chatbot/query`, {
    query: userText,
  });
  return response.data;          // adjust to your response shape
}
// ─────────────────────────────────────────────────────────────────────────────
// async function sendMessage(userText) {
//   // TODO: delete this placeholder and uncomment + adapt the block above
//   await new Promise((r) => setTimeout(r, 1500));
//   return `You said: "${userText}" — replace this with your API response.`;
// }

const WELCOME = {
  id: 0,
  role: "bot",
  text: "Hi! I'm your Finance AI Assistant. Ask me anything about your expenses, budgets, or financial insights!",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) textareaRef.current?.focus();
  }, [isOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text }]);
    setInput("");
    setIsTyping(true);

    try {
      const reply = await sendMessage(text);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "bot", text: reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        className={`chatbot-fab ${isOpen ? "chatbot-fab--open" : ""}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Toggle finance assistant"
      >
        {isOpen ? <FiX size={22} /> : <FiMessageSquare size={22} />}
      </button>

      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div className="chatbot-header__avatar">AI</div>
            <div className="chatbot-header__info">
              <span className="chatbot-header__name">Finance Assistant</span>
              <span className="chatbot-header__status">
                <span className="chatbot-status-dot" />
                Online
              </span>
            </div>
            <button
              className="chatbot-header__close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <FiX size={16} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chatbot-msg chatbot-msg--${msg.role}`}
              >
                {msg.role === "bot" && (
                  <div className="chatbot-msg__avatar">AI</div>
                )}
                <div className="chatbot-msg__bubble">{msg.text}</div>
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-msg chatbot-msg--bot">
                <div className="chatbot-msg__avatar">AI</div>
                <div className="chatbot-msg__bubble chatbot-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chatbot-input-area">
            <textarea
              ref={textareaRef}
              className="chatbot-input"
              placeholder="Ask about your finances…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={isTyping}
            />
            <button
              className={`chatbot-send-btn${
                !input.trim() || isTyping ? " chatbot-send-btn--disabled" : ""
              }`}
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              <FiSend size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
