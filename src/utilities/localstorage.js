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

const deleteFromLocalStorage = cca2 => {
    const cart = getStoredCart();
    //removing the item with the given cca2 from the cart
    const remainingCart = cart.filter(item=> item !== cca2);
    // Save the updated cart to localStorage
    saveToLocalStorage(remainingCart);
}

export {addToLocalStorage, getStoredCart, deleteFromLocalStorage};