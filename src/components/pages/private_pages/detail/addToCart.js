// Hàm để thêm sản phẩm vào giỏ hàng dưới dạng localStorage
const addToCart = (product, quantity) => {
    const cart = JSON.parse(localStorage.getItem('cartShoeProject')) || [];

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingItemIndex = cart.findIndex(item => item.productId === product.productId);

    if (existingItemIndex !== -1) {
        // Sản phẩm đã tồn tại, cập nhật số lượng
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Sản phẩm chưa tồn tại, thêm vào giỏ hàng

        cart.push({
            ...product,
            quantity
        });
    }

    localStorage.setItem('cartShoeProject', JSON.stringify(cart));
    console.log('Product added to cart');
};

export default addToCart