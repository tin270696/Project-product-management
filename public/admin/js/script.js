// Status Button
const listButtonStatus = document.querySelectorAll("[button-status]");

if(listButtonStatus.length > 0) {
    let url = new URL(window.location.href);

    listButtonStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if(status) {
                url.searchParams.set("status", status);
            }
            else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href
        })
    })
}
// End Status Button

// Search Form
const formSearch = document.querySelector("#form-search");
if(formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        const keyword = event.target.elements.keyword.value;

        if(keyword) {
            url.searchParams.set("keyword", keyword);
        }
        else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })
}
// End Search Form

// Button Pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if(listButtonPagination.length > 0) {
    let url = new URL(window.location.href);
    
    listButtonPagination.forEach((button) => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        })
    })
}
// End Button Pagination

// Button Change Status
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");
if(listButtonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("[form-change-status]");

    listButtonChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const status = button.getAttribute("data-status");
            const path = formChangeStatus.getAttribute("data-path");

            const action = `${path}/${status}/${id}?_method=PATCH`;

            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })
}
// End Button Change Status

// Checkbox-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti) {
    const checkAll = checkboxMulti.querySelector("input[name='checkall']");
    const listCheckboxId = checkboxMulti.querySelectorAll("input[name='id']");

    checkAll.addEventListener("click", () => {
        if(checkAll.checked) {
            listCheckboxId.forEach(input => {
                input.checked = true;
            })
        }
        else {
            listCheckboxId.forEach(input => {
                input.checked = false;
            })
        }
    })

    listCheckboxId.forEach(inputId => {
        inputId.addEventListener("click", () => {
            const countInputIdChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            const lengthInputId = listCheckboxId.length;
            if(countInputIdChecked == lengthInputId) {
                checkAll.checked = true;
            }
            else {
                checkAll.checked = false;
            }
        })
    })
}
// End Checkbox-multi

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti) {
    formChangeMulti.addEventListener("submit", (event) => {
        event.preventDefault();

        const type = formChangeMulti.querySelector("select[name='type']").value;

        const listInputIdChecked = document.querySelectorAll("input[name='id']:checked");
        if(listInputIdChecked.length > 0) {
            const ids = [];

            listInputIdChecked.forEach(input => {
                const id = input.value;
                if(type == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`);
                }
                else {
                    ids.push(id);
                }
            })

            const stringId = ids.join(", ");

            const input = formChangeMulti.querySelector("input[name='ids']");
            input.value = stringId;

            if(type == "delete-all") {
                const isConfirm = confirm("Bạn có chắc muốn xóa các bản ghi này không?");
                if(!isConfirm) {
                    return;
                }
            }

            formChangeMulti.submit();
        }
        else {
            alert("Vui lòng chọn ít nhất 1 bản ghi !");
        }
    })
}
// End Form Change Multi

// Delete Button
const listButtonDelete = document.querySelectorAll("[button-delete]");
if(listButtonDelete.length > 0) {
    const formDeleteItem = document.querySelector("[form-delete-item]");
    listButtonDelete.forEach((button) => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xóa?");
            if(isConfirm) {
                const id = button.getAttribute("data-id");
                const path = formDeleteItem.getAttribute("data-path");
                const action = `${path}/${id}?_method=PATCH`;

                formDeleteItem.action = action;

                formDeleteItem.submit();
            }
        })
    })
}
// End Delete Button

// Show Alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
    let time = showAlert.getAttribute("data-time");
    time = parseInt(time);

    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, time);

    const closeAlert = showAlert.querySelector("[close-alert]");
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
}
// End Show Alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", () => {
        const file = uploadImageInput.files[0];
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })
}
// End Upload Image

// Restore Button
const listButtonRestore = document.querySelectorAll("[button-restore]");
if(listButtonRestore.length > 0) {
    const formRestore = document.querySelector("[form-restore]");

    listButtonRestore.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const path = formRestore.getAttribute("data-path");
            const action = `${path}/${id}?_method=PATCH`

            formRestore.action = action;
            formRestore.submit();
        })
    })
}
// End Restore Button

// Sort
const sort = document.querySelector("[sort]");
if(sort) {
    let url = new URL(window.location.href);
    const sortSelect = sort.querySelector("[sort-select]");
    // Thay đổi sắp xếp
    sortSelect.addEventListener("change", () => {
        const [sortKey, sortValue] = sortSelect.value.split("-");

        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);

        window.location.href = url.href;
    })

    // Thêm selected cho thay đổi đang được chọn
    const selectedSortKey = url.searchParams.get("sortKey");
    const selectedSortValue = url.searchParams.get("sortValue");
    if(selectedSortKey && selectedSortValue) {
        const stringSort = `${selectedSortKey}-${selectedSortValue}`;
        const selectedOption = document.querySelector(`option[value='${stringSort}']`);
        selectedOption.selected = true;
    }
}
// End Sort

// // Selected cho mục cha trong edit
// const optionParentId = document.querySelector("[option-parent-id]");
// if(optionParentId) {
//     const parentId = optionParentId.querySelector("select[name='parent_id']");
//     const selectedOption = parentId.options[parentId.selectedIndex];
//     if(selectedOption.value != "") {
//         Array.from(parentId.options).forEach(option => {
//             if (option.value === selectedOption.value) {
//                 option.selected = true;
//             } else {
//                 option.selected = false;
//             }
//         });
//     }
// }
// // Selected cho mục cha trong edit

// Table Permissions
const buttonSubmitPermissions = document.querySelector("[button-submit-permissions]");

if(buttonSubmitPermissions) {
    buttonSubmitPermissions.addEventListener("click", () => {
        const roles = [];
        const tablePermissions = document.querySelector("[table-permissions]");
        const rows = tablePermissions.querySelectorAll("tbody tr[data-name]");

        rows.forEach((row, index) => {
            const dataName = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");

            if(dataName == "id") {
                inputs.forEach(input => {
                    const id = input.value;
                    roles.push({
                        id: id,
                        permissions: []
                    });
                })
            }
            else {
                inputs.forEach((input, index) => {
                    const inputChecked = input.checked;
                    if(inputChecked) {
                        roles[index].permissions.push(dataName);
                    }
                })
            }
        })

        if(roles.length > 0) {
            const formChangePermissions = document.querySelector("[form-change-permissions]");
            const inputRoles = formChangePermissions.querySelector("input[name='roles']");
            inputRoles.value = JSON.stringify(roles);
            formChangePermissions.submit();
        }
    })
}
// End Table Permissions

// Default data cho trang permissions
const dataRecords = document.querySelector("[data-records]");
if(dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
    const tablePermissions = document.querySelector("[table-permissions]");
    console.log(tablePermissions);

    records.forEach((record, index) => {
        const permissions = record.permissions;
        permissions.forEach(permission => {
            const row = tablePermissions.querySelector(`tr[data-name="${permission}"]`);
            const input = row.querySelectorAll("input")[index];
            input.checked = true;
        })
    })
}
// End Default data cho trang permissions