function renderCart() {
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    const cartContainer = document.querySelector('.cart-container');
    let totalPriceElement = document.querySelector('.total-price');
    let totalPrice = document.querySelector('.total');
    let total = 0;
    cartContainer.innerHTML = '';

    if (!cart || cart.length === 0) {
        cartContainer.innerHTML = '<p style="text-align: center;">No items in cart</p>';
        totalPrice.setAttribute('hidden', true);
        return;
    }
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const cartItemImage = document.createElement('div');
        cartItemImage.classList.add('cart-item-image');
        const image = document.createElement('img');
        image.src = item.imageURL;
        image.alt = item.name;
        cartItemImage.appendChild(image);
        cartItem.appendChild(cartItemImage);

        const cartItemDetail = document.createElement('div');
        cartItemDetail.classList.add('cart-item-detail');
        const itemName = document.createElement('h1');
        itemName.classList.add('cart-item-name');
        itemName.textContent = item.name;
        const itemPrice = document.createElement('h1');
        itemPrice.classList.add('cart-product-price');
        itemPrice.textContent = `Price: ₹${item.price}`;
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('cart-btn');
        removeBtn.textContent = 'Remove Item';
        removeBtn.addEventListener('click', function() {
            const productId = item.id;
            let cart = JSON.parse(sessionStorage.getItem('cart')) || [];        
            const newCart = cart.filter(item => item.id !== productId);        
            sessionStorage.setItem('cart', JSON.stringify(newCart));
            alert(`Item with ID "${productId}" removed from cart`);
        });
        total = total+item.price
           
        cartItemDetail.appendChild(itemName);
        cartItemDetail.appendChild(itemPrice);
        cartItemDetail.appendChild(removeBtn);
        cartItem.appendChild(cartItemDetail);

        cartContainer.appendChild(cartItem);
    });
    totalPriceElement.textContent = total;
}

renderCart();
