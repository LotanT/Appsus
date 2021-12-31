import { eventBusService } from "../../../services/event-bus.service.js"

import { NotePreview } from './note-preview.jsx';

import { notesService } from '../services/note.service.js';
import { Loader } from './Loader.jsx';


export class NoteList extends React.Component {
  state = {
    notes: this.props.notes,
    search:''
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notes !== this.props.notes) {
      this.setState({ notes: this.props.notes })
    }
  }
  onRemoveNote = (noteId) => {
    notesService.removeNote(noteId).then(notes => this.setState({ notes }))

  }

  render() {
    const { notes } = this.state
    if (!notes) return <Loader />
    return (
      <div className="notes-list">

        {notes && notes.map(note =>
          <NotePreview key={note.id} note={note} onRemoveNote={this.onRemoveNote} />)}

      </div>

    )
  }



}



