import React, { useEffect, useRef, useState } from "react";
import client from "../../api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Send, Delete, Save } from "@mui/icons-material";
import { getUserId } from "../../store/slice/authSlice";

export default function Study() {
  // -----------------------
  // LOCAL CHAT STATE
  // -----------------------
  const userId = getUserId();
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("study_chat");
    return saved
      ? JSON.parse(saved)
      : [
        {
          role: "assistant",
          content: "Hello! Let's study together. What do you want to learn?",
          createdAt: new Date().toISOString(),
        },
      ];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [noteTitle, setNoteTitle] = useState("Study Notes");

  // RANGE POPUP STATES
  const [rangePopup, setRangePopup] = useState(false);
  const [rangeStart, setRangeStart] = useState(0);
  const [rangeEnd, setRangeEnd] = useState(0);

  const bottomRef = useRef(null);

  // -----------------------
  // AUTO SCROLL
  // -----------------------
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  // -----------------------
  // SAVE CHAT LOCALLY
  // -----------------------
  const persistChat = (chat) => {
    localStorage.setItem("study_chat", JSON.stringify(chat));
  };

  const appendMessage = (msg) => {
    setMessages((m) => {
      const updated = [...m, msg];
      persistChat(updated);
      return updated;
    });
  };

  // -----------------------
  // SEND MESSAGE
  // -----------------------
  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", content: trimmed, createdAt: new Date().toISOString() };
    appendMessage(userMsg);
    setInput("");
    setLoading(true);

    try {
      const conversationAsContents = [...messages, userMsg].map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));

      const payload = { contents: conversationAsContents, prompt: trimmed };

      const res = await client.post("/api/gemini/ask", payload);
      const data = res?.data || {};

      const text =
        data?.response?.choices?.[0]?.message?.content ||
        data?.choices?.[0]?.message?.content ||
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        data?.response?.text ||
        "Sorry, something went wrong.";

      appendMessage({
        role: "assistant",
        content: text,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      appendMessage({
        role: "assistant",
        content: "Error: Could not connect to the model.",
        createdAt: new Date().toISOString(),
      });
    }

    setLoading(false);
  };

  // -----------------------
  // PREPARE NOTES (RANGE)
  // -----------------------
  const prepareNotes = (start, end) => {
    const selected = messages.slice(start, end + 1).filter((m) => m.role === "assistant");

    return {
      userId,
      title: noteTitle || "Study Notes",
      notes: selected,
      totalMessages: selected.length,
    };
  };

  // -----------------------
  // SAVE NOTES
  // -----------------------
  const saveNotes = async () => {
    setSaving(true);
    const payload = prepareNotes(rangeStart, rangeEnd);

    try {
      await client.post("/api/notes", payload);
      alert("Notes saved!");
    } catch (err) {
      alert("Save failed.");
    }
    setSaving(false);
    setRangePopup(false);
  };

  // -----------------------
  // CLEAR CHAT
  // -----------------------
  const clearChat = () => {
    if (!confirm("Are you sure you want to clear the chat?")) return;

    const initial = [
      {
        role: "assistant",
        content: "Hello! Let's study together. What do you want to learn?",
        createdAt: new Date().toISOString(),
      },
    ];

    setMessages(initial);
    persistChat(initial);
  };

  return (
    <div className="flex rounded-2xl flex-col bg-[#FFF] text-white h-[calc(100vh-130px)]">

      {/* HEADER */}
      <div className="p-4 border-b border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-lg text-gray-800 font-semibold">Study Chat</h2>
          <p className="text-sm text-gray-500">Your personal study assistant.</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="bg-[#f4f4f4] border border-gray-400 px-3 py-2 rounded-md text-sm text-gray-800"
            placeholder="Notes title"
          />

          <Button variant="contained" color="primary" startIcon={<Save />} onClick={() => {
            setRangeStart(0);
            setRangeEnd(messages.length - 1);
            setRangePopup(true);
          }}>
            Save Notes
          </Button>

          <Button variant="outlined" color="error" startIcon={<Delete />} onClick={clearChat}>
            Clear Chat
          </Button>
        </div>
      </div>

      {/* CHAT MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] p-3 rounded-xl text-[15px] leading-relaxed break-words ${msg.role === "user"
                  ? "bg-[#1a1a1a] text-white rounded-br-none"
                  : "bg-[#ececec] text-black border border-gray-300 rounded-bl-none"
                }`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.content}
              </ReactMarkdown>
              <div className="text-[11px] text-gray-500 mt-1">{new Date(msg.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#1a1a1a] px-4 py-3 rounded-xl text-gray-400 animate-pulse">Thinking...</div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-gray-800 flex gap-3">
        <input
          type="text"
          placeholder="Ask anything to study..."
          className="flex-1 bg-[#141414] border border-gray-700 px-4 py-3 rounded-lg text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />

        <IconButton
          onClick={sendMessage}
          disabled={loading}
          sx={{ padding: "24px", borderRadius: "50%", bgcolor: "#000", color: "#fff" }}
        >
          <Send />
        </IconButton>
      </div>

      {/* SAVE RANGE POPUP */}
      {/* SAVE RANGE POPUP */}
      <Dialog open={rangePopup} onClose={() => setRangePopup(false)} fullWidth maxWidth="sm">
        <DialogTitle>Save Notes</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

          {/* Notes Title */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Notes Title</label>
            <input
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="border px-3 py-2 rounded text-sm w-full"
              placeholder="Enter notes title"
            />
          </div>

          {/* Range Start Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">From</label>
            <select
              value={rangeStart}
              onChange={(e) => setRangeStart(Number(e.target.value))}
              className="border px-3 py-2 rounded text-sm w-full"
            >
              {messages.map((m, idx) => {
                const preview = m.content.slice(0, 30).replace(/\n/g, " ");
                return (
                  <option key={idx} value={idx}>
                    ({idx}) {m.role === "user" ? "User" : "Assistant"}: {preview}...
                  </option>
                );
              })}
            </select>
          </div>

          {/* Range End Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">To</label>
            <select
              value={rangeEnd}
              onChange={(e) => setRangeEnd(Number(e.target.value))}
              className="border px-3 py-2 rounded text-sm w-full"
            >
              {messages.map((m, idx) => {
                const preview = m.content.slice(0, 30).replace(/\n/g, " ");
                return (
                  <option key={idx} value={idx}>
                    ({idx}) {m.role === "user" ? "User" : "Assistant"}: {preview}...
                  </option>
                );
              })}
            </select>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setRangePopup(false)}>Cancel</Button>
          <Button onClick={saveNotes} variant="contained" disabled={saving}>
            {saving ? "Saving..." : "Save Notes"}
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
