# Burger Farm 🍔

## Overview
Burger Farm is a web-based application that allows users to order burgers online and book restaurant tables. It stores user data using **localStorage** and provides a seamless experience for managing orders and reservations.

## Features 🚀
- **Burger Ordering System**: Users can select burgers, specify quantities, and place an order.
- **Table Reservation System**: Users can book tables by entering details like name, phone number, date, time, and number of guests.
- **Data Persistence**: Orders and reservations are stored in **localStorage** for future reference.
- **Validation**: Real-time form validation to ensure correct input before submission.
- **Dynamic Display**: Separate pages to display submitted **orders** and **reservations**.
- **Reset Functionality**: Users can reset the form before submission.

## Project Structure 📂
```
BurgerFarm/
│── index.html             # Main landing page (Burger Ordering Form)
│── bookTable.html         # Table booking form page
│── orders.html            # Displays all burger orders
│── reservations.html      # Displays all table reservations
│── styles.css             # Styling for the project
│── scripts/
│   ├── order.js          # Handles burger order form submission & localStorage
│   ├── booking.js        # Handles table booking form submission & localStorage
│   ├── displayOrders.js  # Retrieves and displays burger orders
│   ├── displayBookings.js# Retrieves and displays table reservations
│── README.md              # Project Documentation
```

## Technologies Used 🛠
- **HTML5**
- **CSS3**
- **JavaScript (ES6)**
- **LocalStorage** for data persistence

## Installation & Usage 📌
1. Clone the repository:
   ```sh
   git clone https://github.com/MaazAnsari1/Burger-Farm.git
   ```
2. Navigate to the project folder:
   ```sh
   cd burger-farm
   ```
3. Open `index.html` in a browser to start ordering burgers.
4. Open `bookTable.html` to book a restaurant table.
5. View orders in `orders.html`.
6. View table reservations in `reservations.html`.

## Functionality Details 🎯
### 1. **Burger Ordering System**
- Users select a burger from a dropdown.
- Input the quantity.
- Provide delivery details (address, phone number).
- Orders are stored in **localStorage** and displayed in `orders.html`.
- Form resets after successful submission.

### 2. **Table Booking System**
- Users enter their **name, phone number, date, time, and guest count**.
- Validation ensures proper input before submission.
- Bookings are stored in **localStorage** and displayed in `reservations.html`.
- The reset button clears the form before submission.

### 3. **Data Display**
- Orders and table bookings are fetched from **localStorage** and dynamically displayed in `orders.html` & `reservations.html`.
- If no data is found, a message is shown instead of an empty table.

## Future Enhancements 🌟
- **Backend Integration**: Move from **localStorage** to a database (e.g., Firebase, MySQL).
- **Payment Gateway**: Allow online payments for burger orders.
- **Admin Dashboard**: Manage orders and reservations more efficiently.
- **Table Availability Check**: Prevent double booking for the same date and time.

## Contributors 🤝
- **Maaz Ansari** (Front-End Developer)

---
Enjoy your burger and book your table hassle-free with **Burger Farm**! 🍔🎉