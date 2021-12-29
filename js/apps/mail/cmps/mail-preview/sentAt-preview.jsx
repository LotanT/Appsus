
export function GetDateFormat({sentAt}){
    const time = new Date (sentAt)
    const hour = time.getHours(time)
    const min = time.getMinutes(time)
    return <h1>{hour}:{min}</h1>
}