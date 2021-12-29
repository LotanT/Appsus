import { NotePreview } from './note-preview.jsx';

import { notesService } from '../services/note.service.js';


export class NoteList extends React.Component {
state = {
   notes: this.props.notes
}

componentDidUpdate(prevProps) {
    if (prevProps.notes !== this.props.notes) {
      this.setState({ notes: this.props.notes })
    }
  }

onRemoveNote =(noteId)=>{
  notesService.removeNote(noteId).then(notes=>this.setState({notes}))

}
  
render(){
    const {notes} = this.state

    return(
    <div className="notes-list">
        {notes && notes.map(note=>
            <NotePreview key={note.key} note={note} onRemoveNote={this.onRemoveNote} />)}
    </div>

    )
}



}



