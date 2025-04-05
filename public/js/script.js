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