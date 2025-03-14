// Dropdown navbar menu
let Open = document.getElementById("openList");
let Close = document.getElementById("closeList");
let MenuOpen = document.getElementById("dropDownNavMenu-list");

const clickopen = () => {
    Open.style.display = "none";
    Close.style.display = "flex";
    MenuOpen.style.display = "flex";
};

const clickclose = () => {
    Open.style.display = "flex";
    Close.style.display = "none";
    MenuOpen.style.display = "none";
};

// Orders form
const openOrderForm = () => {
    document.getElementById("orderFormWrapper").style.display = "flex";
};

const closeOrderForm = () => {
    // Resetting price
    document.getElementById('orderPrice').innerText = '0';

    // Resetting the form
    document.getElementById('orderForm').reset();

    removeDynamicFields();

    document.getElementById("orderFormWrapper").style.display = "none";
};

// Initially disable the "Add Item" Button
window.addEventListener('DOMContentLoaded', (event) => {
    const addItemButton = document.getElementById("addItemButton");
    addItemButton.disabled = true;

    // Add event listeners to existing select elements
    document.querySelectorAll('.itemField select').forEach(select => {
        select.addEventListener('change', updateAddItemButton);
    });

    // Add event listeners to existing quantity input elements
    document.querySelectorAll('.itemField input[type="number"]').forEach(input => {
        input.addEventListener('input', updateAddItemButton);
    });

    updateAddItemButton(); // Initial check to set the button state
});

// Function to update the state of the "Add Item" button
const updateAddItemButton = () => {
    const selectedBurgers = document.querySelectorAll('.itemField select');
    const addItemButton = document.getElementById("addItemButton");

    if (!addItemButton) {
        console.error("Could not find the 'Add Item' Button");
        return;
    }

    // Check if any select element has a non-empty value
    let hasSelectedBurger = false;
    selectedBurgers.forEach(select => {
        if (select.value !== "") {
            hasSelectedBurger = true;
        }
    });

    addItemButton.disabled = !hasSelectedBurger;
};

let itemIndex = 1;

// Ensure the addItem function also attaches the event listeners to the new elements
const addItem = () => {
    const itemFields = document.getElementById("itemFields");
    const newItemField = itemFields.lastElementChild.cloneNode(true);

    const newBurgerField = newItemField.querySelector('select');
    const newQuantityField = newItemField.querySelector('input[type="number"]');

    if (newBurgerField && newQuantityField) {
        newBurgerField.name = `items[${itemIndex}][burger]`;
        newQuantityField.name = `items[${itemIndex}][itemQuantity]`;

        newQuantityField.value = 1; // by default quantity is 1

        newBurgerField.addEventListener("change", updateAddItemButton);
        newQuantityField.addEventListener("input", updateAddItemButton);

        // Mark this field as dynamically added
        newItemField.classList.add('dynamicField');

        itemFields.appendChild(newItemField);
        itemIndex++;

        document.querySelectorAll('.itemField select').forEach(select => {
            select.addEventListener('change', updateAddItemButton);
        });

        console.log("Event linteners on select element:", newItemField.getAttribute('onchange'));
    } else {
        console.error("Failed to find the required fields within the cloned items");
    }

    updatePrice();
    updateAddItemButton(); // Check the button state after adding a new item
};

const removeDynamicFields = () => {
    const dynamicFields = document.querySelectorAll('.dynamicField');
    dynamicFields.forEach(field => field.parentNode.removeChild(field));
};

// Update prices
const prices = {
    "Chicken Burger": 5.00,
    "Maharaja MAC Cheese Burger": 8.00,
    "Crispy MC Junior": 3.00
};

const updatePrice = () => {
    const itemFields = document.querySelectorAll('.itemField');
    let totalPrice = 0;

    itemFields.forEach((itemField) => {
        const burgerField = itemField.querySelector('select');
        const quantityField = itemField.querySelector('input[type="number"]');

        if (burgerField && quantityField) {
            const burger = burgerField.value;
            const quantity = parseInt(quantityField.value) || 0;
            const price = prices[burger] || 0;

            totalPrice += price * quantity;
        }
    });

    const totalPriceFormatted = totalPrice.toFixed(2);

    document.getElementById('orderPrice').innerText = totalPriceFormatted;
};

