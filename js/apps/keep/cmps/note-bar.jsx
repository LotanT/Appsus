const { Link } = ReactRouterDOM


export class NoteBar extends React.Component {
    state = {
        isDisplayed: true,
        isColorBarDisplayed: 'none'
    }
    

    // onChangeColor = (bool) => {
        // setState(this.state.isColorBarDisplayed=)
    // }


    render() {
        const { id } = (this.props.note)
        return (
            <section className="note-bar">
                <Link to={`/notes/${id}`}><img src="imgs/app/keep/edit.svg" /></Link>

                {/* <img title="Edit note" onClick={() => this.props.onRemoveNote(this.props.note.id)} src="imgs/app/keep/edit.svg" /> */}
                <img className="color-picker-img" title="Color picker" src="imgs/app/keep/color-picker.svg" />
                <div className="color-picker">
                    <div className="color white"  onClick={() => this.props.onChangeColor('#fff8dc')}></div>
                    <div className="color green" onClick={() => this.props.onChangeColor('#D5ECC2')}></div>
                    <div className="color orange" onClick={() => this.props.onChangeColor('#FFD3B4')}></div>
                    <div className="color red" onClick={() => this.props.onChangeColor('#FFAAA7')}></div>

                </div>
                <img title="Delete note" onClick={() => this.props.onRemoveNote(this.props.note.id)} src="imgs/app/keep/trash-can.svg" />
            </section>
        )
    }


}