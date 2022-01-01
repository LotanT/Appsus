import { NoteText } from './notes-type/note-text.jsx'
import { NoteToDos } from './notes-type/note-todos.jsx';
import { NoteImg } from './notes-type/note-img.jsx';

import { notesService } from '../services/note.service.js';


export class NotePreview extends React.Component {
    state = {
        note: this.props.note

    }

    componentDidUpdate(prevProps) {
        if (prevProps.note !== this.props.note) {
            this.setState({ note: this.props.note });
        }
    }

    onChangeColor = (color) => {
        const updatedNote = { ...this.state.note, style: { backgroundColor: color } };
        notesService.onUpdatedNote(updatedNote)
        this.setState({ note: updatedNote })
    }


    render() {
        const { note } = this.state
        const { type } = this.state.note


        const DynamicCmp = (props) => {
            switch (type) {
                case 'note-txt':
                    return <NoteText {...props} />
                case 'note-todos':
                    return <NoteToDos {...props} />
                case 'note-img':
                    return <NoteImg {...props} />
                default:
                    return <div>Not Found</div>
            }

        }


        return (
        <DynamicCmp note={note} onPinNote={this.props.onPinNote} onChangeColor={this.onChangeColor} onRemoveNote={this.props.onRemoveNote}/>
        )
    }

}
