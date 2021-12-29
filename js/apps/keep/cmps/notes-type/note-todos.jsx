
export class NoteToDos extends React.Component {
    render() {
        const { todos } = this.props.note.info
        return (
            <div className="note-preview">
                {todos.map(todo => (
                    <div key={todo.id}>
                    <input type="checkbox"/>
                    <span>{todo.txt}</span>
                    </div>
                  )
                )}
            </div>
            )
     }
}


// {
//     id: "n103",
//     type: "note-todos",
//     info: {
//     label: "Get my stuff together",
//     todos: [
//     { txt: "Driving liscence", doneAt: null },
//     { txt: "Coding power", doneAt: 187111111 }
//     ]
//     }
//    }
//    ];