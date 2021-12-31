import { Loader } from "./Loader.jsx"

const { Link } = ReactRouterDOM


export class NoteAddBar extends React.Component {
    state = {
        isDisplayed: true,
        isColorBarDisplayed: 'none',
        colors: [{ color: 'color white', style: '#fff8dc' }, { color: 'color green', style: '#D5ECC2' }, { color: 'color orange', style: '#FFD3B4' }, { color: 'color red', style: 'FFAAA7' }]
    }



    render() {
        // const { id } = (this.props.note)
        const { colors } = this.state
        if (!colors) return <Loader />
        console.log(colors)
        return (
            <React.Fragment>

                {/* <img className="color-picker-img" title="Color picker" src="imgs/app/keep/color-picker.svg" />
                <div className="color-picker-add">
                {colors.map(color=>
                    <div className={color.color} onClick={() => this.props.onChangeColorAdd(color.style)}></div>
                )}</div>  */}
                

                <section className="bar-left">
                    <img className="color-picker-img" title="Color picker" src="imgs/app/keep/color-picker.svg" />
                    <div className="color-picker-add">
                        <div className="color yellow" onClick={() => this.props.onChangeColor('#FDFF8F')}></div>
                        <div className="color green" onClick={() => this.props.onChangeColor('#D5ECC2')}></div>
                        <div className="color orange" onClick={() => this.props.onChangeColor('#FFD3B4')}></div>
                        <div className="color red" onClick={() => this.props.onChangeColor('#FFAAA7')}></div>
                    </div>

                    {!this.props.isEditor &&<React.Fragment><img src="imgs/app/keep/note-add-bar/todos.svg" onClick={() => this.props.onChangeType('note-todos')}></img>
                    <img src="imgs/app/keep/note-add-bar/img.svg" onClick={() => this.props.onChangeType('note-img')}></img>
                    <img src="imgs/app/keep/note-add-bar/text.svg" onClick={() => this.props.onChangeType('note-txt')}></img></React.Fragment>}
                </section>

                <section className="bar-right">
                <img src="imgs/app/keep/note-add-bar/save.svg" onClick={this.props.onSaveNote}></img>
                {this.props.isEditor&&<img src="imgs/app/keep/note-add-bar/close.svg" onClick={this.props.onCloseNote}></img>}
                {!this.props.isEditor&&<img src="imgs/app/keep/note-add-bar/close.svg" onClick={() => this.props.onExpand(false)}></img>}
                </section>

            </React.Fragment>
        )
    }


}