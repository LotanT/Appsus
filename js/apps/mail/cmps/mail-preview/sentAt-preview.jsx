
export function GetDateFormat({sentAt}){
    const time = new Date (sentAt)
    const now = Date.now()
    if(now - sentAt < 1000*60*60*24){
        let hour = time.getHours(time)
        let min = time.getMinutes(time)
        if(hour<10) hour = '0'+hour;
        if(min<10) min = '0'+min;
        return <h1>{hour}:{min}</h1>
    }
    const month = time.getMonth()+1
    const day = time.getDay()
    const year = time.getFullYear()%100
    return <h1>{day}/{month}/{year}</h1>
}