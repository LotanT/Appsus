import { NoteList } from '../cmps/note-list.jsx'
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
      <section className="note-container">
        <NoteList notes={notes} />
      </section>
    )
}

}