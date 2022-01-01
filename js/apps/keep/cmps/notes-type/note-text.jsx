import {NoteBar} from '../note-bar.jsx'


export class NoteText extends React.Component {
    render() {
        const {note} = this.props
        const {txt,title} = this.props.note.info
        return(
            <div className="note-preview" style={note.style}>
                <h1>{title}</h1>
                <p>{txt}</p> 
                <NoteBar onPinNote={this.props.onPinNote} note={note} onChangeColor={this.props.onChangeColor} onRemoveNote={this.props.onRemoveNote}/>
            </div>
        )
        
     }
}
