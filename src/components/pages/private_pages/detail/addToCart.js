const addToCart = (product, quantity) => {
    const cart = JSON.parse(localStorage.getItem('cartShoeProject')) || [];

    const existingItemIndex = cart.findIndex(item => item.productId === product.productId);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {

        cart.push({
            ...product,
            quantity
        });
    }

    localStorage.setItem('cartShoeProject', JSON.stringify(cart));
    console.log('Product added to cart');
};

export default addToCart