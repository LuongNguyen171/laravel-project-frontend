export const limitproductName = (productName = '', maxLength = 15) => {
    if (productName.length > maxLength) {
        return productName.slice(0, maxLength) + '...'
    }
    return productName
}

export const formatProductPrice = (productPriceString) => {
    const numericValue = parseFloat(productPriceString);
    if (!isNaN(numericValue)) {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });
        return formatter.format(numericValue);
    }
    return productPriceString; // Trả về nguyên chuỗi nếu không phải số hợp lệ
}

export const handleAfDistcountPrice = (priceReal, discount = 1, quantity = 1) => {

    const numericValue = (parseFloat(priceReal) - parseFloat(priceReal) * (discount / 100)) * quantity;


    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    if (!isNaN(numericValue)) {

        return formatter.format(numericValue);
    }
    return formatter.format(priceReal);
}

export const convertPriceToFloat = (priceString) => {

    const numericString = priceString.replace(/\./g, '');
    return parseFloat(numericString);
};