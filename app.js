// Store users in localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Base food items with their specific categories
const baseItems = [
    // Nepali Starters
    { name: 'Chicken Sekuwa', type: 'Non-Vegetarian', price: 180, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500', description: 'Grilled chicken skewers marinated in Nepali spices.' },
    { name: 'Buff Momo', type: 'Non-Vegetarian', price: 150, image: 'https://th.bing.com/th/id/OIP.mGIsDpL3YLnvv4_EHMzekAHaHa?rs=1&pid=ImgDetMain', description: 'Steamed dumplings filled with buffalo meat.' },
    { name: 'Veg Momo', type: 'Vegetarian', price: 120, image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=500', description: 'Steamed dumplings filled with mixed vegetables.' },
    { name: 'C Momo', type: 'Non-Vegetarian', price: 220, image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=500', description: 'Crispy fried momo tossed in spicy sauce.' },
    { name: 'Chicken Choila', type: 'Non-Vegetarian', price: 200, image: 'https://images.unsplash.com/photo-1606471191009-63994c53433b?w=500', description: 'Spicy grilled chicken with Newari spices.' },
    
    // Nepali Main Course
    { name: 'Thakali Set', type: 'Non-Vegetarian', price: 250, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500', description: 'Traditional Thakali meal with rice, lentils, and meat curry.' },
    { name: 'Newari Khaja Set', type: 'Non-Vegetarian', price: 280, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500', description: 'Traditional Newari platter with beaten rice and curry.' },
    { name: 'Dal Bhat Power 24 Hour', type: 'Vegetarian', price: 200, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500', description: 'Classic Nepali meal with rice, lentils, and vegetables.' },
    { name: 'Chicken Sizzler', type: 'Non-Vegetarian', price: 320, image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500', description: 'Sizzling hot plate with grilled chicken and vegetables.' },
    { name: 'Veg Thukpa', type: 'Vegetarian', price: 160, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500', description: 'Tibetan noodle soup with vegetables.' },
    
    // North Indian Starters
    { name: 'Paneer Tikka', type: 'Vegetarian', price: 200, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', description: 'Grilled paneer cubes marinated in spices.' },
    { name: 'Chicken Tikka', type: 'Non-Vegetarian', price: 220, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500', description: 'Tender chicken pieces marinated and grilled.' },
    { name: 'Samosa', type: 'Vegetarian', price: 100, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500', description: 'Crispy fried pastry filled with spiced potatoes.' },
    { name: 'Onion Bhaji', type: 'Vegetarian', price: 120, image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=500', description: 'Crispy onion fritters with Indian spices.' },
    { name: 'Chicken 65', type: 'Non-Vegetarian', price: 180, image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500', description: 'Spicy deep-fried chicken with curry leaves.' },

    // North Indian Main Course
    { name: 'Butter Chicken', type: 'Non-Vegetarian', price: 250, image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500', description: 'Creamy tomato-based curry with tender chicken pieces.' },
    { name: 'Chicken Biryani', type: 'Non-Vegetarian', price: 280, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500', description: 'Aromatic rice dish with spices and chicken.' },
    { name: 'Chana Masala', type: 'Vegetarian', price: 180, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500', description: 'Spicy and tangy chickpea curry.' },
    { name: 'Palak Paneer', type: 'Vegetarian', price: 220, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500', description: 'Cottage cheese in creamy spinach gravy.' },
    { name: 'Dal Makhani', type: 'Vegetarian', price: 200, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500', description: 'Creamy black lentils cooked overnight.' },

    // South Indian
    { name: 'Masala Dosa', type: 'Vegetarian', price: 150, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=500', description: 'Crispy rice crepe with spiced potato filling.' },
    { name: 'Idli Sambar', type: 'Vegetarian', price: 120, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500', description: 'Steamed rice cakes with lentil soup.' },
    { name: 'Medu Vada', type: 'Vegetarian', price: 100, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500', description: 'Crispy lentil doughnuts served with chutney.' },
    { name: 'Uttapam', type: 'Vegetarian', price: 140, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=500', description: 'Thick rice pancake with vegetables.' },
    { name: 'Rava Upma', type: 'Vegetarian', price: 110, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500', description: 'Savory semolina breakfast dish.' },

    // Western Starters
    { name: 'Caesar Salad', type: 'Vegetarian', price: 180, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500', description: 'Crisp romaine lettuce with Caesar dressing.' },
    { name: 'Garlic Bread', type: 'Vegetarian', price: 120, image: 'https://www.simplyrecipes.com/thmb/CgwVUFFMrYJyGq9Ipmc0uZ_EqJM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2006__09__Garlic-Bread-METHOD-2-bec7227928124a569a64dc7d0a85f3c1.jpg', description: 'Toasted bread with garlic butter and herbs.' },
    { name: 'Buffalo Wings', type: 'Non-Vegetarian', price: 220, image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=500', description: 'Spicy chicken wings with blue cheese dip.' },
    { name: 'Mozzarella Sticks', type: 'Vegetarian', price: 160, image: 'https://images.unsplash.com/photo-1531749668029-257fe339385f?w=500', description: 'Breaded and fried cheese sticks.' },
    { name: 'Onion Rings', type: 'Vegetarian', price: 140, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=500', description: 'Crispy battered onion rings.' },

    // Western Main Course
    { name: 'Spaghetti Carbonara', type: 'Non-Vegetarian', price: 300, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500', description: 'Classic Italian pasta with creamy sauce and bacon.' },
    { name: 'Cheeseburger', type: 'Non-Vegetarian', price: 250, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500', description: 'Juicy beef patty with cheese.' },
    { name: 'Margherita Pizza', type: 'Vegetarian', price: 280, image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500', description: 'Classic pizza with tomato and mozzarella.' },
    { name: 'Fish and Chips', type: 'Non-Vegetarian', price: 250, image: 'https://images.unsplash.com/photo-1579208030886-b937da0925dc?w=500', description: 'Battered fish with crispy fries.' },
    { name: 'Grilled Chicken Steak', type: 'Non-Vegetarian', price: 320, image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500', description: 'Grilled chicken breast with herbs and vegetables.' }
];

// Generate the final food items array with multiple categories
const mockFoodItems = [
    // All category
    ...baseItems.map((item, index) => ({
        ...item,
        id: index + 1,
        category: 'All'
    })),

    // Nepali category (items 0-9)
    ...baseItems.slice(0, 10).map((item, index) => ({
        ...item,
        id: index + 36,
        category: 'Nepali'
    })),

    // North Indian category (items 10-19)
    ...baseItems.slice(10, 20).map((item, index) => ({
        ...item,
        id: index + 46,
        category: 'North Indian'
    })),

    // South Indian category (items 20-24)
    ...baseItems.slice(20, 25).map((item, index) => ({
        ...item,
        id: index + 56,
        category: 'South Indian'
    })),

    // Starters category
    ...[
        ...baseItems.slice(0, 5),   // Nepali starters
        ...baseItems.slice(10, 15), // North Indian starters
        ...baseItems.slice(20, 25), // South Indian starters
        ...baseItems.slice(25, 30)  // Western starters
    ].map((item, index) => ({
        ...item,
        id: index + 61,
        category: 'Starters'
    })),

    // Main Course category
    ...[
        ...baseItems.slice(5, 10),   // Nepali main
        ...baseItems.slice(15, 20),  // North Indian main
        ...baseItems.slice(30, 35)   // Western main
    ].map((item, index) => ({
        ...item,
        id: index + 81,
        category: 'Main Course'
    }))
];

// Auth functions
function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;

    // Check if user already exists
    if (users.find(user => user.email === email)) {
        showToast('Email already registered');
        return;
    }

    // Create new user
    const user = { name, email, phone, password };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login after signup
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    showToast('Account created successfully!');
    document.getElementById('signupFormElement').reset();
    updateAuthState();
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showToast('Logged in successfully!');
        document.getElementById('loginFormElement').reset();
        updateAuthState();
    } else {
        showToast('Invalid email or password');
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthState();
    showToast('Logged out successfully');
}

function updateAuthState() {
    const authSection = document.getElementById('authSection');
    const mainApp = document.getElementById('mainApp');
    const userGreeting = document.getElementById('userGreeting');

    if (currentUser) {
        authSection.style.display = 'none';
        mainApp.style.display = 'block';
        userGreeting.textContent = `Hello, ${currentUser.name}`;
        loadFoodItems();
    } else {
        authSection.style.display = 'flex';
        mainApp.style.display = 'none';
        document.getElementById('loginFormElement').style.display = 'none';
        document.getElementById('signupFormElement').style.display = 'block';
    }
}

// Auth form switching
document.getElementById('showLogin')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signupFormElement').style.display = 'none';
    document.getElementById('loginFormElement').style.display = 'block';
});

document.getElementById('showSignup')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('loginFormElement').style.display = 'none';
    document.getElementById('signupFormElement').style.display = 'block';
});

// Food grid functions
function loadFoodItems(category = 'All', items = mockFoodItems) {
    const foodGrid = document.getElementById('foodGrid');
    if (!foodGrid) return;

    foodGrid.innerHTML = '';
    let filteredItems = items;

    if (category !== 'All' && category !== 'Search') {
        filteredItems = items.filter(item => item.category === category);
    }

    filteredItems.forEach((item, index) => {
        const foodCard = document.createElement('div');
        foodCard.className = 'food-card';
        foodCard.style.setProperty('--i', index);
        
        foodCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="food-card-content">
                <h3>${item.name}</h3>
                <div class="price">NPR ${item.price}</div>
                <p class="description">${item.description}</p>
                <button onclick="showOrderModal(${item.id})" class="btn btn-primary">Order Now</button>
            </div>
        `;
        
        foodGrid.appendChild(foodCard);
    });
}

// Search functionality
function searchFoodItems(query) {
    query = query.toLowerCase();
    return mockFoodItems.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
    );
}

// Profile management
function updateProfile(userData) {
    if (!currentUser) return false;

    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...userData };
        currentUser = users[userIndex];
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        return true;
    }
    return false;
}

// Order management
function placeOrder(orderDetails) {
    if (!currentUser) return false;

    const order = {
        id: Date.now(),
        userId: currentUser.email,
        ...orderDetails,
        status: 'pending',
        date: new Date().toISOString()
    };
    
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    return order;
}

function getUserOrders() {
    if (!currentUser) return [];
    return orders.filter(order => order.userId === currentUser.email)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Toast notifications
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// Initialize app
function initializeApp() {
    initializeAuth();
    initializeSearch();
    initializeProfile();
    initializeOrders();
    initializeModals();
    initializeTabs();
    
    // Add form listeners
    document.getElementById('signupFormElement')?.addEventListener('submit', handleSignup);
    document.getElementById('loginFormElement')?.addEventListener('submit', handleLogin);
    document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);
    
    // Initialize categories
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadFoodItems(btn.dataset.category);
        });
    });
}

// Initialize search
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            if (query.length >= 2) {
                const results = searchFoodItems(query);
                loadFoodItems('Search', results);
            } else if (query.length === 0) {
                loadFoodItems('All');
            }
        });
    }
}

// Initialize profile
function initializeProfile() {
    const profileForm = document.getElementById('profileForm');
    
    function loadProfile() {
        if (currentUser) {
            document.getElementById('profileName').value = currentUser.name || '';
            document.getElementById('profileEmail').value = currentUser.email || '';
            document.getElementById('profilePhone').value = currentUser.phone || '';
            document.getElementById('profileAddress').value = currentUser.address || '';
        }
    }

    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userData = {
                name: document.getElementById('profileName').value,
                phone: document.getElementById('profilePhone').value,
                address: document.getElementById('profileAddress').value
            };

            if (updateProfile(userData)) {
                showToast('Profile updated successfully');
                loadProfile();
            } else {
                showToast('Failed to update profile');
            }
        });
    }

    document.getElementById('profileTab')?.addEventListener('click', loadProfile);
}

// Initialize orders
function initializeOrders() {
    const ordersContainer = document.getElementById('ordersContainer');
    
    function loadOrders() {
        if (!ordersContainer || !currentUser) return;
        
        const userOrders = getUserOrders();
        ordersContainer.innerHTML = userOrders.length ? '' : '<p>No orders yet</p>';
        
        userOrders.forEach(order => {
            const orderCard = document.createElement('div');
            orderCard.className = 'order-card';
            orderCard.innerHTML = `
                <div class="order-header">
                    <h3>Order #${order.id}</h3>
                    <span class="order-date">${new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <span>${item.name}</span>
                            <span>NPR ${item.price}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-footer">
                    <div class="order-total">Total: NPR ${order.total}</div>
                    <div class="order-status ${order.status}">${order.status}</div>
                </div>
            `;
            ordersContainer.appendChild(orderCard);
        });
    }

    document.getElementById('ordersTab')?.addEventListener('click', loadOrders);
}

// Initialize modals
function initializeModals() {
    const orderModal = document.getElementById('orderModal');
    const closeModalBtn = document.getElementById('closeModal');
    const orderForm = document.getElementById('orderForm');

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            orderModal.classList.remove('active');
        });
    }

    if (orderModal) {
        orderModal.addEventListener('click', (e) => {
            if (e.target === orderModal) {
                orderModal.classList.remove('active');
            }
        });
    }

    if (orderForm) {
        orderForm.addEventListener('submit', handleOrder);
    }
}

// Initialize tabs
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show target content
            tabContents.forEach(content => {
                content.style.display = content.id === target ? 'block' : 'none';
            });
        });
    });
}

// Handle order placement
function handleOrder(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showToast('Please login to place an order');
        return;
    }
    
    const name = document.getElementById('orderName').value;
    const address = document.getElementById('orderAddress').value;
    const phone = document.getElementById('orderPhone').value;
    const foodId = document.getElementById('orderModal').dataset.foodId;
    const quantity = parseInt(document.getElementById('orderQuantity').value) || 1;

    if (!name || !address || !phone || !foodId) {
        showToast('Please fill in all fields');
        return;
    }

    if (quantity < 1) {
        showToast('Please enter a valid quantity');
        return;
    }

    const food = mockFoodItems.find(item => item.id === parseInt(foodId));
    if (!food) return;

    const orderDetails = {
        items: [{
            id: food.id,
            name: food.name,
            price: food.price,
            quantity: quantity
        }],
        total: food.price * quantity,
        deliveryAddress: address,
        customerName: name,
        customerPhone: phone
    };

    const order = placeOrder(orderDetails);
    if (order) {
        document.getElementById('orderModal').classList.remove('active');
        document.getElementById('orderForm').reset();
        showToast('Order placed successfully!');
    } else {
        showToast('Failed to place order');
    }
}

// Show order modal
function showOrderModal(foodId) {
    const orderModal = document.getElementById('orderModal');
    const food = mockFoodItems.find(item => item.id === parseInt(foodId));
    if (!food || !orderModal) return;

    // Pre-fill user details if logged in
    if (currentUser) {
        document.getElementById('orderName').value = currentUser.name || '';
        document.getElementById('orderPhone').value = currentUser.phone || '';
        document.getElementById('orderAddress').value = currentUser.address || '';
    }

    orderModal.dataset.foodId = foodId;
    document.getElementById('orderTitle').textContent = `Order ${food.name}`;
    orderModal.classList.add('active');
}

// Initialize auth
function initializeAuth() {
    // Check if user is already logged in
    if (currentUser) {
        updateAuthState();
    }
}

// Make showOrderModal available globally
window.showOrderModal = showOrderModal;

// Start the app
document.addEventListener('DOMContentLoaded', initializeApp);