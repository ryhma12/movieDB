


const CurrentDate = () =>{
    const today = new Date();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const date = today. getDate();
    const currentDate = date + "/" + month + "/" + year;

    return(
            currentDate
    )
}

export default CurrentDate;