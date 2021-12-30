import { utilService } from '../../../services/util.service.js'
import { notesService } from '../services/note.service.js'
import { Loader } from './Loader.jsx';

export class NoteAdd extends React.Component {

    state = {
        isExpanded: false,
        note: {
            id: utilService.makeId(),
            type: 'note-txt',
            info: { url:'',txt: '', title: '' },
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
        const { note } = this.state
        const { onNoteAdd } = this.props
        onNoteAdd(note)
        this.setState({
            note: {
                id: utilService.makeId(),
                type: 'note-txt',
                info: {url:'', txt: '', title: '' },
                style: { backgroundColor: '#FFD3B4' },
            },
        });
        this.setState({ isExpanded: false })

    }

    onChangeType = (val) => {
        console.log(val)
        this.setState({ ...this.state.note,note: { type:val } })

    }

    // getValues = () => {
    //     const { type } = this.state.note
    //     console.log(type)
    //     const { note } = this.state
    //     let values = {}
    //     switch (type) {
    //         case ('note-txt'):
    //             values = {
    //                 value: note.info.txt,
    //                 name: 'txt',
    //                 placeholder: 'Add note!'
    //             }
    //             break;
    //         case ('note-img'):
    //             values = {
    //                 value: note.info.url,
    //                 name: 'url',
    //                 placeholder: 'Add image url!'
    //             }
    //             break;
    //         case ('note-todos'):
    //             values = {
    //                 value: note.info.todos,
    //                 name: 'todo',
    //                 placeholder: 'Add todos !'
    //             }
    //             break;
    //     }
    //     return values
    // }




    render() {

        const { isExpanded, note, placeholder } = this.state
        let { info } = this.state.note
        if (!note) return <Loader />

        // let fillValues = this.getValues()

        // console.log(note)
        // console.log(fillValues)
        return (
            <div className="note-add">
                {isExpanded && <input
                    name="title"
                    type="text"
                    placeholder='Enter Title'
                    value={info.title}
                    onChange={this.handleChange} />}

                <input onClick={() => this.onExpand(true)}
                    name="txt"
                    type="text"
                    placeholder={placeholder}
                    value={info.txt || info.url}
                    onChange={this.handleChange}
                />


                {isExpanded && <div className="note-bar-add">
                    {/* <button className="note-add-img" onClick={() => this.onChangeType('note-img')}>img</button> */}
                    <button className="note-add-submit" onClick={this.onSaveNote}>Submit</button>
                    <button className="note-add-close" onClick={() => this.onExpand(false)}>Close</button>
                </div>}
            </div>
        )
    }

}
