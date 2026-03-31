// 菜單數據
const menuData = [
    {
        id: 1,
        name: '經典奶茶',
        category: 'milk-tea',
        price: 55,
        description: '香醇紅茶配鮮奶',
        emoji: '🍵'
    },
    {
        id: 2,
        name: '抹茶奶茶',
        category: 'milk-tea',
        price: 65,
        description: '日本抹茶的風味',
        emoji: '🟢'
    },
    {
        id: 3,
        name: '烏龍奶茶',
        category: 'milk-tea',
        price: 60,
        description: '台灣烏龍茶經典味道',
        emoji: '🍮'
    },
    {
        id: 4,
        name: '草莓果茶',
        category: 'fruit-tea',
        price: 60,
        description: '新鮮草莓搭配清茶',
        emoji: '🍓'
    },
    {
        id: 5,
        name: '檸檬果茶',
        category: 'fruit-tea',
        price: 50,
        description: '檸檬的酸爽與茶的香醇',
        emoji: '🍋'
    },
    {
        id: 6,
        name: '葡萄柚果茶',
        category: 'fruit-tea',
        price: 65,
        description: '優雅的柑橘香氣',
        emoji: '🍊'
    },
    {
        id: 7,
        name: '濃縮咖啡',
        category: 'coffee',
        price: 45,
        description: '來自衣索比亞的豆子',
        emoji: '☕'
    },
    {
        id: 8,
        name: '咖啡奶茶',
        category: 'coffee',
        price: 60,
        description: '咖啡與奶茶的完美融合',
        emoji: '🤎'
    },
    {
        id: 9,
        name: '慕斯蛋糕',
        category: 'snack',
        price: 80,
        description: '濃郁起司慕斯蛋糕',
        emoji: '🍰'
    },
    {
        id: 10,
        name: '餅乾禮盒',
        category: 'snack',
        price: 120,
        description: '手工烤製黃油餅乾',
        emoji: '🍪'
    }
];

// 購物車陣列
let cart = [];

// 事件監聽器
document.addEventListener('DOMContentLoaded', function() {
    displayMenu(menuData);
    updateCartDisplay();
});

// 顯示指定區域
function showSection(sectionId) {
    // 隱藏所有區域
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // 顯示選擇的區域
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// 顯示菜單
function displayMenu(items) {
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = '';
    
    items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.dataset.category = item.category;
        menuItem.innerHTML = `
            <div class="menu-item-image">${item.emoji}</div>
            <div class="menu-item-content">
                <div class="menu-item-name">${item.name}</div>
                <div class="menu-item-desc">${item.description}</div>
                <div class="menu-item-price">$${item.price}</div>
                <div class="menu-item-options">
                    <div class="option-group">
                        <label>冰量</label>
                        <select class="ice-level">
                            <option value="加冰">加冰</option>
                            <option value="少冰">少冰</option>
                            <option value="去冰">去冰</option>
                            <option value="溫">溫</option>
                            <option value="熱">熱</option>
                        </select>
                    </div>
                    <div class="option-group">
                        <label>糖度</label>
                        <select class="sugar-level">
                            <option value="正常">正常</option>
                            <option value="少糖">少糖</option>
                            <option value="半糖">半糖</option>
                            <option value="無糖">無糖</option>
                        </select>
                    </div>
                    <div class="option-group">
                        <label>數量</label>
                        <input type="number" class="quantity" min="1" value="1">
                    </div>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${item.id}, '${item.name}', ${item.price})">加入購物車</button>
            </div>
        `;
        menuGrid.appendChild(menuItem);
    });
}

// 菜單篩選
function filterMenu(category) {
    // 更新活動按鈕
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // 篩選菜單
    if (category === 'all') {
        displayMenu(menuData);
    } else {
        const filtered = menuData.filter(item => item.category === category);
        displayMenu(filtered);
    }
}

// 添加到購物車
function addToCart(productId, productName, price) {
    // 取得菜單項目的選項
    const menuItem = event.target.closest('.menu-item');
    const iceLevel = menuItem.querySelector('.ice-level').value;
    const sugarLevel = menuItem.querySelector('.sugar-level').value;
    const quantity = parseInt(menuItem.querySelector('.quantity').value);
    
    // 添加到購物車
    const cartItem = {
        id: productId,
        name: productName,
        price: price,
        iceLevel: iceLevel,
        sugarLevel: sugarLevel,
        quantity: quantity,
        total: price * quantity,
        specs: `${iceLevel}, ${sugarLevel}糖`
    };
    
    cart.push(cartItem);
    updateCartDisplay();
    alert(`已添加 ${productName} x${quantity} 到購物車！`);
}

// 更新購物車顯示
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty-cart">購物車是空的</div>';
        cartCount.textContent = '(0)';
    } else {
        cartItemsDiv.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-specs">${item.specs}</div>
                <div>$${item.price} × ${item.quantity}</div>
                <div>$${item.total}</div>
                <button class="btn btn-danger" onclick="removeFromCart(${index})">刪除</button>
            </div>
        `).join('');
        cartCount.textContent = `(${cart.length})`;
    }
    
    // 更新總計
    updateCartTotal();
}

// 從購物車移除
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// 清空購物車
function clearCart() {
    if (cart.length === 0) {
        alert('購物車已經是空的！');
        return;
    }
    if (confirm('確定要清空購物車嗎？')) {
        cart = [];
        updateCartDisplay();
    }
}

// 更新購物車總計
function updateCartTotal() {
    const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
    const deliveryFee = cart.length > 0 ? 50 : 0;
    const total = subtotal + deliveryFee;
    
    document.getElementById('subtotal').textContent = `$${subtotal}`;
    document.getElementById('total').textContent = `$${total}`;
}

// 結帳
function checkout() {
    if (cart.length === 0) {
        alert('購物車是空的，請先選擇商品！');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
    const total = subtotal + 50;
    
    const orderSummary = cart.map(item => 
        `${item.name} (${item.specs}) × ${item.quantity} = $${item.total}`
    ).join('\n');
    
    const message = `=== 訂單確認 ===\n\n${orderSummary}\n\n小計: $${subtotal}\n配送費: $50\n總計: $${total}\n\n感謝您的訂購！\n我們會在30分鐘內送到您的地址。`;
    
    alert(message);
    cart = [];
    updateCartDisplay();
    showSection('home');
}

// 提交聯絡表單
function submitContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // 驗證
    if (!name || !email || !phone || !subject || !message) {
        alert('請填寫所有必填欄位！');
        return;
    }
    
    // 模擬提交（實際應發送到後端）
    const confirmMessage = `
感謝您的聯絡！
姓名: ${name}
電子郵件: ${email}
電話: ${phone}
主旨: ${subject}
訊息: ${message}

我們會在24小時內回覆您的訊息。
    `;
    
    alert(confirmMessage);
    
    // 清空表單
    document.querySelector('.contact-form').reset();
}
