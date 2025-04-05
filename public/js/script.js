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

// Update Cart
const tableCart = document.querySelector("[table-cart]");
if(tableCart) {
    const listInputQuantity = tableCart.querySelectorAll("input[name='quantity']");
    listInputQuantity.forEach(input => {
        input.addEventListener("change", () => {
            const quantity = input.value;
            const productId = input.getAttribute("item-id");

            window.location.href = `cart/update/${productId}/${quantity}`;
        })
    })
}
// End Update Cart