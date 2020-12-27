const formatValue = (val) => {
    if (parseInt(val) < 10) {
      val = "0" + val;
    }
    return val
  }

export const formatDateString = (date) => {
    console.log("Received date: ", date)
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = formatValue(month)
    let day = date.getDate();
    day = formatValue(day)
    console.log("Formatted date: ")
    console.log("  year: ", year);
    console.log("  month: ", month);
    console.log("  day: ", day);
    // let hour = date.getHours();
    // hour = formatValue(hour)
    // let minute = date.getMinutes();
    // minute = formatValue(minute)
    let hour = "00"
    let minute = "00"
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + "00"
  }
