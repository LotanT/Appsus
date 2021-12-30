const { Link } = ReactRouterDOM


export class NoteAddBar extends React.Component {
    state = {
        isDisplayed: true,
        isColorBarDisplayed: 'none',
        colors: [{ color: 'color white', style: '#fff8dc' }, { color: 'color green', style: '#D5ECC2' }, { color: 'color orange', style: '#FFD3B4' }, { color: 'color red', style: 'FFAAA7' }]
    }


    // onChangeColor = (bool) => {
    // setState(this.state.isColorBarDisplayed=)
    // }


    render() {
        const { id } = (this.props.note)
        const { colors } = this.state
        return (
            <section className="note-bar" >
                {/* <img className="color-picker-img" title="Color picker" src="imgs/app/keep/color-picker.svg" />
                <div className="color-picker">
                {colors.map((color)=>{
                    <div className={color.color}  onClick={() => this.props.onChangeColorAdd(color.style)}></div>
                })}</div> */}
                <img className="color-picker-img" title="Color picker" src="imgs/app/keep/color-picker.svg" />
                <div className="color-picker-add">
                    <div className="color white" onClick={() => this.props.onChangeColor('#fff8dc')}></div>
                    <div className="color green" onClick={() => this.props.onChangeColor('#D5ECC2')}></div>
                    <div className="color orange" onClick={() => this.props.onChangeColor('#FFD3B4')}></div>
                    <div className="color red" onClick={() => this.props.onChangeColor('#FFAAA7')}></div>
                </div>
            </section>
        )
    }


}