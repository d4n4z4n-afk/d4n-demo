/* AETHER Store — Cart & UI Logic */

const CART_KEY = 'aether_cart';

// ---------- Cart Helpers ----------
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart(cart);
  showToast('Added to cart');
}

function removeFromCart(productId) {
  let cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  if (typeof renderCartPage === 'function') renderCartPage();
  showToast('Removed from cart');
}

function updateQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart(cart);
  if (typeof renderCartPage === 'function') renderCartPage();
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

function updateCartCount() {
  const count = getCartCount();
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

// ---------- Toast ----------
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ---------- Product Cards ----------
function createProductCard(product) {
  const badgeHtml = product.badge
    ? `<span class="badge badge-${product.badge}">${product.badge}</span>`
    : '';

  const oldPriceHtml = product.oldPrice
    ? `<span class="old">$${product.oldPrice}</span>`
    : '';

  return `
    <div class="product-card" data-id="${product.id}" data-category="${product.category}">
      <div class="product-img">
        <div class="product-badges">${badgeHtml}</div>
        ${product.emoji}
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.desc}</p>
        <div class="product-footer">
          <div class="product-price">$${product.price}${oldPriceHtml}</div>
          <button class="btn btn-primary btn-sm add-to-cart" data-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderProducts(containerSelector, products = PRODUCTS) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.innerHTML = products.map(createProductCard).join('');
  container.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      addToCart(Number(btn.dataset.id));
    });
  });
}

// ---------- Shop Filters ----------
function initShopFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sortSelect = document.querySelector('.sort-select');
  let currentCategory = 'all';
  let currentSort = 'featured';

  function applyFilters() {
    let filtered = [...PRODUCTS];
    if (currentCategory !== 'all') {
      filtered = filtered.filter(p => p.category === currentCategory);
    }
    if (currentSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    renderProducts('#shop-products', filtered);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      applyFilters();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      applyFilters();
    });
  }

  applyFilters();
}

// ---------- Cart Page ----------
function renderCartPage() {
  const container = document.querySelector('#cart-items');
  const summary = document.querySelector('#cart-summary');
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <div class="icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <a href="shop.html" class="btn btn-primary">Browse Products</a>
      </div>
    `;
    if (summary) summary.style.display = 'none';
    return;
  }

  if (summary) summary.style.display = 'block';

  container.innerHTML = cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return '';
    const lineTotal = product.price * item.qty;
    return `
      <div class="cart-item" data-id="${product.id}">
        <div class="cart-item-img">${product.emoji}</div>
        <div class="cart-item-info">
          <h3>${product.name}</h3>
          <div class="price">$${product.price}</div>
          <div class="qty-controls">
            <button class="qty-btn" data-action="dec" data-id="${product.id}">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" data-action="inc" data-id="${product.id}">+</button>
          </div>
        </div>
        <div class="cart-item-total">
          <div class="line-total">$${lineTotal.toFixed(2)}</div>
          <button class="remove-btn" data-id="${product.id}">Remove</button>
        </div>
      </div>
    `;
  }).join('');

  // Event listeners
  container.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const delta = btn.dataset.action === 'inc' ? 1 : -1;
      updateQty(id, delta);
    });
  });

  container.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(Number(btn.dataset.id));
    });
  });

  // Summary
  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 12;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (summary) {
    summary.innerHTML = `
      <h3>Order Summary</h3>
      <div class="summary-row">
        <span>Subtotal</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping</span>
        <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Tax (8%)</span>
        <span>$${tax.toFixed(2)}</span>
      </div>
      <div class="summary-row total">
        <span>Total</span>
        <span>$${total.toFixed(2)}</span>
      </div>
      <a href="checkout.html" class="btn btn-primary" style="width:100%;margin-top:1.25rem;">
        Proceed to Checkout
      </a>
    `;
  }
}

// ---------- Checkout Page ----------
function renderCheckoutPage() {
  const orderItems = document.querySelector('#order-items');
  const orderTotals = document.querySelector('#order-totals');
  if (!orderItems) return;

  const cart = getCart();
  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  orderItems.innerHTML = cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return '';
    return `
      <div class="order-item">
        <div class="order-item-img">${product.emoji}</div>
        <div class="order-item-info">
          <h4>${product.name}</h4>
          <span>Qty: ${item.qty} × $${product.price}</span>
        </div>
        <div style="font-weight:600;">$${(product.price * item.qty).toFixed(2)}</div>
      </div>
    `;
  }).join('');

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 12;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (orderTotals) {
    orderTotals.innerHTML = `
      <div class="summary-row">
        <span>Subtotal</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping</span>
        <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Tax</span>
        <span>$${tax.toFixed(2)}</span>
      </div>
      <div class="summary-row total">
        <span>Total</span>
        <span>$${total.toFixed(2)}</span>
      </div>
    `;
  }

  // Payment method toggle
  document.querySelectorAll('.payment-method').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
      el.classList.add('active');
    });
  });

  // Place order
  const form = document.querySelector('#checkout-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      localStorage.removeItem(CART_KEY);
      updateCartCount();
      showToast('Order placed successfully! 🎉');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1800);
    });
  }
}

// ---------- Contact Form ----------
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Message sent! We\'ll get back to you soon.');
    form.reset();
  });
}

// ---------- Mobile Menu ----------
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.mobile-nav-close');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => nav.classList.add('open'));
  if (closeBtn) closeBtn.addEventListener('click', () => nav.classList.remove('open'));
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  initMobileMenu();

  // Page-specific
  const page = document.body.dataset.page;

  if (page === 'home') {
    renderProducts('#featured-products', PRODUCTS.slice(0, 8));
  }

  if (page === 'shop') {
    initShopFilters();
  }

  if (page === 'cart') {
    renderCartPage();
  }

  if (page === 'checkout') {
    renderCheckoutPage();
  }

  if (page === 'contact') {
    initContactForm();
  }
});
