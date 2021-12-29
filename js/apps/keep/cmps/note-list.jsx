import { NotePreview } from './note-preview.jsx';


export class NoteList extends React.Component {
state = {
   notes: this.props.notes
}


componentDidUpdate(prevProps) {
    if (prevProps.notes !== this.props.notes) {
      this.setState({ notes: this.props.notes })
    }
  }
  
render(){
    const {notes} = this.state
    console.log(notes)

    return(
    <div className="notes-container">
        {notes && notes.map(note=>
            <NotePreview key={note.key} note={note}/>)}
    </div>

    )
}



}



