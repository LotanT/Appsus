import { notesService } from "../services/note.service.js";
import { mailService } from "../../mail/services/mail.service.js";
import { utilService } from "../../../services/util.service.js";
import { Loader } from "./Loader.jsx";
import { NoteAddBar } from "./note-add-bar.jsx";

const { withRouter } = ReactRouterDOM;

export class NoteEdit extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        const { noteId } = this.props
        
        if(noteId){
            notesService.getNoteById(noteId).then((note)=>{
                if(!note){
                    let newNote = ''
                    mailService.getMailsById(noteId).then(mail=>{

                       console.log(mail)
                       newNote={
                               id: mail.id,
                               type: "note-txt",
                               isPinned: true,
                               info: {
                                   txt:  mail.body,
                                   title: mail.subject
                               },
                               style: {
                                   backgroundColor: "#98DDCA"
                               }
                       }
                       notesService.addNote(newNote).then(()=>this.setState({note:newNote}))
                    })
                }else return
            })

            
        }
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


    onChangeColorEdit =(color)=>{
        const updatedNote = { ...this.state.note, style: { backgroundColor: color } };
        this.setState({note:updatedNote})
    }

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
                        <NoteAddBar  onChangeColor= {this.onChangeColorEdit} isEditor={true} onSaveNote={this.onSaveNote} onCloseNote={this.props.onCloseNote} />
                    </div>
                </div>
            </React.Fragment>
        )
    }

}
