import {NoteBar} from '../note-bar.jsx'

export class NoteToDos extends React.Component {
    render() {
        const { todos } = this.props.note.info
        const {note} = this.props
        return (
            <div className="note-preview" style={note.style}>
                    <h1>{note.info.title}</h1>
                <section className="note-todo">
                {todos.map(todo => (
                    <section key={todo.id}>
                    <input type="checkbox"/>
                    <span>{todo.txt}</span>
                    </section>
                  )
                )}
                </section>
            <NoteBar note={note} onChangeColor={this.props.onChangeColor} onRemoveNote={this.props.onRemoveNote}/>
            </div>
            )
     }
}

