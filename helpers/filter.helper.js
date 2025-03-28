module.exports = (req) => {
    const filterStatus =[
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]
    // Thêm class để active các nút
    if(req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        filterStatus[index].class = "active";
    }
    else {
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }

    return filterStatus;
}