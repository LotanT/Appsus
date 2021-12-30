import { utilService } from '../../../services/util.service.js'
import { notesService } from '../services/note.service.js'
import { Loader } from './Loader.jsx';

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
            let todoValue = [...this.state.note.info.todos]
            todoValue[key - 1] = value
            this.setState((prevState) => ({
                note: { ...prevState.note, info: { ...prevState.note.info, [field]: todoValue } }
            }))

        } else {
            this.setState((prevState) => ({
                note: { ...prevState.note, info: { ...prevState.note.info, [field]: value } },
            }))
        }
    };

    onSaveNote = () => {
        console.log('Saving..')
        const { note } = this.state
        const { onNoteAdd } = this.props
        console.log(note)
        onNoteAdd(note)
        this.setState({
            note: {
                id: utilService.makeId(),
                type: 'note-txt',
                info: { url: '', txt: '', title: '', todos: [''] },
                style: { backgroundColor: '#FFD3B4' },
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
        console.log(this.state.numOfTodos)
        this.setState((prevState) => ({ numOfTodos: prevState.numOfTodos + 1 }));
        this.setState((prevState) => ({
            note: { ...prevState.note, info: { ...prevState.note.info},todos:[...prevState.todos,''] }
        }))    }


    render() {

        let { isExpanded, note, numOfTodos, newTodos } = this.state
        let { info } = this.state.note
        if (!note) return <Loader />

        let fillValues = this.getValues()
        return (
            <div className="note-add">
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
                    new Array(numOfTodos).fill(1).map((idx) => (
                        <section key={idx}>
                            <input type="checkbox" />
                            <input
                                name="todos"
                                type="text"
                                placeholder={fillValues.placeholder}
                                value={info.todos[idx]}
                                id={idx}
                                onChange={this.handleChange} />
                            <button onClick={this.addToDo}>+</button>
                        </section>
                    )
                    )}


                {isExpanded && <div className="note-bar-add">
                    <button className="note-add-img" onClick={() => this.onChangeType('note-todos')}>todos</button>
                    <button className="note-add-img" onClick={() => this.onChangeType('note-img')}>img</button>
                    <button className="note-add-submit" onClick={this.onSaveNote}>Submit</button>
                    <button className="note-add-close" onClick={() => this.onExpand(false)}>Close</button>
                </div>}
            </div>
        )
    }

}
