import {NoteBar} from '../note-bar.jsx'

export class NoteToDos extends React.Component {
    render() {
        const { todos } = this.props.note.info
        const {note} = this.props
        return (
            <div className="note-preview">
                {todos.map(todo => (
                    <div key={todo.id}>
                    <input type="checkbox"/>
                    <span>{todo.txt}</span>
                    </div>
                  )
                )}
            <NoteBar note={note} onRemoveNote={this.props.onRemoveNote}/>
            </div>
            )
     }
}

