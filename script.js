var PRODUCTS = [
    { id: 1, name: "Oslo Grey Sofa", category: "sofa", price: 1299, oldPrice: 1599, image: "assets/images/sofa-oslo.jpg", badge: "Best Seller", color: "#8B8B8B" },
    { id: 2, name: "Maren Accent Chair", category: "chair", price: 459, oldPrice: null, image: "assets/images/chair-maren.jpg", badge: "New", color: "#D4A853" },
    { id: 3, name: "Norden Coffee Table", category: "table", price: 679, oldPrice: 849, image: "assets/images/table-norden.jpg", badge: "Sale", color: "#8B6914" },
    { id: 4, name: "Lume Floor Lamp", category: "lamp", price: 189, oldPrice: null, image: "assets/images/lamp-lume.jpg", badge: null, color: "#C8956C" },
    { id: 5, name: "Bella Dining Table", category: "table", price: 899, oldPrice: 1199, image: "assets/images/table-bella.jpg", badge: "Sale", color: "#F5F5F0" },
    { id: 6, name: "Haven Bed Frame", category: "bed", price: 1599, oldPrice: null, image: "assets/images/bed-haven.jpg", badge: "New", color: "#E8DDD3" },
    { id: 7, name: "Slope Lounge Chair", category: "chair", price: 579, oldPrice: null, image: "assets/images/chair-slope.jpg", badge: null, color: "#2D5F5D" },
    { id: 8, name: "Arc Table Lamp", category: "lamp", price: 129, oldPrice: 169, image: "assets/images/lamp-arc.jpg", badge: "Sale", color: "#F4C542" },
    { id: 9, name: "Wave Cream Sectional", category: "sofa", price: 1449, oldPrice: null, image: "assets/images/sofa-wave.jpg", badge: "Premium", color: "#F0EBE3" },
    { id: 10, name: "Grove Side Table", category: "table", price: 289, oldPrice: null, image: "assets/images/table-grove.jpg", badge: null, color: "#A0522D" },
    { id: 11, name: "Cosmo Bookshelf", category: "shelf", price: 549, oldPrice: 699, image: "assets/images/shelf-cosmo.jpg", badge: "Sale", color: "#2D2D2D" },
    { id: 12, name: "Plush Area Rug", category: "rug", price: 349, oldPrice: null, image: "assets/images/rug-plush.jpg", badge: "New", color: "#E07A5F" },
    { id: 13, name: "Velvet Royal Sofa", category: "sofa", price: 1699, oldPrice: 1999, image: "assets/images/sofa-velvet.jpg", badge: "Sale", color: "#6B3FA0" },
    { id: 14, name: "Pendant Brass Lamp", category: "lamp", price: 219, oldPrice: null, image: "assets/images/lamp-pendant.jpg", badge: "New", color: "#B8860B" },
    { id: 15, name: "Woven Dining Chair", category: "chair", price: 349, oldPrice: 429, image: "assets/images/chair-woven.jpg", badge: "Sale", color: "#DEB887" },
    { id: 16, name: "Marble Console Table", category: "table", price: 749, oldPrice: null, image: "assets/images/table-marble.jpg", badge: null, color: "#F5F5DC" },
    { id: 17, name: "Sunset Queen Bed", category: "bed", price: 1899, oldPrice: 2299, image: "assets/images/bed-sunset.jpg", badge: "Sale", color: "#CD853F" },
    { id: 18, name: "Minimal Wall Shelf", category: "shelf", price: 199, oldPrice: null, image: "assets/images/shelf-minimal.jpg", badge: null, color: "#8B4513" }
];

