import {NoteBar} from '../note-bar.jsx'

export class NoteToDos extends React.Component {
    render() {
        const { todos } = this.props.note.info
        const {note} = this.props
        return (
            <div className="note-preview" style={note.style}>
                    <h1>{note.info.title}</h1>
                {todos.map(todo => (
               
                    <section key={todo.id} className="note-todo">
                    <input type="checkbox"/>
                    <span>{todo.txt}</span>
                    </section>
                    
                  )
                )}
            <NoteBar note={note} onChangeColor={this.props.onChangeColor} onRemoveNote={this.props.onRemoveNote}/>
            </div>
            )
     }
}

