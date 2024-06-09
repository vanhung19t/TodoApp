export const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};
