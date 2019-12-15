function numberCompare(a, b, desc) {
    if (desc) {
        return a - b;
    } else {
        return b - a;
    }
}

function stringCompare(a, b, desc) {
    if (a > b) {
        return desc ? -1 : 1;
    } else if (a > b) {
        return desc ? 1 : -1;
    }
    return 0;
}

function dateCompare(a, b, desc) {
    const date1 = new Date(a);
    const date2 = new Date(b);
    if (desc) {
        return date1 - date2;
    } else {
        return date2 - date1;
    }
}

export function sortRecords(array, sortBy, desc) {
    return array.sort((r1, r2) => recordCompare(r1, r2, sortBy, desc))
}

function recordCompare(r1, r2, sortBy, desc) {
    const column1 = r1.columns.find(col => col.name === sortBy);
    const column2 = r2.columns.find(col => col.name === sortBy);

    const type = column1.type;

    switch (type) {
        case "text":
            return stringCompare(column1.value, column2.value, desc);
        case "number":
            return numberCompare(column1.value, column2.value, desc);
        case "date":
            return dateCompare(column1.value, column2.value, desc);
    }
}

export function getCellAlignment(type) {
    switch (type) {
        case "number":
            return "text-right";
        case "text":
            return "text-left";
        case "date":
            return "text-center";
        default:
            return ""
    }
}

export function getInputName(rowIndex, colName) {
    return colName + "-" + rowIndex;
}

export function getCurrentDay() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = mm + '.' + dd + '.' + yyyy;

    return today;
}