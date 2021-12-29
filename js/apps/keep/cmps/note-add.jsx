

export class NoteAdd extends React.Component {

    state = {
        isExpanded: false,
        note: {
            type: 'note-txt',
            info: { txt: '', title: '' },
            style: { backgroundColor: '#fff' },
        },
    }


    onExpand = (isExpanded) => {
        this.setState({ isExpanded });
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({
            note: { ...prevState.note, info: { ...prevState.note.info, [field]: value } },
        }))
    };



    render() {

        const { isExpanded } = this.state
        let { type, info, style } = this.state.note

        return (
            <div className="note-add">

                {isExpanded && <input 
                    name="title"
                    type="text"
                    placeholder='Enter Title'
                    value={info.txt}
                    onChange={this.handleChange}/>}

                <input onClick={() => this.onExpand(true)}
                    name="txt"
                    type="text"
                    placeholder='Enter note'
                    value={info.txt}
                    onChange={this.handleChange}
                />

            </div>
        )
    }

}