function getCart() { try { return JSON.parse(localStorage.getItem('moderno_cart')) || []; } catch (e) { return []; } }
function saveCart(cart) { localStorage.setItem('moderno_cart', JSON.stringify(cart)); updateCartBadge(); }
function addToCart(productId, qty) {
    qty = qty || 1; var cart = getCart(); var product = PRODUCTS.find(function (p) { return p.id === productId; });
    if (!product) return;
    var existing = cart.find(function (c) { return c.id === productId; });
    if (existing) { existing.qty += qty; } else { cart.push({ id: product.id, name: product.name, category: product.category, price: product.price, oldPrice: product.oldPrice, image: product.image, badge: product.badge, color: product.color, qty: qty }); }
    saveCart(cart); showToast('Added to bag!');
}
function removeFromCart(productId) { var cart = getCart().filter(function (c) { return c.id !== productId; }); saveCart(cart); if (typeof window.renderCart === 'function') window.renderCart(); }
function updateCartQty(productId, delta) { var cart = getCart(); var item = cart.find(function (c) { return c.id === productId; }); if (item) { item.qty = Math.max(1, item.qty + delta); saveCart(cart); if (typeof window.renderCart === 'function') window.renderCart(); } }
function getCartTotal() { return getCart().reduce(function (s, c) { return s + c.price * c.qty; }, 0); }
function getCartCount() { return getCart().reduce(function (s, c) { return s + c.qty; }, 0); }
function updateCartBadge() {
    var count = getCartCount();
    document.querySelectorAll('.nav-badge').forEach(function (b) {
        b.textContent = count;
        if (count > 0) { b.classList.add('show'); b.classList.remove('bounce'); void b.offsetWidth; b.classList.add('bounce'); }
        else { b.classList.remove('show'); }
    });
}
function getWishlist() { try { return JSON.parse(localStorage.getItem('moderno_wishlist')) || []; } catch (e) { return []; } }
function saveWishlist(wishlist) { localStorage.setItem('moderno_wishlist', JSON.stringify(wishlist)); updateWishlistBadge(); }
function toggleWishlist(productId) {
    var wishlist = getWishlist(); var idx = wishlist.indexOf(productId);
    if (idx > -1) { wishlist.splice(idx, 1); showToast('Removed from wishlist'); }
    else { wishlist.push(productId); showToast('Added to wishlist'); }
    saveWishlist(wishlist);
}
function updateWishlistBadge() { var count = getWishlist().length; document.querySelectorAll('.wishlist-badge').forEach(function (b) { b.textContent = count; if (count > 0) b.classList.add('show'); else b.classList.remove('show'); }); }
function showToast(message) {
    var existing = document.querySelector('.toast'); if (existing) existing.remove();
    var toast = document.createElement('div'); toast.className = 'toast';
    toast.innerHTML = '<div class="toast-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg></div>' + message;
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('show'); });
    setTimeout(function () { toast.classList.remove('show'); setTimeout(function () { toast.remove(); }, 500); }, 2500);
}
function createProductCard(product) {
    var bc = '';
    if (product.badge === 'New') bc = 'badge-new';
    else if (product.badge === 'Sale') bc = 'badge-sale';
    else if (product.badge === 'Best Seller') bc = 'badge-best';
    else if (product.badge === 'Premium') bc = 'badge-premium';
    return '<div class="product-card" onclick="viewProduct(' + product.id + ')">' +
        '<div class="product-card-img">' +
        '<img src="' + product.image + '" alt="' + product.name + '" loading="lazy">' +
        (product.badge ? '<div class="product-card-badge ' + bc + '">' + product.badge + '</div>' : '') +
        '<button class="product-card-wishlist" onclick="event.stopPropagation();toggleWishlist(' + product.id + ')">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>' +
        '<div class="product-card-actions">' +
        '<button class="btn btn-accent" style="flex:1;padding:10px;font-size:0.75rem" onclick="event.stopPropagation();addToCart(' + product.id + ')"><span>Add to Bag</span></button>' +
        '</div></div>' +
        '<div class="product-card-body">' +
        '<div class="product-card-cat">' + product.category + '</div>' +
        '<div class="product-card-name">' + product.name + '</div>' +
        '<div class="product-card-prices">' +
        '<span class="product-card-price">$' + product.price + '</span>' +
        (product.oldPrice ? '<span class="product-card-old-price">$' + product.oldPrice + '</span>' : '') +
        '</div></div></div>';
}
function viewProduct(id) { localStorage.setItem('moderno_product', id); window.location.href = 'product.html'; }
function initScrollAnimations() {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.anim-up,.anim-left,.anim-right,.anim-scale').forEach(function (el) { observer.observe(el); });
}
function initNavbar() {
    var navbar = document.querySelector('.navbar'); if (!navbar) return;
    window.addEventListener('scroll', function () { if (window.scrollY > 80) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled'); });
}
function initCursor() {
    var dot = document.querySelector('.custom-cursor-dot'); var ring = document.querySelector('.custom-cursor-ring');
    if (!dot || !ring) return; if (window.innerWidth < 768) { dot.style.display = 'none'; ring.style.display = 'none'; return; }
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; dot.style.left = (mx - 4) + 'px'; dot.style.top = (my - 4) + 'px'; });
    function animRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = (rx - 20) + 'px'; ring.style.top = (ry - 20) + 'px'; requestAnimationFrame(animRing); } animRing();
    document.addEventListener('mousedown', function () { ring.classList.add('clicking'); dot.style.transform = 'scale(2)'; });
    document.addEventListener('mouseup', function () { ring.classList.remove('clicking'); dot.style.transform = 'scale(1)'; });
    document.querySelectorAll('a,button,.product-card,.size-btn,.color-dot,.tab-btn,.input-field,.category-card,.faq-item,.nav-action-btn,.footer-social,.feature-card,.testimonial-card,.team-card,.btn').forEach(function (el) {
        el.addEventListener('mouseenter', function () { ring.classList.add('hovering'); dot.style.transform = 'scale(2)'; });
        el.addEventListener('mouseleave', function () { ring.classList.remove('hovering'); dot.style.transform = 'scale(1)'; });
    });
}
function openMobileMenu() { document.querySelector('.mobile-menu').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMobileMenu() { document.querySelector('.mobile-menu').classList.remove('open'); document.body.style.overflow = ''; }
document.addEventListener('DOMContentLoaded', function () { initNavbar(); initScrollAnimations(); updateCartBadge(); updateWishlistBadge(); setTimeout(initCursor, 500); });