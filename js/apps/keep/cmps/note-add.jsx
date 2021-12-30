import { utilService } from '../../../services/util.service.js'
import {notesService} from '../services/note.service.js'

export class NoteAdd extends React.Component {

    state = {
        isExpanded: false,
        note: {
            id: utilService.makeId(),
            type: 'note-txt',
            info: { txt: '', title: '' },
            style: { backgroundColor: '#fff' },
        },
    }


    onExpand = (isExpanded) => {
        this.setState({ isExpanded });
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({
            note: { ...prevState.note, info: { ...prevState.note.info, [field]: value } },
        }))
    };

    onSaveNote = () => {
        console.log('Saving..')
        const {note} = this.state
        const {onNoteAdd} = this.props
        onNoteAdd(note)
        this.setState({
            note: {
              id: utilService.makeId(),
              type: 'note-txt',
              info: { txt: '', title: '' },
              style: { backgroundColor: '#fff' },
            },
          });
          this.setState({ isExpanded: false })

    }


    render() {

        const { isExpanded } = this.state
        let { info } = this.state.note

        return (
            <div className="note-add">
                {isExpanded && <input 
                    name="title"
                    type="text"
                    placeholder='Enter Title'
                    value={info.title}
                    onChange={this.handleChange}/>}

                <input onClick={() => this.onExpand(true)}
                    name="txt"
                    type="text"
                    placeholder='Enter note'
                    value={info.txt}
                    onChange={this.handleChange}
                />
                {isExpanded &&<div className="note-bar-add">
                <button className="note-add-submit" onClick={this.onSaveNote}>Submit</button>
                <button className="note-add-close" onClick={()=>this.onExpand(false)}>Close</button>
                </div>}
            </div>
        )
    }

}
