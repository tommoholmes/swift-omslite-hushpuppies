export const formatPrice = (value, currency) => {
    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(value);

    return price;
};

export const formatPriceNumber = (value) => {
    const price = new Intl.NumberFormat('id-ID').format(value);
    return price;
};

export default { formatPrice, formatPriceNumber };
