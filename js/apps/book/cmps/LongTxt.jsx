

export function LongTxt ({txt,isLongTxtShown,onToggleDescription}){
    let result;
    let btnTxt;
    if(isLongTxtShown){
        result = txt;
        btnTxt = 'read less'
    }else if(txt.length > 100){
        result = txt.slice(0,100)
        result += '...'
        btnTxt = 'read more'
    }
    
    return(
        <section className="details-description">
            <h4>Description:</h4>
            <p>{result}<button className="reed-more" onClick={onToggleDescription}>{btnTxt}</button></p>
        </section>
    )
}