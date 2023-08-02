
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

function paginateResults(result, req) {

    if (!req.header('pageNumber') && !req.header('pageSize')) return result;

    const pageN = req.header('pageNumber') ? parseInt(req.header('pageNumber')) : 1;
    const pageS = req.header('pageSize') ? parseInt(req.header('pageSize')) : 10;

    const start = (pageN - 1) * pageS;
    const end = start + pageS;

    return result.slice(start, end);
    
}

module.exports = {
    postgresFilterCreator,
    paginateResults
}