import { NoteText } from './notes-type/note-text.jsx'
import { NoteToDos } from './notes-type/note-todos.jsx';
import { NoteImg } from './notes-type/note-img.jsx';

export class NotePreview extends React.Component {
    state = {
        note: this.props.note
        
    }

    componentDidUpdate(prevProps) {
        if (prevProps.note !== this.props.note) {
            this.setState({ note: this.props.note });
        }
    }


    render() {
        const { note } = this.state
        const {type} = this.state.note
        console.log(note)
        console.log(type)

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
            <main>
                <DynamicCmp note={note} onRemoveNote={this.props.onRemoveNote}/>
            </main>
        )
    }

}
