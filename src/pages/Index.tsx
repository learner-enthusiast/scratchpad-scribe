import { useState, useEffect } from 'react';
import { useNotes } from '@/hooks/useNotes';
import { NotesSidebar } from '@/components/NotesSidebar';
import { NoteEditor } from '@/components/NoteEditor';
import { FileText } from 'lucide-react';

const Index = () => {
  const { notes, createNote, updateNote, deleteNote } = useNotes();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  useEffect(() => {
    if (notes.length > 0 && !activeNoteId) {
      setActiveNoteId(notes[0].id);
    }
  }, [notes, activeNoteId]);

  const handleCreateNote = () => {
    const newId = createNote();
    setActiveNoteId(newId);
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
    if (activeNoteId === id) {
      setActiveNoteId(notes.length > 1 ? notes[0].id : null);
    }
  };

  const activeNote = notes.find((note) => note.id === activeNoteId);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <NotesSidebar
        notes={notes}
        activeNoteId={activeNoteId}
        onSelectNote={setActiveNoteId}
        onCreateNote={handleCreateNote}
      />
      <main className="flex-1 overflow-hidden">
        {activeNote ? (
          <div className="h-full p-8">
            <NoteEditor
              note={activeNote}
              onUpdate={updateNote}
              onDelete={handleDeleteNote}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <FileText className="h-24 w-24 mb-4 opacity-20" />
            <p className="text-xl">Select a note or create a new one to get started</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
