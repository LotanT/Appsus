import { notesIndex } from './notes-index.js'
import { storageService } from '../../../services/storage.service.js'

const KEY = 'noteDB'


export const notesService = {
    query
  };


_createNotes()

function query(filterBy = null) {
    const notes = _loadFromStorage()
    return Promise.resolve(notes)
    // const filteredBooks = _getFilteredBooks(notes, filterBy)
    // return Promise.resolve(filteredBooks)

}


function _createNotes() {
    var notes = _loadFromStorage();
    if (!notes || !notes.length) {
        notes = notesIndex.getNotes();
      _saveToStorage(notes);
    }
    return notes;
  }

function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}
function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}
