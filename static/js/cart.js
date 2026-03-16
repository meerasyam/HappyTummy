// Function to update totals
function updateTotals() {
    let subtotal = 0;
    const items = document.querySelectorAll('.cart-item');
    items.forEach(item => {
        const qty = parseInt(item.querySelector('.qty').textContent);
        const priceText = item.querySelector('.item-price').textContent;
        const price = parseInt(priceText.replace('₹', ''));
        subtotal += price * qty;
    });
    const delivery = 30;
    const total = subtotal + delivery;

    document.querySelector('.summary-row:nth-child(1) span:last-child').textContent = '₹' + subtotal;
    document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = '₹' + total;
    document.querySelector('.summary-row.total span:last-child').textContent = '₹' + total;
}

// Quantity buttons
document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const item = this.closest('.cart-item');
        const qtySpan = item.querySelector('.qty');
        let qty = parseInt(qtySpan.textContent);
        const priceText = item.querySelector('.item-price').textContent;
        const unitPrice = parseInt(priceText.replace('₹', '')) / qty; // assuming initial qty is 1

        if (this.textContent === '+') {
            qty++;
        } else if (this.textContent === '-' && qty > 0) {
            qty--;
        }
        qtySpan.textContent = qty;
        item.querySelector('.item-price').textContent = '₹' + (unitPrice * qty);
        if (qty === 0) {
            item.remove();
        }
        updateTotals();
    });
});

// Remove item buttons
document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const item = this.closest('.cart-item');
        item.remove();
        updateTotals();
    });
});

// Payment button
document.querySelector('.send-btn').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent form submission
    window.location.href = 'orderPlaced.html';
});

// Address select
document.querySelectorAll('input[name="address"]').forEach(radio => {
    radio.addEventListener('change', function() {
        document.querySelectorAll('.address-option').forEach(opt => opt.classList.remove('selected'));
        this.closest('.address-option').classList.add('selected');
        const newFields = document.getElementById('newAddressFields');
        if (this.value === 'new') {
            newFields.style.display = 'block';
        } else {
            newFields.style.display = 'none';
        }
    });
});

// Set initial selected
document.querySelector('input[name="address"]:checked').closest('.address-option').classList.add('selected');

// Payment options
document.querySelectorAll('.payment-option').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.payment-option').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const method = this.dataset.method;
        const cardDetails = document.querySelector('.card-details');
        const upiDetails = document.querySelector('.upi-details');
        if (method === 'card') {
            cardDetails.style.display = 'block';
            upiDetails.style.display = 'none';
        } else if (method === 'upi') {
            cardDetails.style.display = 'none';
            upiDetails.style.display = 'block';
        } else {
            cardDetails.style.display = 'none';
            upiDetails.style.display = 'none';
        }
    });
});

// Initial total update
updateTotals();
