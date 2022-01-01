const { Link } = ReactRouterDOM


export class NoteBar extends React.Component {
    state = {
        isDisplayed: true,
        isColorBarDisplayed: 'none'
    }
    



    render() {
        const { id } = (this.props.note)
        return (
            <section className="note-bar">

                <img className="color-picker-img" title="Color picker" src="imgs/app/keep/color-picker.svg" />
                <div className="color-picker">
                    <div className="color yellow"  onClick={() => this.props.onChangeColor('#FDFF8F')}></div>
                    <div className="color green" onClick={() => this.props.onChangeColor('#D5ECC2')}></div>
                    <div className="color orange" onClick={() => this.props.onChangeColor('#FFD3B4')}></div>
                    <div className="color red" onClick={() => this.props.onChangeColor('#FFAAA7')}></div>
                </div>
                
                <Link to={`/notes/${id}`}><img src="imgs/app/keep/edit.svg" /></Link>
                <Link to={`/mail/compose/${id}`}><img src="imgs/app/keep/email.svg" /></Link>
                <div className="pin-note" onClick={()=>this.props.onPinNote(this.props.note)}><img title="Pin note" src="imgs\app\keep\note-add-bar\pin.svg"/></div>
                <img title="Delete note" onClick={() => this.props.onRemoveNote(this.props.note.id)} src="imgs/app/keep/trash-can.svg" />
            </section>
        )
    }


}