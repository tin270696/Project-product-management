module.exports = (req, countRecord) => {
    const objectPagination = {
        currentPage: 1,
        limitItems: 4
    }

    if(req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page);
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    
    objectPagination.totalPage = Math.ceil(countRecord/objectPagination.limitItems);

    return objectPagination;
}