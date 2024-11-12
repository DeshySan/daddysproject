import React, { Component, createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [] // Always default to an empty array
  );

  //   const addtoCart = (product) => {
  //     let updatedCartSecond = [...cart]; // Copy cart array

  //     if (cart.length === 0) {
  //       const pushThis = updatedCartSecond.push(product);
  //       // If cart is empty, add product directly
  //       setCart(pushThis); // Set cart to an array with the new product
  //     } else {
  //       const existingProduct = updatedCartSecond.find(
  //         (item) => item._id === product._id
  //       );

  //       if (existingProduct) {
  //         // If product already exists in the cart, update quantity
  //         const updatedCart = updatedCartSecond.map((item) =>
  //           item._id === product._id
  //             ? { ...item, quantity: item.quantity + product.quantity }
  //             : item
  //         );
  //         setCart(updatedCart);
  //       } else {
  //         // If product does not exist, add to cart
  //         setCart([...updatedCartSecond, product]);
  //       }
  //     }
  //     console.log(cart); // Make sure to check the updated cart
  //   };

  const addtoCart = (product) => {
    // Check if the product is valid
    if (!product || !product._id) {
      console.error("Invalid product", product);
      return;
    }

    let updatedCartSecond = [...cart]; // Copy cart array

    if (cart.length === 0) {
      // If cart is empty, directly add the product
      setCart([product]);
      localStorage.setItem("cart", JSON.stringify([product])); // Save new cart to localStorage immediately
    } else {
      const existingProduct = updatedCartSecond.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        // If product already exists in the cart, update quantity
        const updatedCart = updatedCartSecond.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart to localStorage
        console.log(updatedCart);
      } else {
        // If product does not exist, add to cart
        const newCart = [...updatedCartSecond, product];
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart)); // Save updated cart to localStorage
      }
    }
  };

  //remove from cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
  };

  // Update quantity of a product in the cart
  const updateQuantity = (productId, quantity) => {
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
  };

  // Get total items in cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  //total quantity in the cart
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  //managing the loading states

  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);
  return (
    <CartContext.Provider
      value={{
        cart,
        addtoCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        totalQuantity,
        showLoading,
        hideLoading,
        loading,
      }}>
      {children}
    </CartContext.Provider>
  );
};
