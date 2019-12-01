export const parseDocumentToNumber = (text) => {
    if (!text) {
        return;
    }

    let regex = /(\.)|(-)|(\/)|(\()|(\))|(\s)/;

    while ((m = regex.exec(text) !== null)) {
        text = text.replace(/(\.)|(-)|(\/)|(\()|(\))|(\s)/, '');
    }

    return text;
}

export const convertStringToDate = (date) => {
    if (!date) {
        return;
    }

    let parts = date.split("/");
    return parts[2] + "-" + parts[1] + "-" + parts[0];
}

export const convertDateToString = (date) => {
    if (!date) {
        return;
    }

    let parts = date.split("-");
    return parts[2] + "/" + parts[1] + "/" + parts[0];
}

export const convertStringToDateTime = (date, hour) => {
    if (!date || !hour) {
        return;
    }

    let parts = date.split("/");
    let newDate = parts[2] + "-" + parts[1] + "-" + parts[0];

    return newDate + " " + hour + ":00";
}

export const convertDateTimeToString = (date) => {
    if (!date) {
        return;
    }

    let parts = date.split(" ");
    let dateParts = parts[0].split("-");
    let hourParts = parts[1].split(":");

    let newDate = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
    let newHour = hourParts[0] + ":" + hourParts[1];
    return {date: newDate, hour: newHour};
}