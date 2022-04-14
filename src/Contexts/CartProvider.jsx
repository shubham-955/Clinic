import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [count, setCount] = useState(0)

    const getCount = () => {
        try {
            fetch("http://localhost:3000/scheduled")
                .then((res) => res.json())
                .then((data) => setCount(data.length))
                .catch(console.log);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CartContext.Provider value={{ count, setCount, getCount }}>
            {children}
        </CartContext.Provider>
    )
}