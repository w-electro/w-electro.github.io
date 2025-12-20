"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { StickyNote, Shuffle, Copy, GitCompare, Trash2, Plus } from "lucide-react";
import { useToolTracking } from "@/hooks/useToolTracking";
import { trackSavedFile } from "@/lib/activity-tracker";

const utilityTools = [
  { name: "مولد عشوائي", href: "/tools/utility/random", icon: Shuffle },
  { name: "كاشف التكرار", href: "/tools/utility/duplicate", icon: Copy },
  { name: "مقارنة النصوص", href: "/tools/utility/diff", icon: GitCompare },
  { name: "ملاحظات", href: "/tools/utility/notes", icon: StickyNote },
];

interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

export default function QuickNotesPage() {
  useToolTracking("utility-notes");
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("quickNotes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to load notes:", e);
      }
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0 || localStorage.getItem("quickNotes")) {
      localStorage.setItem("quickNotes", JSON.stringify(notes));
    }
  }, [notes]);

  const createNewNote = () => {
    setCurrentNote(null);
    setTitle("");
    setContent("");
  };

  const saveNote = () => {
    if (!title.trim() && !content.trim()) {
      return;
    }

    const now = Date.now();

    if (currentNote) {
      // Update existing note
      setNotes(notes.map(note =>
        note.id === currentNote.id
          ? { ...note, title: title.trim() || "بدون عنوان", content, timestamp: now }
          : note
      ));
    } else {
      // Create new note
      const newNote: Note = {
        id: now.toString(),
        title: title.trim() || "بدون عنوان",
        content,
        timestamp: now,
      };
      setNotes([newNote, ...notes]);
      // Track saved file for new notes
      trackSavedFile();
    }

    createNewNote();
  };

  const loadNote = (note: Note) => {
    setCurrentNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const deleteNote = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الملاحظة؟")) {
      setNotes(notes.filter(note => note.id !== id));
      if (currentNote?.id === id) {
        createNewNote();
      }
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ar', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4">
              <StickyNote className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
              ملاحظات سريعة
            </h1>
            <p className="text-gray-600 text-lg">احفظ ملاحظاتك مباشرة في المتصفح</p>
          </div>

          <ToolNavigation tools={utilityTools} category="الأدوات المساعدة" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">
                      {currentNote ? "تعديل الملاحظة" : "ملاحظة جديدة"}
                    </h3>
                    <Button onClick={createNewNote} variant="outline" size="sm">
                      <Plus className="h-4 w-4 ml-2" />
                      جديد
                    </Button>
                  </div>

                  <div>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="العنوان (اختياري)"
                      className="text-lg font-semibold"
                    />
                  </div>

                  <div>
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="اكتب ملاحظتك هنا..."
                      className="min-h-[400px]"
                      dir="auto"
                    />
                  </div>

                  <Button onClick={saveNote} size="lg" className="w-full">
                    {currentNote ? "تحديث الملاحظة" : "حفظ الملاحظة"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">الملاحظات المحفوظة ({notes.length})</h3>
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {notes.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">لا توجد ملاحظات محفوظة</p>
                  ) : (
                    notes.map((note) => (
                      <div
                        key={note.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                          currentNote?.id === note.id
                            ? "bg-orange-50 border-orange-300"
                            : "bg-white border-gray-200 hover:border-orange-200"
                        }`}
                        onClick={() => loadNote(note)}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">{note.title}</h4>
                            <p className="text-xs text-gray-500 truncate">{note.content}</p>
                            <p className="text-xs text-gray-400 mt-1">{formatDate(note.timestamp)}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNote(note.id);
                            }}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">💡 ملاحظات هامة:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• الملاحظات تُحفظ في متصفحك فقط (لا تُرسل إلى أي خادم)</li>
                <li>• لن تُحذف الملاحظات عند إغلاق المتصفح</li>
                <li>• قد تُحذف عند مسح بيانات المتصفح أو التخزين المحلي</li>
                <li>• للملاحظات الهامة، يُنصح بحفظها في مكان آخر أيضاً</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
