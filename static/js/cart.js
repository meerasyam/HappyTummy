// Removed totally completely broken updateTotals() and frontend Qty listeners because math is securely handled on the backend!

// Removed broken dummy redirect logic for the Send Button! 
// Now it natively triggers the HTML <form> POST firing directly to python views.py /checkout

// Address select
document.querySelectorAll('input[name="address"]').forEach(radio => {
    radio.addEventListener('change', function () {
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
    btn.addEventListener('click', function () {
        document.querySelectorAll('.payment-option').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const method = this.dataset.method;

        // Securely sync the visible UI click state directly into the hidden Form Input for the Python Backend!
        const modeInput = document.getElementById('selectedPaymentMode');
        if (modeInput) {
            if (method === 'card') modeInput.value = 'Credit/Debit Card';
            else if (method === 'upi') modeInput.value = 'UPI App';
            else modeInput.value = 'Cash on Delivery';
        }

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

// Initial calculations securely rendered by Flask Jinja so no startup JS needed
