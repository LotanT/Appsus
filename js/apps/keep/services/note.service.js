import { notesIndex } from './notes-index.js'
import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const KEY = 'noteDB'


export const notesService = {
  query,
  removeNote,
  addNote,
  getNoteById,
  onUpdatedNote,
  
};


_createNotes()

function query(filterBy = null) {
  const notes = _loadFromStorage()
  if (!filterBy) return Promise.resolve(notes)
  const filteredNotes = _getFilteredNotes(notes, filterBy)
  return Promise.resolve(filteredNotes)

}

function _createNotes() {
  var notes = _loadFromStorage();
  if (!notes || !notes.length) {
    notes = notesIndex.getNotes();
    _saveToStorage(notes);
  }
  return notes;
}


function removeNote(id) {
  var notes = _loadFromStorage();
  const noteIdx = notes.findIndex((note) => note.id === id);
  notes.splice(noteIdx, 1);
  _saveToStorage(notes);
  return Promise.resolve(notes);
}

function addNote(userNote) {
  var notes = _loadFromStorage();

  if (userNote.type === 'note-todos') {
    let userNoteEdit = userNote.info.todos.map(todo => {
      return {
        txt: todo,
        doneAt: null,
        id: utilService.makeId()
      }
    });
    console.log(userNoteEdit)
    userNote.info.todos = userNoteEdit
  }

  notes.unshift(userNote);
  _saveToStorage(notes);
  return Promise.resolve(notes);
}

function getNoteById(noteId) {
  var notes = _loadFromStorage();
  var note = notes.find(function (note) {
    return noteId === note.id
  })
  return Promise.resolve(note)
}

function onUpdatedNote(updatedNote) {
  let notes = _loadFromStorage()
  let noteIdx = notes.findIndex((note) => note.id === updatedNote.id)
  notes[noteIdx] = updatedNote
  _saveToStorage(notes)
  return Promise.resolve(notes)
}

function _getFilteredNotes(notes,value) {
  return  notes.filter(note => {
      return note.info.title.includes(value)
  })
   
}

function _saveToStorage(notes) {
  storageService.saveToStorage(KEY, notes)
}
function _loadFromStorage() {
  return storageService.loadFromStorage(KEY)
}
