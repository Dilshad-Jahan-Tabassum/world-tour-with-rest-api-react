const getStoredCart = () => {
    const storedCartString = localStorage.getItem('cart');

    if(storedCartString){
        return JSON.parse(storedCartString);
    }
    return [];

}
const saveToLocalStorage = cart =>{
    const cartStringified = JSON.stringify(cart);
    localStorage.setItem('cart', cartStringified);
}

const addToLocalStorage = cca2 => {
    const cart = getStoredCart();
    cart.push(cca2);
    // Save the updated cart to localStorage
    saveToLocalStorage(cart);
}

export {addToLocalStorage, getStoredCart};