// Add event listeners to update the price whenever an item is changed or added
document.querySelectorAll('.itemField select, .itemField input[type="number"]').forEach(field => {
    field.addEventListener('change', updatePrice);
    field.addEventListener('input', updatePrice);
});

// Call updatePrice initially to set the initial price
updatePrice();

const handleSubmit = (event) => {
    event.preventDefault();

    const itemFields = document.querySelectorAll('.itemField');
    let orderDetails = [];
    let finalTotalPrice = 0;

    itemFields.forEach((itemField) => {
        const burgerField = itemField.querySelector('select');
        const quantityField = itemField.querySelector('input[type="number"]');

        if (burgerField && quantityField) {
            const selectedBurger = burgerField.value;
            const selectedQuantity = parseInt(quantityField.value) || 0;
            const burger = burgerField.value;
            const quantity = parseInt(quantityField.value) || 0;
            const price = prices[selectedBurger] || 0;

            const totalPrice = price * quantity;
            finalTotalPrice += totalPrice;

            orderDetails.push({
                selectedBurger: selectedBurger,
                selectedQuantity: selectedQuantity,
                burger: burger,
                quantity: quantity,
                price: price,
                totalPrice: totalPrice
            });

            // Remove the dynamically added fields
            if (itemField.classList.contains('dynamicField')) {
                itemField.parentNode.removeChild(itemField);
            }
        }
    });

    const address = document.querySelector('input[name="address"]').value;
    const phoneNumber = document.querySelector('input[name="phoneNumber"]').value;

    const now = new Date();
    const orderDate = now.toLocaleDateString();
    const orderTime = now.toLocaleTimeString();

    const finalOrder = {
        id: Date.now(), 
        orderDetails: orderDetails,
        finalTotalPrice: finalTotalPrice.toFixed(2),
        address: address,
        phoneNumber: phoneNumber,
        date: orderDate,
        time: orderTime
    };

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let orderId = orders.length ? orders[orders.length - 1].id + 1 : 1;

    finalOrder.id = orderId;
    orders.push(finalOrder);

    localStorage.setItem('orders', JSON.stringify(orders));

    // Resetting price
    document.getElementById('orderPrice').innerText = '0.00';

    // Resetting the form
    document.getElementById('orderForm').reset();

    closeOrderForm();
    openOrderPlaced();
};

document.getElementById('orderForm').addEventListener('submit', handleSubmit);

// Placed order message
const openOrderPlaced = () => {
    document.getElementById("orderPlaced").style.display = "flex";
};

const closeOrderPlaced = () => {
    document.getElementById("orderPlaced").style.display = "none";
};


// Function to show error messages
const showError = (id, message) => {
    let errorElement = document.getElementById(id);
    errorElement.innerText = message;
    errorElement.style.display = "block";
    errorElement.style.color = "red";
    errorElement.style.fontSize = "14px";
};

// Function to clear error messages
const clearError = (id) => {
    let errorElement = document.getElementById(id);
    errorElement.innerText = "";
};

// Function to highlight fields with errors
const showDangerBorder = (id) => {
    let element = document.getElementById(id);
    element.style.border = "2px solid red";
};

// Function to remove error highlighting
const clearDangerBorder = (id) => {
    let element = document.getElementById(id);
    element.style.border = "1px solid #ccc";
};

// Function to set focus on error field
const focusField = (id) => {
    document.getElementById(id).focus();
};

// Name Validation
const nameValid = () => {
    const name = document.getElementById("name").value.trim();
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (name === "") {
        showError("nameError", "Name is required!");
        showDangerBorder("name");
        focusField("name");
        return false;
    } else if (!nameRegex.test(name)) {
        showError("nameError", "Enter a valid name (only alphabets)!");
        showDangerBorder("name");
        focusField("name");
        return false;
    } else {
        clearError("nameError");
        clearDangerBorder("name");
        return true;
    }
};

// Phone Number Validation
const phoneValid = () => {
    const phone = document.getElementById("phoneNumber").value.trim();
    const phoneRegex = /^\d{10}$/;

    if (phone === "") {
        showError("phoneError", "Phone Number is required!");
        showDangerBorder("phoneNumber");
        focusField("phoneNumber");
        return false;
    } else if (!phoneRegex.test(phone)) {
        showError("phoneError", "Enter a valid 10-digit phone number!");
        showDangerBorder("phoneNumber");
        focusField("phoneNumber");
        return false;
    } else {
        clearError("phoneError");
        clearDangerBorder("phoneNumber");
        return true;
    }
};

