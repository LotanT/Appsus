import { NoteList } from '../cmps/note-list.jsx'
import { NoteAdd } from '../cmps/note-add.jsx'
import { NoteEdit } from '../cmps/note-edit.jsx'
import { notesService } from '../services/note.service.js'
import { eventBusService } from "../../../services/event-bus.service.js"
import { Loader } from '../cmps/Loader.jsx';

export class NoteIndex extends React.Component {
  state = {
    notes: null,
    search:''
  };

  removeEventBus = null

  componentDidUpdate(prevProps) {
    if (prevProps.notes !== this.props.notes) {
      this.setState({ notes: this.props.notes })
    }
  }

  componentDidMount() {
    this.loadNotes();
    this.removeEventBus = eventBusService.on('search', (search) => {
        this.loadNotes(search)

      })
    }
  

  componentWillUnmount() {
    this.removeEventBus()
  }


  loadNotes = (search = '') => {
    notesService.query(search).then((notes) => {
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
    let { notes } = this.state
    if (!notes) return <Loader />
    let noteId = this.props.match.params.noteId
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