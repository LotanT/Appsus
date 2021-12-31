import { utilService } from '../../../services/util.service.js'
import { notesService } from '../services/note.service.js'
import { Loader } from './Loader.jsx';
import { NoteAddBar } from './note-add-bar.jsx';
import { NoteBar } from './note-bar.jsx';

export class NoteAdd extends React.Component {

    state = {
        isExpanded: false,
        note: {
            id: utilService.makeId(),
            type: 'note-txt',
            info: { url: '', txt: '', title: '', todos: [''] },
            style: { backgroundColor: '#fff' },
        },
        newTodos: [''],
        numOfTodos: 1

    }


    onExpand = (isExpanded) => {
        this.setState({ isExpanded });
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;

        if (field === 'todos') {

            const key = target.id
            let todoValue = [...this.state.newTodos]
            todoValue[key] = value
            this.setState({ newTodos: todoValue });
            // this.setState((prevState) => ({
            //     note: { ...prevState.note, info: { ...prevState.note.info, [field]: todoValue } }
            // }))

        } else {
            this.setState((prevState) => ({
                note: { ...prevState.note, info: { ...prevState.note.info, [field]: value } },
            }))
        }
    };

    onSaveNote = () => {
        console.log('Saving..')
        let { note } = this.state
        const { onNoteAdd } = this.props
        if(note.type==='note-todos'){
            note.info.todos=this.state.newTodos
        }

        onNoteAdd(note)
        this.setState({
            note: {
                id: utilService.makeId(),
                type: 'note-txt',
                info: { url: '', txt: '', title: '', todos: [''] },
                style: { backgroundColor: '#fff' },
            },
        });
        this.setState({ isExpanded: false })
        this.setState({ newTodos: [''] })
        this.setState({ numOfTodos: 1 })

    }

    onChangeType = (type) => {
        this.setState((prevState) => ({ note: { ...prevState.note, type } }));
        // this.setState({ ...this.state.note,note: { type:val } })

    }

    getValues = () => {
        const { type } = this.state.note
        const { note } = this.state
        switch (type) {
            case ('note-txt'):
                return {
                    value: note.info.txt,
                    name: 'txt',
                    placeholder: 'Add note!'
                }

            case ('note-img'):
                return {
                    value: note.info.url,
                    name: 'url',
                    placeholder: 'Add image url!'
                }
            case ('note-todos'):
                return {
                    value: note.info.todos,
                    name: 'todo',
                    placeholder: 'Add todos !'
                }
        }
    }

    addToDo = () => {
        this.setState((prevState) => ({ numOfTodos: prevState.numOfTodos + 1 }));
        // this.setState((prevState) => ({note: { ...prevState.note,info: { ...prevState.note.info, todos:[{...prevState.note.todos}," "] }}}))
        // this.setState((prevState) => ({ ...prevState.note.info, todos:[{...prevState.note.info.todos}," "] }))
        // this.setState((prevState) => ({note.todos:[{...prevState.note.todos},' '] }))
        this.setState((prevState) => ({ newTodos: [...prevState.newTodos, ''] }));
    }


    
    onChangeColorAdd =(color)=>{
        const updatedNote = { ...this.state.note, style: { backgroundColor: color } };
        this.setState({note:updatedNote})
    }


    render() {

        let { isExpanded, note, numOfTodos, newTodos } = this.state
        let { info } = this.state.note
        if (!note) return <Loader />

        let fillValues = this.getValues()
        return (
            <div className="note-add" style={note.style}>
                {isExpanded && <input
                    name="title"
                    type="text"
                    placeholder='Enter Title'
                    value={info.title}
                    onChange={this.handleChange} />}

                {fillValues.name !== 'todo' && <input onClick={() => this.onExpand(true)}
                    name={fillValues.name}
                    type="text"
                    placeholder={fillValues.placeholder}
                    value={fillValues.value}
                    onChange={this.handleChange}
                />}

                {fillValues.name === 'todo' &&
                    new Array(numOfTodos).fill(0).map((val,idx) => (
                        <section key={idx}>
                            <input type="checkbox" />
                            <input
                                name="todos"
                                type="text"
                                placeholder={fillValues.placeholder}
                                value={newTodos[idx]}
                                id={idx}
                                onChange={this.handleChange} />
                            <button onClick={this.addToDo}>+</button>
                        </section>
                    )
                    )}

                
                {isExpanded && <div className="note-bar-add">
                <NoteAddBar isEditor={false} note={note} onChangeColor={this.onChangeColorAdd} onChangeType={this.onChangeType} onSaveNote={this.onSaveNote} onExpand={this.onExpand}/>

                    {/* <button className="note-add-submit" onClick={this.onSaveNote}>Submit</button>
                    <button className="note-add-close" onClick={() => this.onExpand(false)}>Close</button> */}
                </div>}
            </div>
        )
    }

}
