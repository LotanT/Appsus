import { NoteList } from '../cmps/note-list.jsx'
import { NoteAdd } from '../cmps/note-add.jsx'
import { notesService } from '../services/note.service.js'

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




  render() {
    const {notes} = this.state
    return (
      <React.Fragment>
        <NoteAdd/>
      <section className="note-container">
        <NoteList notes={notes} />
      </section>
      </React.Fragment>
    )
}

}