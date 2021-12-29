
export class NoteText extends React.Component {
    render() {
        const {txt} = this.props.note.info
        return(
            <div className="note-preview">
                {txt}
            </div>
        )
     }
}
