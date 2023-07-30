
function postgresFilterCreator(filters) {

    let appendee = ' WHERE';
    let i = 0;
    for (x of Object.keys(filters)) {
        
        i+=1;
        appendee += ` ${x} LIKE ('%${filters[x]}%')`;

        if (i !== Object.keys(filters).length) appendee += ` AND`
    }

    return appendee;
}

module.exports = {
    postgresFilterCreator
}