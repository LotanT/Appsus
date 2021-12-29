import {NoteBar} from '../note-bar.jsx'


export class NoteText extends React.Component {
    render() {
        const {note} = this.props
        const {txt} = this.props.note.info
        return(
            <div className="note-preview">
                {txt}
                <NoteBar note={note} onRemoveNote={this.props.onRemoveNote}/>
            </div>
        )
        
     }
}
