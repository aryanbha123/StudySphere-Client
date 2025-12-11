import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import {
  Close,
  Visibility,
  FileDownload,
  PictureAsPdf,
} from "@mui/icons-material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import client from "../../api";
import { getUserId } from "../../store/slice/authSlice";

/* -----------------------------------------------------
    ✔ TanStack Hook Inside the Same File
------------------------------------------------------*/
function useUserNotes(userId) {
  return useQuery({
    queryKey: ["notes", userId],
    queryFn: async () => {
      const res = await client.get(`api/notes/${userId}`);
      return res.data?.data || [];
    },
    enabled: !!userId,
  });
}

/* -----------------------------------------------------
    ✔ PDF Export Utility inside same file
------------------------------------------------------*/
async function exportPDF(note) {
  const pdf = new jsPDF("p", "pt", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  let y = 40;

  pdf.setFont("Helvetica", "bold");
  pdf.setFontSize(20);
  pdf.text(note.title, pageWidth / 2, y, { align: "center" });
  y += 30;

  pdf.setFont("Helvetica", "normal");
  pdf.setFontSize(12);

  for (const msg of note.notes) {
    const text = `${msg.content}\n(${new Date(msg.createdAt).toLocaleString()})`;
    const split = pdf.splitTextToSize(text, pageWidth - 80);

    if (y + split.length * 14 > 800) {
      pdf.addPage();
      y = 40;
    }

    pdf.text(split, 40, y);
    y += split.length * 14 + 20;
  }

  pdf.save(`${note.title}.pdf`);
}

/* -----------------------------------------------------
    ✔ Note Viewer Modal Component
------------------------------------------------------*/
function NoteViewer({ note, onClose }) {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle
        sx={{
          background: "#0d0d0d",
          color: "#fff",
          borderBottom: "1px solid #333",
        }}
      >
        {note.title}

        <IconButton
          sx={{ color: "#fff", float: "right" }}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          background: "#0d0d0d",
          color: "#e5e5e5",
          paddingTop: 3,
          paddingBottom: 4,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {/* PDF button */}
        <div className="flex justify-end my-4">
          <button
            onClick={() => exportPDF(note)}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm flex items-center gap-2"
          >
            <PictureAsPdf sx={{ fontSize: 18 }} /> Export PDF
          </button>
        </div>

        {note.notes.map((msg) => (
          <div
            key={msg._id}
            className="bg-[#1a1a1a] border border-gray-700 p-4 mb-3 rounded-xl"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {msg.content}
            </ReactMarkdown>

            <p className="text-xs text-gray-500 mt-2">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}

/* -----------------------------------------------------
    ✔ Main Page
------------------------------------------------------*/
export default function NotesPage() {

  const userId = getUserId();
  const { data: notes, isLoading } = useUserNotes(userId);
  const [selectedNote, setSelectedNote] = useState(null);

  if (isLoading)
    return <div className="text-gray-300 p-6">Loading notes...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-200">
      <h2 className="text-2xl text-black font-semibold mb-4">
        Your Study Notes
      </h2>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes?.map((note) => (
          <div
            key={note._id}
            className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-700 shadow-md hover:border-blue-500 hover:shadow-blue-900/30 transition cursor-pointer"
            onClick={() => setSelectedNote(note)}
          >
            <h3 className="text-lg font-bold text-white">{note.title}</h3>

            <p className="text-sm text-gray-400 mt-1">
              {new Date(note.createdAt).toLocaleString()}
            </p>

            <p className="mt-3 text-gray-300 text-sm line-clamp-3">
              {note.notes[0]?.content?.slice(0, 80)}...
            </p>

            <div className="flex items-center justify-between mt-4">
              <button className="text-blue-400 text-sm flex items-center gap-1">
                <Visibility sx={{ fontSize: 18 }} /> Open
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  exportPDF(note);
                }}
                className="text-green-400 text-sm flex items-center gap-1"
              >
                <FileDownload sx={{ fontSize: 18 }} /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedNote && (
        <NoteViewer
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
        />
      )}
    </div>
  );
}
