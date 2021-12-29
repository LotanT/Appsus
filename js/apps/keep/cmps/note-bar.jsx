export class NoteBar extends React.Component {
    state={
        isDisplayed:true
    }

    render(){
        console.log(this.props)
        return(
            <div className="note-bar">
            <img title="Delete note" onClick={() => this.props.onRemoveNote(this.props.note.id)} src="imgs/app/keep/trash-can.svg" />
            <img title="Delete note" onClick={() => this.props.onRemoveNote(this.props.note.id)} src="imgs/app/keep/trash-can.svg" />
            </div>
        )
    }


}