import { NoteList } from '../cmps/note-list.jsx'
import { NoteAdd } from '../cmps/note-add.jsx'
import { NoteEdit } from '../cmps/note-edit.jsx'
import { notesService } from '../services/note.service.js'
import { Loader } from '../cmps/Loader.jsx';

export class NoteIndex extends React.Component {
  state = {
    notes: null,
  };

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes = () => {
    notesService.query().then((notes) => {
      this.setState({ notes })
    })
  };

  onNoteAdd = (userNote) => {
    notesService.addNote(userNote).then(() => {
      this.loadNotes()
    })

  }
  onCloseNote = () => {
    this.props.history.push('/notes');
    this.loadNotes();
  };




  render() {
    const { notes } = this.state
    if (!notes) return <Loader />
    const noteId = this.props.match.params.noteId
    return (
      <React.Fragment>
        <NoteAdd onChangeColorAdd={this.onChangeColorAdd} onNoteAdd={this.onNoteAdd} />
        <hr />
        <section className="notes-container">
          <NoteList notes={notes} />
        </section>
        {noteId && <NoteEdit onCloseNote={this.onCloseNote} noteId={noteId} />}
      </React.Fragment>
    )
  }

}