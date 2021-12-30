import { notesService } from "../services/note.service.js";
import { Loader } from "./Loader.jsx";

const { withRouter } = ReactRouterDOM;

export class NoteEdit extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        // const { noteId } = this.props.match.params
        this.loadNote()


    }

    loadNote = () => {
        const noteId = this.props.noteId
        notesService.getNoteById(noteId).then(note => {
            if (!note) return this.props.onCloseNote
            this.setState({ note })
        })
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({
            note: { ...prevState.note, info: { ...prevState.note.info, [field]: value } },
        }));
        console.log(this.state.note)
    };


    onSaveNote=()=>{
        const note = this.state.note
        notesService.onUpdatedNote(note)
        this.props.onCloseNote()

    }

    render() {
        const { note } = this.state
        if (!note) return <Loader />
        // const {backgroundColor }=this.state.style
        return (
            <React.Fragment>
                <div className="screen" onClick={this.props.onCloseNote}></div>
                <div className="note-edit" style={note.style} >
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={note.info.title}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="txt"
                        placeholder="Text"
                        value={note.info.txt}
                        onChange={this.handleChange}
                    />
                    <div className="note-editor-bar">
                        <button className="note-btn-save" onClick={this.onSaveNote}>Save</button>
                        <button className="note-btn-close" onClick={this.props.onCloseNote}>Close</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}
