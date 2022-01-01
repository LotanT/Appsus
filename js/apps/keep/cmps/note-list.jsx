import { NotePreview } from './note-preview.jsx';

import { notesService } from '../services/note.service.js';
import { Loader } from './loader.jsx';


export class NoteList extends React.Component {
  state = {
    notes: this.props.notes,
    search: ''
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notes !== this.props.notes) {
      this.setState({ notes: this.props.notes })
    }
  }
  onRemoveNote = (noteId) => {
    notesService.removeNote(noteId).then(notes => this.setState({ notes }))

  }
  onPinNote = (note) => {
    const updatedNote = { ...note, isPinned: !note.isPinned }
    notesService.onUpdatedNote(updatedNote).then(notes => this.setState({ notes }))
    
  }

  render() {
    const { notes } = this.state
    if (!notes) return <Loader />
    return (
      <React.Fragment>

        <span className="note-list-title">Pinned notes: </span>
        <div className="notes-list">
        {notes && notes.map(note =>
          <React.Fragment>
            {note.isPinned &&
                <NotePreview key={note.id} note={note} onPinNote={this.onPinNote} onRemoveNote={this.onRemoveNote} />
              }
          </React.Fragment>
        )}
        </div>
        <hr />

        <span className="note-list-second-title">Other notes: </span>
        <div className="notes-list">
        {notes && notes.map(note =>
          <React.Fragment>
            {!note.isPinned &&
                <NotePreview key={note.id} note={note} onPinNote={this.onPinNote} onRemoveNote={this.onRemoveNote} />
             }
          </React.Fragment>
        )}
         </div>



      </React.Fragment>
    )
  }



}



