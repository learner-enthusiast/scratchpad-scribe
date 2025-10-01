import { Note } from '@/types/note';
import { NoteCard } from './NoteCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NotesSidebarProps {
  notes: Note[];
  activeNoteId: string | null;
  onSelectNote: (id: string) => void;
  onCreateNote: () => void;
}

export function NotesSidebar({
  notes,
  activeNoteId,
  onSelectNote,
  onCreateNote,
}: NotesSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 border-r bg-secondary/30 flex flex-col h-screen">
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Notes</h1>
          <Button onClick={onCreateNote} size="icon" variant="default">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? 'No notes found' : 'No notes yet. Create one!'}
            </div>
          ) : (
            filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                isActive={note.id === activeNoteId}
                onClick={() => onSelectNote(note.id)}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