// Date Validation (Only Today or Future Dates)
const dateValid = () => {
    const date = document.getElementById("date").value;
    const today = new Date().toISOString().split("T")[0];

    if (date === "") {
        showError("dateError", "Date is required!");
        showDangerBorder("date");
        focusField("date");
        return false;
    } else if (date < today) {
        showError("dateError", "Date cannot be in the past!");
        showDangerBorder("date");
        focusField("date");
        return false;
    } else {
        clearError("dateError");
        clearDangerBorder("date");
        return true;
    }
};

// Time Validation (Required)
const timeValid = () => {
    const time = document.getElementById("time").value;
    
    if (time === "") {
        showError("timeError", "Time is required!");
        showDangerBorder("time");
        focusField("time");
        return false;
    } else {
        clearError("timeError");
        clearDangerBorder("time");
        return true;
    }
};

// Guests Validation (Min 1)
const guestsValid = () => {
    const guests = document.getElementById("guests").value.trim();

    if (guests === "" || guests < 1) {
        showError("guestsError", "At least 1 guest is required!");
        showDangerBorder("guests");
        focusField("guests");
        return false;
    } else {
        clearError("guestsError");
        clearDangerBorder("guests");
        return true;
    }
};

// Children Validation (Optional but must be 0 or more)
const childrenValid = () => {
    const children = document.getElementById("children").value.trim();

    if (children !== "" && children < 0) {
        showError("childrenError", "Number of children cannot be negative!");
        showDangerBorder("children");
        focusField("children");
        return false;
    } else {
        clearError("childrenError");
        clearDangerBorder("children");
        return true;
    }
};

const formValidation = (event) => {
    event.preventDefault();

    let isValid = true;

    if (!nameValid()) isValid = false;
    if (!phoneValid()) isValid = false;
    if (!dateValid()) isValid = false;
    if (!timeValid()) isValid = false;
    if (!guestsValid()) isValid = false;
    if (!childrenValid()) isValid = false;

    if (!isValid) return false;

    // Get form values
    const name = document.getElementById("name").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const guests = document.getElementById("guests").value.trim();
    const children = document.getElementById("children").value.trim() || 0;

    const now = new Date();
    const bookedOnDate = now.toLocaleDateString();
    const bookedOnTime = now.toLocaleTimeString();

    // Get existing bookings from localStorage
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Create a new booking object
    const newBooking = {
        id: bookings.length + 1,  // Auto-increment ID
        name: name,
        phoneNumber: phoneNumber,
        date: date,
        time: time,
        guests: guests,
        children: children,
        bookedOnDate: bookedOnDate,
        bookedOnTime: bookedOnTime
    };

    // Append the new booking to the bookings array
    bookings.push(newBooking);

    // Save the updated array back to localStorage
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Reset the form after successful validation
    document.getElementById("bookTableForm").reset();

    openTableBooked();
};

const openTableBooked = () => {
    document.getElementById("tableBooked").style.display = "flex";
};

const closeTableBooked = () => {
    document.getElementById("tableBooked").style.display = "none";
};


// Ensure script runs after page loads
window.onload = function () {
    document.getElementById("bookTableForm").addEventListener("submit", formValidation);
    
    // Adding real-time validation listeners
    document.getElementById("name").addEventListener("change", nameValid);
    document.getElementById("phoneNumber").addEventListener("change", phoneValid);
    document.getElementById("date").addEventListener("change", dateValid);
    document.getElementById("time").addEventListener("change", timeValid);
    document.getElementById("guests").addEventListener("change", guestsValid);
    document.getElementById("children").addEventListener("change", childrenValid);
};

// Function to clear all error messages and reset styles
const resetForm = () => {
    // Clear all error messages
    document.querySelectorAll(".error").forEach((error) => {
        error.innerText = "";
    });

    // Reset input borders to default
    document.querySelectorAll("input").forEach((input) => {
        input.style.border = "1px solid #ccc";
    });

    // Reset the form
    document.getElementById("bookTableForm").reset();
};

// Attach reset event to the reset button
document.querySelector(".bookingResetBtn").addEventListener("click", resetForm);
