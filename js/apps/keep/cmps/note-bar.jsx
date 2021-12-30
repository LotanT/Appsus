const { Link } = ReactRouterDOM


export class NoteBar extends React.Component {
    state={
        isDisplayed:true
    }

    render(){
        const {id} = (this.props.note)
        return(
            <section className="note-bar">
            <Link className="note-bar-button" to={`/notes/${id}`}><img src="imgs/app/keep/edit.svg" /></Link>
            {/* <img title="Edit note" onClick={() => this.props.onRemoveNote(this.props.note.id)} src="imgs/app/keep/edit.svg" /> */}
            <img title="Delete note" onClick={() => this.props.onRemoveNote(this.props.note.id)} src="imgs/app/keep/trash-can.svg" />
            </section>
        )
    }


}