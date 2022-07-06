export const monthNumber = (name) => {
    var number;
    switch(name) {
        case "Jan":
            number = 1;
            break;
        case "Feb":
            number = 2;
            break;
        case "Mar":
            number = 3;
            break;
        case "Apr":
            number = 4;
            break;
        case "May":
            number = 5;
            break;
        case "Jun":
            number = 6;
            break;
        case "Jul":
            number = 7;
            break;
        case "Aug":
            number = 8;
            break;
        case "Sep":
            number = 9;
            break;
        case "Oct":
            number = 10;
            break;
        case "Nov":
            number = 11;
            break;
        case "Dec":
            number = 12;
            break;
    }
    return number;
}