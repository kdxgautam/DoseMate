import moment from "moment";

export const ConvertDate = (timestamp:number) => {

    return new Date(timestamp).setHours(0, 0, 0, 0);

}

export const formatDateForText=(date: Date)=>{
    return moment(date).format('LL');
}



export const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    console.log("date",date);
    const timeString = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    } );

    console.log("format time",timeString);
    return timeString;
}


export const getDatesRange = ( startDate:number | Date | undefined, endDate:number | Date |undefined)=> {
    const start = moment(new Date(startDate || Date.now()), 'MM/DD/YYYY');
    const end = moment(new Date(endDate || Date.now()), 'MM/DD/YYYY');
    const dates: string[] = [];

    while (start.isBefore(end)) {
        dates.push(start.format('MM/DD/YYYY'));
        start.add(1, 'days');
    }
    return dates;
}


export const GetDateRangeToDisplay=()=>{
    const dateList=[]
    for(let i=0;i<=7;i++){
        dateList.push({
        date:moment().add(i,'days').format('DD'), //27
        day:moment().add(i,'days').format('dd'), //tue
        formatedDate:moment().add(i,'days').format('L') //12/27/2024

        })

    }
    return dateList
}