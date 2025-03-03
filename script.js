const cart = [];
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        const quantity = parseInt(this.previousElementSibling.value); // Get the quantity from the input

        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        
        updateCart();
    });
});

function updateCart() {
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');
    cartList.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ₱${item.price} x ${item.quantity}`;
        cartList.appendChild(listItem);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
    const checkoutButton = document.getElementById('checkout');
    checkoutButton.disabled = cart.length === 0;
}

document.getElementById('checkout').addEventListener('click', function () {
    document.getElementById('cart').style.display = 'none';
    document.getElementById('checkout-page').style.display = 'block';
    displayCheckoutSummary();
});

function displayCheckoutSummary() {
    const checkoutList = document.getElementById('checkout-list');
    const finalTotalPriceElement = document.getElementById('final-total-price');
    checkoutList.innerHTML = '';
    let finalTotalPrice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ₱${item.price} x ${item.quantity}`;
        checkoutList.appendChild(listItem);
        finalTotalPrice += item.price * item.quantity;
    });

    finalTotalPriceElement.textContent = finalTotalPrice.toFixed(2);
}

document.getElementById('complete-purchase').addEventListener('click', function () {
    document.getElementById('checkout-page').style.display = 'none';
    document.getElementById('thank-you').style.display = 'block';
});
