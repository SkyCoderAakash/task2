async function fetchData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        createProductCards(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function addToCart(product) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    if (cart.length >= 8) {
        alert('Maximum product limit reached (8 products)');
        return;
    }
    if (cart.some(item => item.name === product.name)) {
        alert('This product is already in the cart');
        return;
    }
    cart.push(product);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to your customized box`);
}

function createProductCards(products) {
    const container = document.querySelector('.product-container');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        const image = document.createElement('img');
        image.src = product.imageURL;
        image.alt = product.name;
        imageContainer.appendChild(image);
        productCard.appendChild(imageContainer);

        const productDetail = document.createElement('div');
        productDetail.classList.add('product-detail');
        const name = document.createElement('h4');
        name.classList.add('product-name');
        name.textContent = product.name;
        const description = document.createElement('p');
        description.classList.add('product-description');
        description.textContent = product.description;
        const flex = document.createElement('div');
        flex.classList.add('flex');
        const price = document.createElement('p');
        price.textContent = `₹${product.price}`;
        const stock = document.createElement('p');
        stock.textContent = product.stock > 0 ? 'In Stock' : 'Out of Stock';
        if (product.stock === 0) {
            stock.style.color = 'red';
        } else {
            stock.style.color = 'green';
        }
        const addToCartBtn = document.createElement('button');
        addToCartBtn.classList.add('add-to-cart-btn');
        addToCartBtn.textContent = 'Add to your box';
        addToCartBtn.onclick = function () {
            addToCart(product);
        }
        flex.appendChild(price);
        flex.appendChild(stock);
        productDetail.appendChild(name);
        productDetail.appendChild(description);
        productDetail.appendChild(flex);
        productDetail.appendChild(addToCartBtn);
        productCard.appendChild(productDetail);

        container.appendChild(productCard);
    });
}

fetchData();
