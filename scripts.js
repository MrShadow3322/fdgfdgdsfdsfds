const products = [];
const cart = [];

// Elements
const productsSection = document.querySelector('#products .product-list');
const cartSection = document.getElementById('cart-items');
const sellForm = document.getElementById('sell-form');
const cartCount = document.getElementById('cart-count');
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');

// Event Listeners
document.getElementById('home').addEventListener('click', () => {
    showSection('products');
});

document.getElementById('cart').addEventListener('click', () => {
    showSection('cart-items');
    renderCart();
});

document.getElementById('sell').addEventListener('click', () => {
    showSection('sell-form');
});

document.getElementById('product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const price = parseFloat(e.target.price.value);
    products.push({ name, price });
    e.target.reset();
    renderProducts();
    showSection('products');
});

// Functions
function showSection(id) {
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(id).classList.remove('hidden');
}

function renderProducts() {
    productsSection.innerHTML = '';
    products.forEach((product, index) => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${index})">Add to Cart</button>
        `;
        productsSection.appendChild(div);
    });
}

function addToCart(index) {
    cart.push(products[index]);
    cartCount.textContent = cart.length;
}

function renderCart() {
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        li.appendChild(createRemoveButton(index));
        cartList.appendChild(li);
    });
    cartTotal.textContent = total.toFixed(2);
}

function createRemoveButton(index) {
    const button = document.createElement('button');
    button.textContent = 'Remove';
    button.onclick = () => {
        cart.splice(index, 1);
        cartCount.textContent = cart.length;
        renderCart();
    };
    return button;
}

// Initialize
renderProducts();
