import {NoteBar} from '../note-bar.jsx'


export class NoteImg extends React.Component {
    render() {
        const { url, title } = this.props.note.info
        const {note} = this.props
        return (
            <div className="note-preview">
                <h1>{title}</h1>
                <img className="note-img" src={url} />
                <NoteBar note={note} onRemoveNote={this.props.onRemoveNote}/>
            </div>
        )
    }
}

