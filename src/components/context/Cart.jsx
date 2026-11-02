import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  });

  const addToCart = (product, size = null) => {
    let updatedCart = [...cartData];

    const index = updatedCart.findIndex(item =>
      item.product_id === product.id &&
      item.size === size
    );

    if (index !== -1) {
      updatedCart[index].qty += 1;
    } else {
      updatedCart.push({
        id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
        product_id: product.id,
        size,
        title: product.title,
        price: product.price,
        qty: 1,
        image_url: product.image_url
      });
    }
   
    setCartData(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

   const shipping = () => {
      return 0;
    }
    const subTotal = () => {
      let subTotal = 0;
      cartData.map(item =>{
        subTotal += item.qty * item.price;
      })
      return subTotal;
    }

    const grandTotal = () => {
      return subTotal() + shipping();
    }

    const updateCartItem = (itemId, newQty) => {
      let updatedCart = [...cartData];
    updatedCart = updatedCart.map(item => 
      (item.id == itemId) ? { ...item, qty: newQty} : item
      )
      setCartData(updatedCart);
      localStorage.setItem('cart',JSON.stringify(updatedCart));
    }

    const deleteCartItem = (itemId) => {
    const newCardData =  cartData.filter(item => item.id != itemId);
    setCartData(newCardData);
      localStorage.setItem('cart',JSON.stringify(newCardData));

    }

    const getQty = () => {
      let qty = 0;
      cartData.map(item => {
        qty += parseInt(item.qty)
      });
      return qty;
    }
  return (
    <CartContext.Provider value={{ cartData, addToCart, grandTotal, subTotal, shipping, updateCartItem, deleteCartItem ,getQty  }}>
      {children}
    </CartContext.Provider>
  );
};