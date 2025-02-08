// Admin credentials
const ADMIN_CREDENTIALS = {
    email: 'admin@example.com',
    password: 'admin123'
};

// Mock data
let mockUsers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+977 9876543210' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+977 9876543211' }
];

let mockFoodItems = [
    { id: 1, name: 'Chicken Momo', price: 150, image: 'https://via.placeholder.com/300x200?text=Chicken+Momo', category: 'Momos' },
    { id: 2, name: 'Veg Momo', price: 120, image: 'https://via.placeholder.com/300x200?text=Veg+Momo', category: 'Momos' }
];

let mockOrders = [];

// DOM Elements
const adminLogin = document.getElementById('adminLogin');
const adminDashboard = document.getElementById('adminDashboard');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const addFoodDialog = document.getElementById('addFoodDialog');

// Initialize dialog
if (!addFoodDialog.showModal) {
    dialogPolyfill.registerDialog(addFoodDialog);
}

// Event Listeners
adminLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        adminLogin.style.display = 'none';
        adminDashboard.style.display = 'block';
        loadUsers(); // Load initial view
    } else {
        alert('Invalid credentials!');
    }
});

logoutBtn.addEventListener('click', () => {
    adminLogin.style.display = 'flex';
    adminDashboard.style.display = 'none';
    document.getElementById('adminEmail').value = '';
    document.getElementById('adminPassword').value = '';
});

// Bottom Navigation
const navLinks = document.querySelectorAll('.admin-bottom-nav .mdl-navigation__link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        const section = link.getAttribute('data-section');
        handleNavigation(section);
    });
});

// Navigation Handler
function handleNavigation(section) {
    switch(section) {
        case 'users':
            loadUsers();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'search':
            loadSearch();
            break;
        case 'add-food':
            showAddFoodDialog();
            break;
    }
}

// Load Users
function loadUsers() {
    const content = document.querySelector('.page-content');
    content.innerHTML = '<h4>Users</h4>';

    mockUsers.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card mdl-card mdl-shadow--2dp';
        userCard.innerHTML = `
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">${user.name}</h2>
            </div>
            <div class="mdl-card__supporting-text">
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
            </div>
        `;
        content.appendChild(userCard);
    });
}

// Load Orders
function loadOrders() {
    const content = document.querySelector('.page-content');
    content.innerHTML = '<h4>Orders</h4>';

    mockOrders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card mdl-card mdl-shadow--2dp';
        orderCard.innerHTML = `
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">${order.foodName}</h2>
            </div>
            <div class="mdl-card__supporting-text">
                <div class="order-status order-status--${order.status}"></div>
                <p>Customer: ${order.customerName}</p>
                <p>Address: ${order.address}</p>
                <p>Phone: ${order.phone}</p>
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                        onclick="completeOrder(${order.id})">
                    Complete Order
                </button>
            </div>
        `;
        content.appendChild(orderCard);
    });
}

// Complete Order
function completeOrder(orderId) {
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
        order.status = 'completed';
        loadOrders(); // Refresh the orders view
    }
}

// Load Search
function loadSearch() {
    const content = document.querySelector('.page-content');
    content.innerHTML = `
        <div class="search-container">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type="text" id="searchInput">
                <label class="mdl-textfield__label" for="searchInput">Search food items...</label>
            </div>
        </div>
        <div class="food-grid"></div>
    `;

    const searchInput = document.getElementById('searchInput');
    const foodGrid = document.querySelector('.food-grid');

    function displayFoodItems(items) {
        foodGrid.innerHTML = '';
        items.forEach(item => {
            const foodCard = document.createElement('div');
            foodCard.className = 'food-card mdl-card mdl-shadow--2dp';
            foodCard.innerHTML = `
                <div class="mdl-card__title food-card__image" style="background-image: url('${item.image}')">
                    <h2 class="mdl-card__title-text">${item.name}</h2>
                </div>
                <div class="mdl-card__supporting-text">
                    <p>Price: NPR ${item.price}</p>
                    <p>Category: ${item.category}</p>
                </div>
            `;
            foodGrid.appendChild(foodCard);
        });
    }

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredItems = mockFoodItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm) || 
            item.category.toLowerCase().includes(searchTerm)
        );
        displayFoodItems(filteredItems);
    });

    // Initial display
    displayFoodItems(mockFoodItems);
}

// Show Add Food Dialog
function showAddFoodDialog() {
    addFoodDialog.showModal();

    document.querySelector('.close').addEventListener('click', () => {
        addFoodDialog.close();
    });

    document.getElementById('addFoodBtn').onclick = () => {
        const newFood = {
            id: mockFoodItems.length + 1,
            name: document.getElementById('foodName').value,
            price: parseInt(document.getElementById('foodPrice').value),
            category: document.getElementById('foodCategory').value,
            image: 'https://via.placeholder.com/300x200?text=' + document.getElementById('foodName').value.replace(/ /g, '+')
        };

        mockFoodItems.push(newFood);
        addFoodDialog.close();
        
        // Show success message
        const snackbarContainer = document.querySelector('#demo-toast-example');
        const data = {
            message: 'Food item added successfully!',
            timeout: 2000
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);

        // Reset form
        document.getElementById('addFoodForm').reset();
    };
}

// Initialize with users view
loadUsers();
