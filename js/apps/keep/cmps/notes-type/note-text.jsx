import {NoteBar} from '../note-bar.jsx'


export class NoteText extends React.Component {
    render() {
        const {note} = this.props
        const {txt,title} = this.props.note.info
        return(
            <div className="note-preview">
                <h1>{title}</h1>
                <p>{txt}</p> 
                <NoteBar note={note} onRemoveNote={this.props.onRemoveNote}/>
            </div>
        )
        
     }
}
