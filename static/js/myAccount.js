// My Account JavaScript

// Load saved data on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProfileData();
    loadAddressData();

    const editProfileBtn = document.querySelector('.profile-info .edit-btn');
    const profileInfo = document.querySelector('.profile-info');

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            toggleEditMode(profileInfo, ['h2', 'p:nth-child(2)', 'p:nth-child(3)'], saveProfileData);
        });
    }

    // Edit Address Buttons
    const addressCards = document.querySelectorAll('.address-card:not(.new-address-form)');
    addressCards.forEach((card, index) => {
        const editBtn = card.querySelector('.edit-btn');
        if (editBtn) {
            editBtn.addEventListener('click', function() {
                toggleEditMode(card, ['h3', 'p'], () => saveAddressData(index, card));
            });
        }
    });

    // Add New Address Button
    const addAddressBtn = document.querySelector('.add-address-btn');
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', function() {
            toggleNewAddressForm();
        });
    }
});

function loadProfileData() {
    const profileInfo = document.querySelector('.profile-info');
    const name = localStorage.getItem('profile_name') || 'Sneha Maria';
    const email = localStorage.getItem('profile_email') || 'sneha@email.com';
    const phone = localStorage.getItem('profile_phone') || '+91 9876543210';

    profileInfo.querySelector('h2').textContent = name;
    profileInfo.querySelector('p:nth-child(2)').innerHTML = `<strong>Email:</strong> ${email}`;
    profileInfo.querySelector('p:nth-child(3)').innerHTML = `<strong>Phone:</strong> ${phone}`;
}

function saveProfileData() {
    const profileInfo = document.querySelector('.profile-info');
    const name = profileInfo.querySelector('h2').textContent;
    const email = profileInfo.querySelector('p:nth-child(2)').textContent.replace('Email: ', '');
    const phone = profileInfo.querySelector('p:nth-child(3)').textContent.replace('Phone: ', '');

    localStorage.setItem('profile_name', name);
    localStorage.setItem('profile_email', email);
    localStorage.setItem('profile_phone', phone);
}

function loadAddressData() {
    const addressCards = document.querySelectorAll('.address-card');
    addressCards.forEach((card, index) => {
        const title = localStorage.getItem(`address_${index}_title`) || card.querySelector('h3').textContent;
        const details = localStorage.getItem(`address_${index}_details`) || card.querySelector('p').textContent;

        card.querySelector('h3').textContent = title;
        card.querySelector('p').textContent = details;
    });
}

function saveAddressData(index, card) {
    const title = card.querySelector('h3').textContent;
    const details = card.querySelector('p').textContent;

    localStorage.setItem(`address_${index}_title`, title);
    localStorage.setItem(`address_${index}_details`, details);
}

function toggleEditMode(container, selectors, saveCallback) {
    const isEditing = container.classList.contains('editing');

    if (isEditing) {
        // Save mode
        selectors.forEach(selector => {
            const element = container.querySelector(selector);
            if (element) {
                const input = element.querySelector('input');
                if (input) {
                    element.textContent = input.value;
                }
            }
        });
        container.classList.remove('editing');
        container.querySelector('.edit-btn').textContent = 'Edit';
        if (saveCallback) saveCallback();
    } else {
        // Edit mode
        selectors.forEach(selector => {
            const element = container.querySelector(selector);
            if (element && !element.querySelector('input')) {
                const text = element.textContent;
                element.innerHTML = `<input type="text" value="${text}" style="width: 100%; padding: 0.2rem; border: 1px solid #ccc; border-radius: 4px;">`;
            }
        });
        container.classList.add('editing');
        container.querySelector('.edit-btn').textContent = 'Save';
    }
}

function toggleNewAddressForm() {
    let form = document.getElementById('newAddressForm');
    if (!form) {
        // Create the form if it doesn't exist
        form = document.createElement('div');
        form.id = 'newAddressForm';
        form.innerHTML = `
            <div class="address-card new-address-form" style="border: 2px dashed #f5a623; background-color: #fffef7;">
                <h3>Add New Address</h3>
                <form id="addressForm">
                    <div class="form-group">
                        <label for="addressType">Address Type</label>
                        <input type="text" id="addressType" placeholder="e.g., Home, Work, Other" required>
                    </div>
                    <div class="form-group">
                        <label for="house">House / Apartment</label>
                        <input type="text" id="house" placeholder="House number, building name" required>
                    </div>
                    <div class="form-group">
                        <label for="street">Street</label>
                        <input type="text" id="street" placeholder="Street address" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="city">City</label>
                            <input type="text" id="city" required>
                        </div>
                        <div class="form-group">
                            <label for="pincode">Pincode</label>
                            <input type="text" id="pincode" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="landmarks">Landmarks</label>
                        <input type="text" id="landmarks" placeholder="Nearby landmarks">
                    </div>
                    <div class="form-actions">
                        <button type="button" class="edit-btn" onclick="saveNewAddress()">Save Address</button>
                        <button type="button" class="edit-btn" onclick="cancelNewAddress()">Cancel</button>
                    </div>
                </form>
            </div>
        `;
        document.querySelector('.addresses-grid').appendChild(form);
    } else {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
}

function saveNewAddress() {
    const form = document.getElementById('addressForm');
    const type = document.getElementById('addressType').value;
    const house = document.getElementById('house').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const pincode = document.getElementById('pincode').value;
    const landmarks = document.getElementById('landmarks').value;

    if (!type || !house || !street || !city || !pincode) {
        // Highlight empty required fields
        const requiredFields = ['addressType', 'house', 'street', 'city', 'pincode'];
        requiredFields.forEach(id => {
            const field = document.getElementById(id);
            if (!field.value.trim()) {
                field.style.borderColor = 'red';
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        return;
    }

    const addressText = `${house}, ${street}, ${city} ${pincode}${landmarks ? ', ' + landmarks : ''}`;

    // Create new address card
    const newCard = document.createElement('div');
    newCard.className = 'address-card';
    newCard.innerHTML = `
        <h3>${type}</h3>
        <p>${addressText}</p>
        <button class="edit-btn">Edit</button>
    `;

    // Add to grid before the form
    const grid = document.querySelector('.addresses-grid');
    const formElement = document.getElementById('newAddressForm');
    grid.insertBefore(newCard, formElement);

    // Save to localStorage
    const existingCards = document.querySelectorAll('.address-card:not(.new-address-form)');
    const addressIndex = existingCards.length - 1; // -1 because we just added one
    localStorage.setItem(`address_${addressIndex}_title`, type);
    localStorage.setItem(`address_${addressIndex}_details`, addressText);

    // Add event listener to the new edit button
    newCard.querySelector('.edit-btn').addEventListener('click', function() {
        const allCards = Array.from(document.querySelectorAll('.address-card:not(.new-address-form)'));
        const index = allCards.indexOf(newCard);
        toggleEditMode(newCard, ['h3', 'p'], () => saveAddressData(index, newCard));
    });

    // Hide form
    document.getElementById('newAddressForm').style.display = 'none';
    form.reset();
}

function cancelNewAddress() {
    document.getElementById('newAddressForm').style.display = 'none';
    document.getElementById('addressForm').reset();
}